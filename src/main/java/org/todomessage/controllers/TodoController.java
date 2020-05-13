package org.todomessage.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.todomessage.dtos.TodoDto;
import org.todomessage.mappers.TodoMapper;
import org.todomessage.services.TodoService;

@RestController
@RequestMapping("/api/todos")
public class TodoController {

    private final TodoService todoService;

    public TodoController(final TodoService todoService,
                          final TodoMapper todoMapper) {
        this.todoService = todoService;
    }

    @GetMapping
    public List<TodoDto> getAll() {
        return todoService.getAll();
    }

    @PostMapping
    public TodoDto createOne(@RequestBody TodoDto todoDto) {
        return todoService.createOne(todoDto);
    }

    @PutMapping
    public TodoDto updateOne(@RequestBody TodoDto todoDto) {
        return todoService.updateOne(todoDto);
    }

    @DeleteMapping
    public void deleteOne(@RequestBody TodoDto todoDto) {
        todoService.deleteOne(todoDto);
    }
}

