package org.todomessage.mappers;

import java.util.List;

import org.mapstruct.Mapper;
import org.todomessage.dtos.BoardDto;
import org.todomessage.entities.Board;

@Mapper(uses = CardMapper.class)
public interface BoardMapper {

    BoardDto toBoardDto(Board board);

    List<BoardDto> toBoardDtoList(List<Board> boards);

    Board toBoardEntity(BoardDto board);

    List<Board> toBoardEntityList(List<BoardDto> boards);
}
