package org.todomessage.services;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.todomessage.dtos.BoardDto;
import org.todomessage.entities.Board;
import org.todomessage.entities.Card;
import org.todomessage.entities.Todo;
import org.todomessage.mappers.BoardMapper;
import org.todomessage.repositories.BoardRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static java.time.temporal.ChronoUnit.HOURS;

@Service
public class BoardService {

    private final BoardRepository boardRepository;
    private final BoardMapper boardMapper;
    private final BCryptPasswordEncoder passwordEncoder;

    public BoardService(final BoardRepository boardRepository,
                        final BoardMapper boardMapper,
                        final BCryptPasswordEncoder passwordEncoder) {
        this.boardRepository = boardRepository;
        this.boardMapper = boardMapper;
        this.passwordEncoder = passwordEncoder;
    }

    public List<BoardDto> getAll() {
        return boardMapper.toBoardDtoList(boardRepository.findAll());
    }

    @Transactional
    public BoardDto getByName(String name) {
        Board board = boardRepository.findByName(name).orElseThrow(() -> new RuntimeException("Board not found."));
        return boardMapper.toBoardDto(board);
    }

    public BoardDto createOne(BoardDto boardDto) {
        Board board = boardMapper.toBoardEntity(boardDto);
        board.setKey(passwordEncoder.encode(board.getKey()));
        board.setCards(generateNewCards(board));
        return boardMapper.toBoardDto(boardRepository.save(board));
    }

    public BoardDto updateOne(BoardDto boardDto) {
        return boardMapper.toBoardDto(boardRepository.save(boardMapper.toBoardEntity(boardDto)));
    }

    private Set<Card> generateNewCards(Board board) {
        final int cardsCount = 8;
        final ZoneId zoneId = ZoneId.of(board.getTimeZone());
        final Set<Card> cards = new HashSet<>();

        for (int i = 0; i < cardsCount; i++) {
            Card card = new Card();
            card.setBoard(board);
            LocalDate day = null;
            if (i == 0) {
                day = LocalDate.now(zoneId);
                card.setTodos(generateDefaultTodos(card, zoneId));
            } else {
                day = LocalDate.now(zoneId).plus(i, ChronoUnit.DAYS);
            }
            card.setDay(day);
            cards.add(card);
        }
        return cards;
    }

    private Set<Todo> generateDefaultTodos(Card card, ZoneId zoneId) {
        final int todosCount = 2;
        final Set<Todo> todos = new HashSet<>();
        final String[] todoNames = {"Buy groceries", "Do the laundry"};

        for (int i = 0; i < todosCount; i++) {
            Todo todo = new Todo();
            todo.setName(todoNames[i]);
            todo.setDone(false);
            todo.setReady(true);
            todo.setCard(card);
            todo.setPosition((short)i);
            todo.setDueTime(LocalTime.now(zoneId).plus(i, HOURS).truncatedTo(HOURS));
            todos.add(todo);
        }
        return todos;
    }
}
