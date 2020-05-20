package org.todomessage.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSendException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.todomessage.entities.Board;
import org.todomessage.entities.Todo;
import org.todomessage.repositories.BoardRepository;
import org.todomessage.repositories.TodoRepository;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class EmailService {
    
    private static final DateTimeFormatter TIME_FORMATTER = DateTimeFormatter.ofPattern("HH:mm");
    private static final String SUBJECT_TEMPLATE = "Todomessage: %s";
    private static final String BODY_TEMPLATE = "To do: %s " +
                                                    "\nToday at: %s " +
                                                    "\n\nThis message was automatically generated by Todomessage";
    
    private final JavaMailSender emailSender;
    private final BoardRepository boardRepository;
    private final TodoRepository todoRepository;
    
    @Autowired
    public EmailService(final JavaMailSender emailSender,
                        final BoardRepository boardRepository,
                        final TodoRepository todoRepository) {
        this.emailSender = emailSender;
        this.boardRepository = boardRepository;
        this.todoRepository = todoRepository;
    }
    
    @Transactional
    @Scheduled(fixedRate = 60_000)
    public void sendMessages() {
        System.out.println(LocalDateTime.now());
        List<Board> boardList = boardRepository.findAll();
        boardList.forEach(board -> {
            verifyAndSendCards(board);
        });
    }
    
    private void verifyAndSendCards(Board board) {
        final ZoneId zoneId = ZoneId.of(board.getTimeZone());
        final LocalDate today = LocalDate.now(zoneId);
        board.getCards().stream().forEach(card -> {
            LocalDate day = ZonedDateTime.of(card.getDay().atStartOfDay(), zoneId).toLocalDate();
            if (today.equals(day)) {
                card.getTodos().forEach(todo -> {
                        verifyAndSendTodos(todo, zoneId, board.getEmails());
                    }
                );
            }
        });
    }
    
    private void verifyAndSendTodos(Todo todo, ZoneId zoneId, List<String> emails) {
        LocalTime nowTime = LocalTime.now(zoneId);
        LocalTime dueTime = todo.getDueTime();
        if (todo.getReady() && !todo.getDone()
                && (nowTime.plus(1, ChronoUnit.MINUTES).isAfter(dueTime))) {
            emails.forEach(email -> {
                sendMessage(email, todo.getName(), todo.getName(), todo.getDueTime());
            });
            todo.setDone(true);
            todoRepository.saveAndFlush(todo);
            todoRepository.flush();
        }
    }
    
    private void sendMessage(String to, String subject, String todo, LocalTime at) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(String.format(SUBJECT_TEMPLATE, subject));
        message.setText(String.format(BODY_TEMPLATE, todo, at.format(TIME_FORMATTER)));
        try {
            emailSender.send(message);
        } catch (MailSendException ex) {
            // Ignore it, due to the fact that invalid emails addresses could be provided
        }
    }
}
