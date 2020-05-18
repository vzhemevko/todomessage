import React from 'react';

import { Box, IconButton, Paper } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';

import useStyles from 'components/Board/Card/Todo/todoStyle';
import TodoEditOne from 'components/Board/Card/Todo/Edit/TodoEdit';
import TodoNotifyOne from 'components/Board/Card/Todo/Notify/TodoNotify';
import TodoReadOne from 'components/Board/Card/Todo/Read/TodoRead';
import { useApp } from 'hooks/useApp';

export default function TodoMsgTodo(props) {
  const classes = useStyles();
  const [todoElevation, setTodoElevation] = React.useState(1);

  const [edit, setEdit] = React.useState(false);
  const [notify, setNotify] = React.useState(false);
  const [read, setRead] = React.useState(true);

  const [todoState, setTodoState] = React.useState(props.todo);
  const [dueTimeFixed, setDueTimeFixed] = React.useState('06:00:00');

  const { deleteTodo, updateTodo, openInfoAlert } = useApp();

  React.useEffect(() => {
    setTodoState(props.todo);
  }, [props.todo]);

  const todoHoverOver = () => {
    setTodoElevation(10);
  };
  const todoHoverOut = () => {
    setTodoElevation(3);
  };

  const switchEdit = () => {
    setEdit(true);
    setNotify(false);
    setRead(false);
  };

  const switchRead = () => {
    setEdit(false);
    setNotify(false);
    setRead(true);
    handleDone();
    updateTodo(todoState);
  };

  const handleDone = () => {
    if (read) {
      props.todo.done = !props.todo.done;
      if (props.todo.done) {
        openInfoAlert('Notification are not sent for the completed todos');
      }
    }
  };

  const switchNotify = () => {
    setEdit(false);
    setNotify(true);
    setRead(false);
  };

  const handleTodoDueTimeChange = (dueTime) => {
    console.log(dueTime);
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
        <Box display="flex" justifyContent="flex-start" alignItems="center">
          <Box order={1} flexGrow={1}>
            <Box>
              {read ? (
                <Box onClick={switchEdit}>
                  <TodoReadOne todoState={todoState} onClick={switchEdit} />
                </Box>
              ) : null}
              {edit ? (
                <TodoEditOne
                  todoState={todoState}
                  handleTodoNameChange={handleTodoNameChange}
                  switchRead={switchRead}
                />
              ) : null}
              {notify ? (
                <TodoNotifyOne
                  todoState={todoState}
                  day={props.card.day}
                  dueTimeFixed={dueTimeFixed}
                  handleTodoDueTimeChange={handleTodoDueTimeChange}
                />
              ) : null}
            </Box>
          </Box>
          <Box order={2} display="flex">
            <Box>
              <IconButton
                aria-label="check todo"
                onClick={switchRead}
                disabled={!todoState.ready}
              >
                <CheckIcon />
              </IconButton>
              <IconButton aria-label="edit todo" onClick={switchEdit}>
                <EditIcon
                  className={!todoState.ready ? classes.iconAction : null}
                />
              </IconButton>
              <IconButton aria-label="alarm todo" onClick={switchNotify}>
                <AlarmOnIcon />
              </IconButton>
              <IconButton
                aria-label="delete todo"
                onClick={handleTodoDelete}
                className={classes.iconDefault}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Paper>
    </div>
  );
}
