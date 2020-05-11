package org.todomessage.mappers;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.todomessage.dtos.CardDto;
import org.todomessage.entities.Card;

@Mapper(uses = TodoMapper.class)
public interface CardMapper {

    @Mapping(source = "board.id", target = "boardId")
    CardDto toCardDto(Card card);

    @Named("cardListMapper")
    List<CardDto> toCardDtoList(List<Card> cards);

    @Mapping(source = "boardId", target = "board.id")
    Card toCardEntity(CardDto card);

    List<Card> toCardEntityList(List<CardDto> cards);


}
