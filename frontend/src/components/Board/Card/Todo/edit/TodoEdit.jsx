import React from 'react';

import { Box, TextField } from '@material-ui/core';

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
