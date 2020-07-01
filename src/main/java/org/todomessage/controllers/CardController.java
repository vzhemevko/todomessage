package org.todomessage.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;
import org.todomessage.dtos.CardDto;
import org.todomessage.services.CardService;

import java.util.List;
import java.util.UUID;

@Tag(name = "Card", description = "Card API")
@RestController
@RequestMapping("/api/cards")
public class CardController {

    private final CardService cardService;
    
    public CardController(final CardService cardService) {
        this.cardService = cardService;
    }
    
    @Operation(summary = "Get all Cards")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "successful operation")
    })
    @GetMapping
    public List<CardDto> getAll() {
        return cardService.getAll();
    }
    
    @Operation(summary = "Get Card by ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "successful operation")
    })
    @GetMapping("/{id}")
    public CardDto getOne(@PathVariable UUID id) {
        return cardService.getOne(id);
    }
    
    @Operation(summary = "Update Card based on the request payload")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "successful operation")
    })
    @PutMapping
    public CardDto updateOne(@RequestBody CardDto cardDto) {
        return cardService.updateOne(cardDto);
    }
}
