package org.todomessage.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.todomessage.dtos.TodoDto;
import org.todomessage.mappers.TodoMapper;
import org.todomessage.repositories.TodoRepository;

@Service
public class TodoService {

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
        return todoMapper.toTodoDto(todoRepository.save(todoMapper.toTodoEntity(todoDto)));
    }

    public TodoDto updateOne(TodoDto todoDto) {
        return todoMapper.toTodoDto(todoRepository.save(todoMapper.toTodoEntity(todoDto)));
    }

    public void deleteOne(TodoDto todoDto) {
        todoRepository.delete(todoMapper.toTodoEntity(todoDto));
    }
}