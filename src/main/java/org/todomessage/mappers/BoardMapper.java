package org.todomessage.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.todomessage.dtos.BoardDto;
import org.todomessage.entities.Board;

import java.util.List;

@Mapper(uses = CardMapper.class)
public interface BoardMapper {

    @Mapping( target="key", ignore=true)
    BoardDto toBoardDto(Board board);

    List<BoardDto> toBoardDtoList(List<Board> boards);

    Board toBoardEntity(BoardDto board);

    List<Board> toBoardEntityList(List<BoardDto> boards);
}
