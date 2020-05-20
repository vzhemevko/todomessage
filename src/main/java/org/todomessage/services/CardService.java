package org.todomessage.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.todomessage.dtos.CardDto;
import org.todomessage.entities.Board;
import org.todomessage.entities.Card;
import org.todomessage.entities.Todo;
import org.todomessage.mappers.CardMapper;
import org.todomessage.repositories.CardRepository;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
public class CardService {
    
    private static final Logger LOGGER = LoggerFactory.getLogger(CardService.class);
    
    private final CardRepository cardRepository;
    private final CardMapper cardMapper;
    private final TodoService todoService;
    
    public CardService(final CardRepository cardRepository,
                       final CardMapper cardMapper,
                       final TodoService todoService) {
        this.cardRepository = cardRepository;
        this.cardMapper = cardMapper;
        this.todoService = todoService;
    }
    
    public List<CardDto> getAll() {
        return cardMapper.toCardDtoList(cardRepository.findAll());
    }

    public CardDto getOne(UUID id) {
        return cardMapper.toCardDto(cardRepository.findById(id).get());
    }

    public CardDto updateOne(CardDto cardDto) {
        return cardMapper.toCardDto(cardRepository.save(cardMapper.toCardEntity(cardDto)));
    }
    
    public Set<Card> generateDefaultCards(Board board) {
        final int cardsCount = 8;
        final ZoneId zoneId = ZoneId.of(board.getTimeZone());
        final Set<Card> cards = new HashSet<>();
        
        for (int i = 0; i < cardsCount; i++) {
            Card card = generateNewCard(board, null);
            if (i == 0) {
                card.setDay(LocalDate.now(zoneId));
                card.setTodos(todoService.generateDefaultTodos(card, zoneId));
            } else {
                card.setDay(LocalDate.now(zoneId).plus(i, ChronoUnit.DAYS));
            }
            cards.add(card);
        }
        LOGGER.info("New Cards for Board {} have been generated", board.getName());
        return cards;
    }
    
    public Card generateNewCard(Board board, LocalDate day) {
        return generateNewCard(board, day, null);
    }
    
    public Card generateNewCard(Board board, LocalDate day, Set<Todo> todos) {
        Card card = new Card();
        card.setBoard(board);
        card.setDay(day);
        card.setTodos(todos);
        LOGGER.info("New Card {} for Board {} have been generated", card.getDay(), board.getName());
        return card;
    }
}
