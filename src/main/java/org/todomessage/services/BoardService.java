package org.todomessage.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.todomessage.dtos.BoardDto;
import org.todomessage.mappers.BoardMapper;
import org.todomessage.repositories.BoardRepository;

import java.util.List;

@Service
public class BoardService {

    private final BoardRepository boardRepository;
    private final BoardMapper boardMapper;

    public BoardService(final BoardRepository boardRepository,
                        final BoardMapper boardMapper) {
        this.boardRepository = boardRepository;
        this.boardMapper = boardMapper;
    }

    public List<BoardDto> getAll() {
        return boardMapper.toBoardDtoList(boardRepository.findAll());
    }

    @Transactional
    public BoardDto getByName(String name) {
        return boardMapper.toBoardDto(boardRepository.findByName(name));
    }
}
