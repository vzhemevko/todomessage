package org.todomessage.controllers;

import org.springframework.web.bind.annotation.*;
import org.todomessage.dtos.BoardDto;
import org.todomessage.services.BoardService;

@RestController
@RequestMapping("/api/boards")
public class BoardController {

    private final BoardService boardService;
    
    public BoardController(final BoardService boardService) {
        this.boardService = boardService;
    }

    @GetMapping("/{name}")
    public BoardDto getByName(@PathVariable String name) {
        return boardService.getByName(name);
    }

    @PostMapping
    public BoardDto createOne(@RequestBody BoardDto boardDto) {
        return boardService.createOne(boardDto);
    }

    @PutMapping
    public BoardDto updateOne(@RequestBody BoardDto boardDto) {
        return boardService.updateOne(boardDto);
    }
}
