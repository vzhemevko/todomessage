package org.todomessage.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.todomessage.entities.Board;
import org.todomessage.entities.Card;
import org.todomessage.entities.Todo;
import org.todomessage.repositories.BoardRepository;
import org.todomessage.repositories.CardRepository;
import org.todomessage.repositories.TodoRepository;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static java.time.temporal.ChronoUnit.DAYS;

/**
 * Scheduled service to clear boards that have not been used for the
 * {@link CleaningService#BOARD_RETENTION_PERIOD_DAYS} and cards older than
 * {@link CleaningService#CARD_RETENTION_PERIOD_DAYS}
 * <p/>
 * As an additional task the service generates new cards if the total number of the board's
 * cards is less than required. {@link CleaningService#addNewCards(Board)}
 * <p/>
 * The service should be configured with the following application properties:
 * <ul>
 *      <li>
 *          <code>todomessage.cleaning-service.enabled</code>
 *          <br/>enable/disable the service.
 *      </li>
 *      <li>
 *          <code>todomessage.cleaning-service.schedule.cron</code>
 *          <br/>cron expression to be used for the service schedule.
 *      </li>
 *      <li>
 *          <code>todomessage.cleaning-service.schedule.fixedRate</code>
 *          <br/>fixed-rate in milliseconds to be used for the service schedule.
 *      </li>
 * </ul>
 * NOTE: cron and fixed-rate properties have to be mutually exclusive.
 */
@Service
public class CleaningService {
    
    private static final Logger LOGGER = LoggerFactory.getLogger(CleaningService.class);
    
    private static final String DEMO_BOARD_NAME = "demo";
    private static final int BOARD_RETENTION_PERIOD_DAYS = 30;
    private static final int CARD_RETENTION_PERIOD_DAYS = 1;
    
    private final BoardRepository boardRepository;
    private final CardRepository cardRepository;
    private final TodoRepository todoRepository;
    private final CardService cardService;
    private final TodoService todoService;
    
    @Value("${todomessage.cleaning-service.enabled}")
    private boolean isEnabled;
    
    public CleaningService(final BoardRepository boardRepository,
                           final CardRepository cardRepository,
                           final TodoRepository todoRepository,
                           final CardService cardService,
                           final TodoService todoService) {
        this.boardRepository = boardRepository;
        this.cardRepository = cardRepository;
        this.todoRepository = todoRepository;
        this.cardService = cardService;
        this.todoService = todoService;
    }
    
    
    @Transactional
    @Scheduled(
        cron = "${todomessage.cleaning-service.schedule.cron}",
        fixedRateString = "${todomessage.cleaning-service.schedule.fixedRate}"
    )
    public void startCleaning() {
        if (isEnabled) {
            List<Board> boardList =  boardRepository.findAll();
            boardList.forEach(board -> {
                final LocalDate today = LocalDate.now();
                if (removeNotUsedBoard(board, today) == null) {return;}
                removeOldCards(board, today);
                addNewCards(board);
                addDefaultTodosForDemoBoard(board, today);
            });
        }
    }
    
    /**
     * Delete board which was not used for the {@link CleaningService#BOARD_RETENTION_PERIOD_DAYS}
     * <p/>
     * The last usage of the board is considered a max value between {@link Board#getUpdateAt()}
     * and max from the all the board's todos {@link Todo#getUpdateAt()}
     * <p/>
     * NOTE: There is an exception for a board with name {@link CleaningService#DEMO_BOARD_NAME}. The board will
     * not be removed even if it's not used.
     *
     * @param board entity to verified.
     * @param today today's date.
     * @return null if the board was removed the same board instance otherwise.
     */
    private Board removeNotUsedBoard(Board board, LocalDate today) {
        LocalDate lastUpdatedTodo = todoRepository.findFirstByCard_Board_IdOrderByUpdateAtDesc(board.getId())
                                   .map(t -> t.getUpdateAt()).orElse(board.getUpdateAt());
        LocalDate lastUpdate =  board.getUpdateAt().isAfter(lastUpdatedTodo)
                                   ?  board.getUpdateAt() : lastUpdatedTodo;
        if (lastUpdate.isBefore(today.minus(BOARD_RETENTION_PERIOD_DAYS, DAYS))) {
            
            if (DEMO_BOARD_NAME.equals(board.getName())) {return board;}
            
            boardRepository.delete(board);
            boardRepository.flush();
            LOGGER.info("Board {} has not been used in {} days and will be deleted",
                board.getName(), BOARD_RETENTION_PERIOD_DAYS);
            return null;
        }
        return board;
    }
    
    /**
     * Delete all cards older than {@link CleaningService#CARD_RETENTION_PERIOD_DAYS}
     *
     * @param board entity which cards to be verified.
     * @param today today's date.
     */
    private void removeOldCards(Board board, LocalDate today) {
        board.getCards().forEach(card -> {
            if  (card.getDay().isBefore(today.minus(CARD_RETENTION_PERIOD_DAYS, DAYS))) {
                todoRepository.deleteInBatch(card.getTodos());
                todoRepository.flush();
                cardRepository.deleteInBatch(List.of(card));
                cardRepository.flush();
                LOGGER.info("Card {} in Board {} is outdated and will be deleted", card.getDay(), board.getName());
                return;
            }
        });
    }
    
    /**
     * Add new cards to the board if the total number of cards is less than required.
     *
     * @param board entity to which cards will be added.
     */
    private void addNewCards(Board board){
        final int cardsMaxAmount = 8;
        LocalDate lastCardDay = getLastCardDay(board);
        LocalDate newLastCardDay = lastCardDay.plus(cardsMaxAmount - board.getCards().size() , DAYS);
        
        long untilCardsMax = lastCardDay.until(newLastCardDay, DAYS);
        while (untilCardsMax > 0) {
            Card newCard = cardService.generateNewCard(board, lastCardDay.plus(1, DAYS));
            cardRepository.save(newCard);
            lastCardDay = lastCardDay.plus(1, DAYS);;
            untilCardsMax = lastCardDay.until(newLastCardDay, DAYS);
        }
    }
    
    /**
     * Generate default todos for the {@link CleaningService#DEMO_BOARD_NAME} board. The todos are added
     * to the today's card.
     *
     * @param board entity to which todos will be added.
     * @param today today's date.
     */
    private void addDefaultTodosForDemoBoard(Board board, LocalDate today) {
        board.getCards().forEach(card -> {
            if (DEMO_BOARD_NAME.equals(board.getName())
                    && today.equals(card.getDay())
                    && card.getTodos().size() == 0) {
                card.setTodos(todoService.generateDefaultTodos(card, ZoneId.of(board.getTimeZone())));
                cardRepository.save(card);
            }
        });
    }
    
    private LocalDate getLastCardDay(Board board) {
        if (board.getCards().size() == 0) {
            return LocalDate.now().minus(1, DAYS);
        }
        return board.getCards().stream().map(c -> c.getDay()).max(LocalDate::compareTo).get();
    }
}
