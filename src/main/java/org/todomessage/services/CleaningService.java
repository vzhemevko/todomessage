package org.todomessage.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.todomessage.entities.Board;
import org.todomessage.entities.Card;
import org.todomessage.repositories.BoardRepository;
import org.todomessage.repositories.CardRepository;
import org.todomessage.repositories.TodoRepository;

import java.time.LocalDate;
import java.util.List;

import static java.time.temporal.ChronoUnit.DAYS;

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
    
    @Value("${todomessage.cleaning-service.enabled}")
    private boolean isEnabled;
    
    public CleaningService(final BoardRepository boardRepository,
                           final CardRepository cardRepository,
                           final TodoRepository todoRepository,
                           final CardService cardService) {
        this.boardRepository = boardRepository;
        this.cardRepository = cardRepository;
        this.todoRepository = todoRepository;
        this.cardService = cardService;
    }
    
    /**
     * Scheduled job to clear Boards that have not been used for the
     * {@link CleaningService#BOARD_RETENTION_PERIOD_DAYS} and Cards older than
     * {@link CleaningService#CARD_RETENTION_PERIOD_DAYS}
     * </br>
     * Runs each day at 12:01 AM UTC
     */
    @Transactional
    @Scheduled(cron = "0 1 0 * * *")
    public void startCleaning() {
        if (isEnabled) {
            List<Board> boardList =  boardRepository.findAll();
            boardList.forEach(board -> {
                if (DEMO_BOARD_NAME.equals(board.getName())) {return;}
                final LocalDate today = LocalDate.now();
                if (removeNotUsedBoards(board, today) == null) {return;}
                removeOldAndAddNewCards(board, today);
            });
        }
    }
    
    private Board removeNotUsedBoards(Board board, LocalDate today) {
        LocalDate lastUpdatedTodo = todoRepository.findFirstByCard_Board_IdOrderByUpdateAtDesc(board.getId())
                                   .map(t -> t.getUpdateAt()).orElse(board.getUpdateAt());
        LocalDate lastUpdate =  board.getUpdateAt().isAfter(lastUpdatedTodo)
                                   ?  board.getUpdateAt() : lastUpdatedTodo;
        if (lastUpdate.isBefore(today.minus(BOARD_RETENTION_PERIOD_DAYS, DAYS))) {
            boardRepository.delete(board);
            boardRepository.flush();
            LOGGER.info("Board {} has not been used in {} days and will be deleted",
                board.getName(), BOARD_RETENTION_PERIOD_DAYS);
            return null;
        }
        return board;
    }
    
    private void removeOldAndAddNewCards(Board board, LocalDate today) {
        LocalDate lastCardDay = board.getCards().stream().map(c -> c.getDay()).max(LocalDate::compareTo).get();
        Card newCard = cardService.generateNewCard(board, lastCardDay.plus(1, DAYS));
        cardRepository.save(newCard);
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
}
