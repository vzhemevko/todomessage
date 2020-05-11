package org.todomessage.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.todomessage.dtos.TodoDto;
import org.todomessage.mappers.TodoMapper;
import org.todomessage.repositories.TodoRepository;

@RestController
@RequestMapping("/api/todos")
public class TodoController {

    private final TodoRepository todoRepository;
    private final TodoMapper todoMapper;

    public TodoController(final TodoRepository todoRepository,
                          final TodoMapper todoMapper) {
        this.todoRepository = todoRepository;
        this.todoMapper = todoMapper;
    }

    @GetMapping
    public List<TodoDto> getAll() {
        return todoMapper.toTodoDtoList(todoRepository.findAll());
    }
}

