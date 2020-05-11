package org.todomessage.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.todomessage.dtos.BoardDto;
import org.todomessage.mappers.BoardMapper;
import org.todomessage.repositories.BoardRepository;

@RestController
@RequestMapping("/api/boards")
public class BoardController {

    private final BoardRepository boardRepository;
    private final BoardMapper boardMapper;

    public BoardController(final BoardRepository boardRepository,
                           final BoardMapper boardMapper) {
        this.boardRepository = boardRepository;
        this.boardMapper = boardMapper;
    }

    @GetMapping
    public List<BoardDto> getAll() {
        return boardMapper.toBoardDtoList(boardRepository.findAll());
    }

}
