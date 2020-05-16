package org.todomessage.services;

import org.springframework.stereotype.Service;
import org.todomessage.dtos.CardDto;
import org.todomessage.mappers.CardMapper;
import org.todomessage.repositories.CardRepository;

import java.util.List;
import java.util.UUID;

@Service
public class CardService {

    private final CardRepository cardRepository;
    private final CardMapper cardMapper;

    public CardService(final CardRepository cardRepository,
                       final CardMapper cardMapper) {
        this.cardRepository = cardRepository;
        this.cardMapper = cardMapper;
    }

    public List<CardDto> getAll() {
        return cardMapper.toCardDtoList(cardRepository.findAll());
    }

    public CardDto getOne(UUID id) {
        return cardMapper.toCardDto(cardRepository.findById(id).get());
    }

    public CardDto updateOne(CardDto cardDto) {
        return cardMapper.toCardDto(cardRepository.save(cardMapper.toCardEntity(cardDto)));
    }
}
