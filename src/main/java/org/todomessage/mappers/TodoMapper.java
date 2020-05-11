package org.todomessage.mappers;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.todomessage.dtos.TodoDto;
import org.todomessage.entities.Todo;

@Mapper
public interface TodoMapper {

    @Mapping(source = "card.id", target = "cardId")
    TodoDto toTodoDto(Todo todo);

    List<TodoDto> toTodoDtoList(List<Todo> todos);

    @Mapping(source = "cardId", target = "card.id")
    Todo toTodoEntity(TodoDto todo);

    List<Todo> toTodoEntityList(List<TodoDto> todos);
}
