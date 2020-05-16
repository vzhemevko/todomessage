import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Box } from '@material-ui/core';

// TODO add props type
export default function TodoMsgTodoEdit({
  todoState,
  handleTodoNameChange,
  switchRead,
}) {
  return (
    <Box>
      <TextField
        id="outlined-basic"
        variant="outlined"
        size="small"
        value={todoState.name}
        fullWidth
        onChange={(e) => handleTodoNameChange(e.target.value)}
        onKeyPress={(e) => {
          console.log(e.key);
          if (e.key === 'Enter') {
            switchRead();
          }
        }}
        color={'secondary'}
      />
    </Box>
  );
}
