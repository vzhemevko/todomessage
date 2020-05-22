package org.todomessage;

import org.todomessage.entities.Board;
import org.todomessage.entities.Card;
import org.todomessage.entities.Todo;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

public class PayloadFactory {
    
    public static final String TEST_BOARD_NAME = "test_board_name";
    public static final String TEST_BOARD_KEY = "test_board_key";
    public static final String TEST_BOARD_EMAIL = "mail@mail.com";
    
    public static final LocalDate TEST_CARD_DAY = LocalDate.now();
    
    public static final String TEST_TODO_NAME = "test_todo_name";
    
    
    public static Board createExistingTestBoard() {
        final Board board = new Board();
        board.setId(UUID.randomUUID());
        board.setName(TEST_BOARD_NAME);
        board.setKey(TEST_BOARD_KEY);
        board.setEmails(TEST_BOARD_EMAIL);
        board.setUpdateAt(LocalDate.now());
        board.setTheme((short)0);
        board.setTimeZone("UTC");
        return board;
    }
    
    public static Card createExistingTestCard() {
        Card card = new Card();
        card.setId(UUID.randomUUID());
        card.setDay(TEST_CARD_DAY);
        return card;
    }
    
    public static Todo createExistingTodo() {
        Todo todo = new Todo();
        todo.setId(UUID.randomUUID());
        todo.setName(TEST_TODO_NAME);
        todo.setReady(true);
        todo.setDone(true);
        todo.setDueTime(LocalTime.now());
        return todo;
    }
}
