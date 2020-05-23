package org.todomessage.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.todomessage.entities.Todo;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface TodoRepository extends JpaRepository<Todo, UUID> {
    
    Optional<Todo> findFirstByCard_Board_IdOrderByUpdateAtDesc(UUID boardId);
}