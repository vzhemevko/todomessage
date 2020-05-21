package org.todomessage.entities;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.*;

import static java.util.Objects.nonNull;
import static org.springframework.util.StringUtils.isEmpty;

@Entity
public class Board {

    @Id
    @GeneratedValue
    private UUID id;

    private String name;

    @Column(updatable= false)
    private String key;

    private String timeZone;

    private String emails;

    private Short theme;
    
    @Column(name = "update_at")
    private LocalDate updateAt;

    @OrderBy("day ASC")
    @OneToMany(mappedBy = "board", cascade= CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Card> cards;
    
    @PreUpdate
    protected void onUpdate() {
        setUpdateAt(LocalDate.now());
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name.toLowerCase();
    }

    public void setName(String name) {
        this.name = name.toLowerCase();
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getTimeZone() {
        return timeZone;
    }

    public void setTimeZone(String timeZone) {
        this.timeZone = timeZone;
    }

    public List<String> getEmails() {
        return !isEmpty(emails) ? Arrays.asList(emails.split("\\s*,\\s*")) : new ArrayList<>();
    }

    public void setEmails(List<String> emails) {
        this.emails = nonNull(emails) ? String.join(",", emails) : "";
    }

    public void setEmails(String emails) {
        this.emails = emails;
    }

    public Short getTheme() {
        return theme;
    }

    public void setTheme(Short theme) {
        this.theme = theme;
    }
    
    public LocalDate getUpdateAt() {
        return updateAt;
    }
    
    public void setUpdateAt(LocalDate updateAt) {
        this.updateAt = updateAt;
    }
    
    public Set<Card> getCards() {
        return cards;
    }

    public void setCards(Set<Card> cards) {
        this.cards = cards;
    }
}
