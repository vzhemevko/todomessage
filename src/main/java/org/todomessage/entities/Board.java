package org.todomessage.entities;

import javax.persistence.*;
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

    @OneToMany(mappedBy = "board", fetch = FetchType.LAZY)
    private Set<Card> cards;

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

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public List<String> getEmails() {
        return !isEmpty(emails) ? Arrays.asList(emails.split("\\s*,\\s*")) : new ArrayList<>();
    }

    public void setEmails(List<String> emails) {
        this.emails = nonNull(emails) ? String.join(",", emails) : "";
    }

    public String getTimeZone() {
        return timeZone;
    }

    public void setTimeZone(String timeZone) {
        this.timeZone = timeZone;
    }

    public Set<Card> getCards() {
        return cards;
    }

    public void setCards(Set<Card> cards) {
        this.cards = cards;
    }
}
