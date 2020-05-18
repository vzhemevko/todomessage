package org.todomessage.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.todomessage.entities.Board;

import java.util.Optional;
import java.util.UUID;
@Repository
public interface BoardRepository extends JpaRepository<Board, UUID> {

    Optional<Board> findByName(String name);
}
