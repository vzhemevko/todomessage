package org.todomessage.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.todomessage.dtos.CardDto;
import org.todomessage.mappers.CardMapper;
import org.todomessage.repositories.CardRepository;

@RestController
@RequestMapping("/api/cards")
public class CardController {

    private final CardRepository cardRepository;
    private final CardMapper cardMapper;

    public CardController(final CardRepository cardRepository,
                           final CardMapper cardMapper) {
        this.cardRepository = cardRepository;
        this.cardMapper = cardMapper;
    }

    @GetMapping
    public List<CardDto> getAll() {
        return cardMapper.toCardDtoList(cardRepository.findAll());
    }
}
