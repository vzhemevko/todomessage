package org.todomessage.controllers;

import org.springframework.web.bind.annotation.*;
import org.todomessage.dtos.TodoDto;
import org.todomessage.mappers.TodoMapper;
import org.todomessage.services.TodoService;

import java.util.List;
import java.util.UUID;

@CrossOrigin
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

    @DeleteMapping("/{id}")
    public void deleteOne(@PathVariable UUID id) {
        todoService.deleteOne(id);
    }
}

