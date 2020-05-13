package org.todomessage.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.todomessage.dtos.CardDto;
import org.todomessage.services.CardService;

@RestController
@RequestMapping("/api/cards")
public class CardController {

    private final CardService cardService;

    public CardController(final CardService cardService) {
        this.cardService = cardService;
    }

    @GetMapping
    public List<CardDto> getAll() {
        return cardService.getAll();
    }

    @GetMapping("/{id}")
    public CardDto getOne(@PathVariable String id) {
        return cardService.getOne(id);
    }

    @PutMapping
    public CardDto updateOne(@RequestBody CardDto cardDto) {
        return cardService.updateOne(cardDto);
    }
}
