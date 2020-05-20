package org.todomessage.services;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.todomessage.entities.Board;
import org.todomessage.repositories.BoardRepository;

@Service
public class BoardDetailsService implements UserDetailsService {

    private final BoardRepository boardRepository;
    
    public BoardDetailsService(final BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String boardName) throws UsernameNotFoundException {
        Board board = boardRepository.findByName(boardName).orElseThrow(() -> new RuntimeException("Board not found."));
        User.UserBuilder builder = User.withUsername(boardName);
        builder.password(board.getKey());
        builder.roles("BOARD");
        return builder.build();
    }
}
