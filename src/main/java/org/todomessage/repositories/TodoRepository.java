package org.todomessage.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.todomessage.entities.Todo;

@Repository
public interface TodoRepository extends JpaRepository<Todo, UUID> {}
