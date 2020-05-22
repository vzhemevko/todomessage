package org.todomessage.services;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.todomessage.entities.Card;
import org.todomessage.entities.Todo;
import org.todomessage.mappers.TodoMapper;
import org.todomessage.repositories.TodoRepository;

import java.time.ZoneId;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.todomessage.PayloadFactory.createExistingTestCard;

@ExtendWith(MockitoExtension.class)
public class TodoServiceTest {
    
    @Mock
    private TodoRepository todoRepository;
    
    @Mock
    private TodoMapper todoMapper;
    
    @InjectMocks
    private TodoService todoService;
    
    @Test
    public void generateDefaultTodosShouldReturnSetOfTodos() {
        final Card card = createExistingTestCard();
        
        final int TODOS_COUNT_EXPECTED = 2;
        
        final Set<Todo> todosSet = todoService.generateDefaultTodos(card, ZoneId.systemDefault());
        
        assertEquals(TODOS_COUNT_EXPECTED, todosSet.size());
        todosSet.forEach(todo -> {
            assertNotNull(todo.getDueTime());
            assertEquals(card.getDay(), todo.getCard().getDay());
            assertTrue(todo.getReady());
            assertTrue(todo.getDone());
        });
    }
}
