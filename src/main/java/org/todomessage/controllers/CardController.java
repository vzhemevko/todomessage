package org.todomessage.controllers;

import org.springframework.web.bind.annotation.*;
import org.todomessage.dtos.CardDto;
import org.todomessage.services.CardService;

import java.util.List;
import java.util.UUID;

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
    public CardDto getOne(@PathVariable UUID id) {
        return cardService.getOne(id);
    }

    @PutMapping
    public CardDto updateOne(@RequestBody CardDto cardDto) {
        return cardService.updateOne(cardDto);
    }
}
