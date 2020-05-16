package org.todomessage.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.todomessage.dtos.BoardDto;
import org.todomessage.services.BoardService;

import java.util.List;

@RestController
@RequestMapping("/api/boards")
public class BoardController {

    private final BoardService boardService;

    public BoardController(final BoardService boardService) {
        this.boardService = boardService;
    }

    @GetMapping
    public List<BoardDto> getAll() {
        return boardService.getAll();
    }

    @GetMapping("/{name}")
    public BoardDto getByName(@PathVariable String name) {
        return boardService.getByName(name);
    }
}
