import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Box } from '@material-ui/core';

// TODO add props type
export default function TodoMsgTodoEdit({ todoState, handleTodoNameChange }) {
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
