package org.todomessage.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;
import org.todomessage.dtos.BoardDto;
import org.todomessage.services.BoardService;

@Tag(name = "Board", description = "Board API")
@RestController
@RequestMapping("/api/boards")
public class BoardController {

    private final BoardService boardService;
    
    public BoardController(final BoardService boardService) {
        this.boardService = boardService;
    }
    
    @Operation(summary = "Get Board by name")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "successful operation")
    })
    @GetMapping("/{name}")
    public BoardDto getByName(@PathVariable String name) {
        return boardService.getByName(name);
    }
    
    @Operation(summary = "Create Board based on the request payload")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "successful operation")
    })
    @PostMapping
    public BoardDto createOne(@RequestBody BoardDto boardDto) {
        return boardService.createOne(boardDto);
    }
    
    @Operation(summary = "Update Board based on the request payload")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "successful operation")
    })
    @PutMapping
    public BoardDto updateOne(@RequestBody BoardDto boardDto) {
        return boardService.updateOne(boardDto);
    }
}
