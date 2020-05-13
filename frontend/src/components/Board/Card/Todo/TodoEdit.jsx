import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  class: {},
}));

// TODO add props type
export default function TodoMsgTodo({ todoState, handleTodoNameChange }) {
  const classes = useStyles();

  return (
    <Box>
      <TextField
        id="outlined-basic"
        variant="outlined"
        size="small"
        value={todoState.name}
        style={{ width: '100%' }} // TODO
        onChange={(e) => handleTodoNameChange(e.target.value)}
      />
    </Box>
  );
}
