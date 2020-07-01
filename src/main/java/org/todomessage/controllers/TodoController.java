package org.todomessage.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;
import org.todomessage.dtos.TodoDto;
import org.todomessage.services.TodoService;

import java.util.List;
import java.util.UUID;

import static org.springframework.http.HttpStatus.NO_CONTENT;

@Tag(name = "Todo", description = "Todo API")
@RestController
@RequestMapping("/api/todos")
public class TodoController {

    private final TodoService todoService;

    public TodoController(final TodoService todoService) {
        this.todoService = todoService;
    }
    
    @Operation(summary = "Get all Todos")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "successful operation")
    })
    @GetMapping
    public List<TodoDto> getAll() {
        return todoService.getAll();
    }
    
    @Operation(summary = "Create Todo based on the request payload")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "successful operation")
    })
    @PostMapping
    public TodoDto createOne(@RequestBody TodoDto todoDto) {
        return todoService.createOne(todoDto);
    }
    
    @Operation(summary = "Update Todo based on the request payload")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "successful operation")
    })
    @PutMapping
    public TodoDto updateOne(@RequestBody TodoDto todoDto) {
        return todoService.updateOne(todoDto);
    }
    
    @Operation(summary = "Delete Todo by ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "successful operation")
    })
    @ResponseStatus(NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteOne(@PathVariable UUID id) {
        todoService.deleteOne(id);
    }
}

