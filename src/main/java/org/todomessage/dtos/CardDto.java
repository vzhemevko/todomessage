package org.todomessage.dtos;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public class CardDto {

    private UUID id;

    private LocalDate day;

    private UUID boardId;

    private List<TodoDto> todos;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public LocalDate  getDay() {
        return day;
    }

    public void setDay(LocalDate  day) {
        this.day = day;
    }

    public UUID getBoardId() {
        return boardId;
    }

    public void setBoardId(UUID boardId) {
        this.boardId = boardId;
    }

    public List<TodoDto> getTodos() {
        return todos;
    }

    public void setTodos(List<TodoDto> todos) {
        this.todos = todos;
    }
}
