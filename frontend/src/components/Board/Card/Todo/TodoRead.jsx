import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';

// TODO add props type
export default function TodoMsgTodoRead(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box order={1} flexGrow={1} onClick={props.todoStartEdit}>
        <Typography variant={props.todo.new ? 'subtitle2' : 'subtitle1'}>
          {props.todo.name}
        </Typography>
      </Box>

      {props.todo.new ? (
        <Box order={2}>
          <IconButton aria-label="add new todo" onClick={props.todoStartEdit}>
            <AddIcon />
          </IconButton>
        </Box>
      ) : (
        <Box order={2}>
          <IconButton aria-label="check todo">
            <CheckIcon />
          </IconButton>
          <IconButton aria-label="edit todo" onClick={props.todoStartEdit}>
            <EditIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}
