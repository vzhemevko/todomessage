import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paperTodo: {
    width: '100%',
    margin: `${theme.spacing(0.1)}px auto`,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    padding: theme.spacing(0.5),
    cursor: 'pointer',
  },
  doneTodo: {
    textDecoration: 'line-through',
  },
}));

// TODO add props type
export default function TodoMsgTodo({ todoState }) {
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
