package org.todomessage.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.todomessage.dtos.CardDto;
import org.todomessage.entities.Card;

import java.util.List;

@Mapper(uses = TodoMapper.class)
public interface CardMapper {

    @Mapping(source = "board.id", target = "boardId")
    CardDto toCardDto(Card card);

    List<CardDto> toCardDtoList(List<Card> cards);

    @Mapping(source = "boardId", target = "board.id")
    Card toCardEntity(CardDto card);

    List<Card> toCardEntityList(List<CardDto> cards);
}
