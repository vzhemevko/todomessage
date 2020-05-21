package org.todomessage.services;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.todomessage.dtos.BoardDto;
import org.todomessage.entities.Board;
import org.todomessage.mappers.BoardMapper;
import org.todomessage.repositories.BoardRepository;

import java.time.LocalDate;
import java.util.List;

@Service
public class BoardService {
    
    private final BoardRepository boardRepository;
    private final BoardMapper boardMapper;
    private final BCryptPasswordEncoder passwordEncoder;
    private final CardService cardService;
    
    public BoardService(final BoardRepository boardRepository,
                        final BoardMapper boardMapper,
                        final BCryptPasswordEncoder passwordEncoder,
                        final CardService cardService) {
        this.boardRepository = boardRepository;
        this.boardMapper = boardMapper;
        this.passwordEncoder = passwordEncoder;
        this.cardService = cardService;
    }

    public List<BoardDto> getAll() {
        return boardMapper.toBoardDtoList(boardRepository.findAll());
    }

    @Transactional
    public BoardDto getByName(String name) {
        Board board = boardRepository.findByName(name.toLowerCase())
                          .orElseThrow(() -> new RuntimeException("Board not found"));
        return boardMapper.toBoardDto(board);
    }

    public BoardDto createOne(BoardDto boardDto) {
        Board board = boardMapper.toBoardEntity(boardDto);
        board.setKey(passwordEncoder.encode(board.getKey()));
        board.setCards(cardService.generateDefaultCards(board));
        board.setUpdateAt(LocalDate.now());
        return boardMapper.toBoardDto(boardRepository.save(board));
    }

    public BoardDto updateOne(BoardDto boardDto) {
        return boardMapper.toBoardDto(boardRepository.save(boardMapper.toBoardEntity(boardDto)));
    }
}
