import React from 'react';

import { Typography, Box } from '@material-ui/core';

import useStyles from 'components/Board/Card/Todo/Read/todoReadStyle';

export default function TodoMsgTodoRead({ todoState }) {
  const classes = useStyles();
  return (
    <Box>
      {todoState.ready ? (
        <Typography
          variant="subtitle1"
          className={todoState.done ? classes.doneTodo : null}
        >
          {todoState.name}{' '}
        </Typography>
      ) : (
        <Typography variant="subtitle2" color="textSecondary">
          Finish editing to receive a notification message
        </Typography>
      )}
    </Box>
  );
}
