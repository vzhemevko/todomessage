package org.todomessage.entities;

import javax.persistence.*;
import java.time.LocalTime;
import java.util.Objects;
import java.util.UUID;

@Entity
public class Todo {

    @Id
    @GeneratedValue
    private UUID id;

    private String name;

    @Column(name = "due_time")
    private LocalTime dueTime;

    private Boolean ready;

    private Boolean done;

    private Short position;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "card_id")
    private Card card;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalTime  getDueTime() {
        return dueTime;
    }

    public void setDueTime(LocalTime  dueTime) {
        this.dueTime = dueTime;
    }

    public Boolean getReady() {
        return ready;
    }

    public void setReady(Boolean ready) {
        this.ready = ready;
    }

    public Boolean getDone() {
        return done;
    }

    public void setDone(Boolean done) {
        this.done = done;
    }

    public Short getPosition() {
        return position;
    }

    public void setPosition(Short position) {
        this.position = position;
    }

    public Card getCard() {
        return card;
    }

    public void setCard(Card card) {
        this.card = card;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Todo todo = (Todo) o;
        return Objects.equals(name, todo.name) &&
                Objects.equals(dueTime, todo.dueTime) &&
                Objects.equals(ready, todo.ready) &&
                Objects.equals(done, todo.done) &&
                Objects.equals(position, todo.position) &&
                Objects.equals(card, todo.card);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, dueTime, ready, done, position, card);
    }
}
