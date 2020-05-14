import React from 'react';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';
import TodoOne from './Todo/Todo';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';

import { useApp } from 'hooks/useApp';
import useStyles from './cardStyle';

// TODO add props type
export default function TodoMsgCard(props) {
  const classes = useStyles();
  const { createTodo } = useApp();

  const handleAddTodo = () => {
    let todo = {
      cardId: props.card.id,
      id: '',
      name: '',
      dueTime: '06:00:00',
      ready: false,
      done: false,
      position: props.card.todos.length + 1,
    };
    createTodo(todo);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.cardPaper} elevation={3}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          className={classes.cardTitle}
        >
          <Typography variant="h6">{props.card.day}</Typography>
          &nbsp;
          <Typography variant="caption">{props.card.day}</Typography>
        </Box>
        <Grid
          container
          direction="column"
          alignItems="stretch"
          justify="flex-start"
          spacing={1}
        >
          {props.card.todos.map((t, index) => (
            <Grid item key={index}>
              <TodoOne card={props.card} todo={t} isNewTodo={false} />
            </Grid>
          ))}
        </Grid>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          className={classes.addBtn}
        >
          <IconButton aria-label="add todo" onClick={handleAddTodo}>
            <AddIcon fontSize="large" />
          </IconButton>
        </Box>
      </Paper>
    </div>
  );
}
