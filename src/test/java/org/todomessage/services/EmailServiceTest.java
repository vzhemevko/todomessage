package org.todomessage.services;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.todomessage.entities.Board;
import org.todomessage.entities.Card;
import org.todomessage.entities.Todo;
import org.todomessage.repositories.BoardRepository;
import org.todomessage.repositories.TodoRepository;

import java.util.List;
import java.util.Set;
import java.util.TimeZone;

import static java.time.temporal.ChronoUnit.MINUTES;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.todomessage.PayloadFactory.*;

@ExtendWith(MockitoExtension.class)
public class EmailServiceTest {
    
    @Mock
    private JavaMailSender emailSender;
    
    @Mock
    private BoardRepository boardRepository;
    
    @Mock
    private TodoRepository todoRepository;
    
    @InjectMocks
    private EmailService emailService;
    
    @BeforeAll
    public static void init(){
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
    }
    
    @Test
    public void sendMessagesShouldSendEmailPerEachNotDoneTodoWhenDueTimeInPast() {
        final Board board = createExistingTestBoard();
        final Card card = createExistingTestCard();
        final Todo todo1 = createExistingTodo();
        final Todo todo2 = createExistingTodo();
        
        todo1.setDueTime(todo1.getDueTime().minus(1, MINUTES));
        todo2.setDueTime(todo2.getDueTime().minus(1, MINUTES));
        todo1.setPosition((short)0);
        todo2.setPosition((short)1);
        todo1.setDone(false);
        todo2.setDone(false);
        
        card.setTodos(Set.of(todo1, todo2));
        board.setCards(Set.of(card));
        
        given(boardRepository.findAll()).willReturn(List.of(board));
        
        emailService.sendMessages();
        verify(emailSender, times(card.getTodos().size())).send(any(SimpleMailMessage.class));
    }
    
    @Test
    public void sendMessagesShouldNotSendEmailForDoneTodo() {
        final Board board = createExistingTestBoard();
        final Card card = createExistingTestCard();
        final Todo todo1 = createExistingTodo();
        final Todo todo2 = createExistingTodo();
    
        todo1.setDueTime(todo1.getDueTime().minus(1, MINUTES));
        todo2.setDueTime(todo2.getDueTime().minus(1, MINUTES));
        todo1.setPosition((short)0);
        todo2.setPosition((short)1);
        
        todo1.setDone(true);
        todo2.setDone(false);
        
        card.setTodos(Set.of(todo1, todo2));
        board.setCards(Set.of(card));
        
        given(boardRepository.findAll()).willReturn(List.of(board));
        
        emailService.sendMessages();
        verify(emailSender, times(1)).send(any(SimpleMailMessage.class));
    }
}
