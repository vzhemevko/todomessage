package org.todomessage.entities;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;

@Entity
public class Card {

    @Id
    @GeneratedValue
    private UUID id;

    private LocalDate day;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;

    @OrderBy("position ASC")
    @OneToMany(mappedBy = "card", cascade= CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Todo> todos;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public LocalDate getDay() {
        return day;
    }

    public void setDay(LocalDate  day) {
        this.day = day;
    }

    public Board getBoard() {
        return board;
    }

    public void setBoard(Board board) {
        this.board = board;
    }

    public Set<Todo> getTodos() {
        return todos;
    }

    public void setTodos(Set<Todo> todos) {
        this.todos = todos;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Card card = (Card) o;
        return Objects.equals(day, card.day) &&
                Objects.equals(board, card.board);
    }

    @Override
    public int hashCode() {
        return Objects.hash(day, board);
    }
}
