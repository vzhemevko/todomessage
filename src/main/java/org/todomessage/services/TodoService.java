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
import java.util.*;

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
    
    /**
     * Generate a set of default todos. The default todos should be used during a new card creation.
     * No database insertion.
     *
     * @param card entity for which the card to be generated.
     * @param zoneId to be used for the due time generation.
     * @return a set of generated todos.
     */
    public Set<Todo> generateDefaultTodos(Card card, ZoneId zoneId) {
        final int todosCount = 2;
        final Set<Todo> todos = new HashSet<>();
        final String[] todoNames = {
            "Buy groceries", "Do the laundry", "Call Mom",
            "Buy Milk", "Meet with Mike", "Finish the project",
            "Organize photos from the vacation", "Gym: running 30 minutes and bench press"
        };
        Random r = new Random();
        
        for (int i = 0; i < todosCount; i++) {
            Todo todo = new Todo();
            todo.setName(todoNames[r.nextInt(todoNames.length -1)]);
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
