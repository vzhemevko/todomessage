package org.todomessage.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.todomessage.dtos.TodoDto;
import org.todomessage.entities.Card;
import org.todomessage.entities.Todo;
import org.todomessage.mappers.TodoMapper;
import org.todomessage.repositories.TodoRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import static java.time.temporal.ChronoUnit.HOURS;

@Service
public class TodoService {
    
    private static final Logger LOGGER = LoggerFactory.getLogger(TodoService.class);
    
    private final TodoRepository todoRepository;
    private final TodoMapper todoMapper;

    public TodoService(final TodoRepository todoRepository,
                       final TodoMapper todoMapper) {
        this.todoRepository = todoRepository;
        this.todoMapper = todoMapper;
    }

    public List<TodoDto> getAll() {
        return todoMapper.toTodoDtoList(todoRepository.findAll());
    }

    public TodoDto createOne(TodoDto todoDto) {
        Todo todo = todoMapper.toTodoEntity(todoDto);
        todo.setUpdateAt(LocalDate.now());
        return todoMapper.toTodoDto(todoRepository.save(todo));
    }

    public TodoDto updateOne(TodoDto todoDto) {
        return todoMapper.toTodoDto(todoRepository.save(todoMapper.toTodoEntity(todoDto)));
    }

    public void deleteOne(UUID id) {
        todoRepository.deleteById(id);
    }
    
    public Set<Todo> generateDefaultTodos(Card card, ZoneId zoneId) {
        final int todosCount = 2;
        final Set<Todo> todos = new HashSet<>();
        final String[] todoNames = {"Buy groceries", "Do the laundry"};
        
        for (int i = 0; i < todosCount; i++) {
            Todo todo = new Todo();
            todo.setName(todoNames[i]);
            todo.setDone(true);
            todo.setReady(true);
            todo.setCard(card);
            todo.setPosition((short)i);
            todo.setDueTime(LocalTime.now(zoneId).plus(i, HOURS).truncatedTo(HOURS));
            todo.setUpdateAt(LocalDate.now());
            todos.add(todo);
        }
        LOGGER.info("Default Todos for Card {} have been generated", card.getDay());
        return todos;
    }
}
