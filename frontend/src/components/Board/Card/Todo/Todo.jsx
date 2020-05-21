import React from 'react';

import { Box, IconButton, Paper, Grid } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';

import useStyles from 'components/Board/Card/Todo/todoStyle';
import TodoEdit from 'components/Board/Card/Todo/Edit/TodoEdit';
import TodoNotify from 'components/Board/Card/Todo/Notify/TodoNotify';
import TodoRead from 'components/Board/Card/Todo/Read/TodoRead';
import { useApp } from 'hooks/useApp';

const READ_MODE = 0;
const EDIT_MODE = 1;
const NOTIFY_MODE = 2;

export default function TodoMsgTodo(props) {
  const classes = useStyles();
  const [todoElevation, setTodoElevation] = React.useState(1);

  const [todoState, setTodoState] = React.useState(props.todo);
  const [dueTimeFixed, setDueTimeFixed] = React.useState('06:00:00');

  const { deleteTodo, updateTodo, openInfoAlert } = useApp();

  React.useEffect(() => {
    setTodoState(props.todo);
  }, [props.todo]);

  const isMode = (mode) => {
    switch (mode) {
      case READ_MODE:
        return props.todo.mode === READ_MODE;
      case EDIT_MODE:
        return props.todo.mode === EDIT_MODE;
      case NOTIFY_MODE:
        return props.todo.mode === NOTIFY_MODE;
      default:
        return false;
    }
  };

  const todoHoverOver = () => {
    setTodoElevation(10);
  };
  const todoHoverOut = () => {
    setTodoElevation(3);
  };

  const switchRead = () => {
    handleDone();
    updateTodo({ ...todoState, mode: READ_MODE });
  };

  const switchEdit = () => {
    props.todo.mode = EDIT_MODE;
  };

  const switchNotify = () => {
    props.todo.mode = NOTIFY_MODE;
  };

  const handleDone = () => {
    if (isMode(READ_MODE)) {
      props.todo.done = !props.todo.done;
      if (props.todo.done) {
        openInfoAlert('Notification are not sent for the completed todos');
      }
    }
  };

  const handleTodoDueTimeChange = (dueTime) => {
    setTodoState({ ...todoState, dueTime: dueTime });
    setDueTimeFixed(dueTime);
  };

  const handleTodoNameChange = (name) => {
    setTodoState({ ...todoState, name: name, ready: !!name });
  };

  const handleTodoDelete = () => {
    deleteTodo(todoState);
  };

  return (
    <div>
      <Paper
        className={classes.paperTodo}
        onMouseOver={todoHoverOver}
        onMouseOut={todoHoverOut}
        elevation={todoElevation}
      >
        <Grid container direction="column" spacing={2}>
          <Grid item xs className={classes.todoItem}>
            {isMode(READ_MODE) ? (
              <Box className={classes.todoRead} onClick={switchEdit}>
                <TodoRead todoState={todoState} />
              </Box>
            ) : null}
            {isMode(EDIT_MODE) ? (
              <TodoEdit
                todoState={todoState}
                handleTodoNameChange={handleTodoNameChange}
                switchRead={switchRead}
              />
            ) : null}
            {isMode(NOTIFY_MODE) ? (
              <TodoNotify
                todoState={todoState}
                day={props.card.day}
                dueTimeFixed={dueTimeFixed}
                handleTodoDueTimeChange={handleTodoDueTimeChange}
              />
            ) : null}
          </Grid>
          <Grid
            item
            xs
            container
            justify="flex-end"
            className={classes.todoItem}
          >
            <IconButton
              aria-label="check todo"
              onClick={switchRead}
              disabled={!todoState.ready}
            >
              <CheckIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="edit todo" onClick={switchEdit}>
              <EditIcon
                className={!todoState.ready ? classes.iconAction : null}
                fontSize="small"
              />
            </IconButton>
            <IconButton aria-label="alarm todo" onClick={switchNotify}>
              <AlarmOnIcon fontSize="small" />
            </IconButton>
            <IconButton
              aria-label="delete todo"
              onClick={handleTodoDelete}
              className={classes.iconDefault}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
