import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import { Box } from '@material-ui/core';
import TodoEditOne from './edit/TodoEdit';
import TodoNotifyOne from './notify/TodoNotify';
import TodoReadOne from './read/TodoRead';

import { useApp } from 'hooks/useApp';
import { useAlert } from 'hooks/common/useAlert';
import useStyles from './todoStyle';

// TODO add props type
export default function TodoMsgTodo(props) {
  const classes = useStyles();
  const [todoElevation, setTodoElevation] = useState(1);

  const [edit, setEdit] = useState(false);
  const [notify, setNotify] = useState(false);
  const [read, setRead] = useState(true);

  const [todoState, setTodoState] = useState(props.todo);
  const [dueTimeFixed, setDueTimeFixed] = useState('06:00:00');

  const { deleteTodo, updateTodo, openInfoAlert } = useApp();

  useEffect(() => {
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
            <span />

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
              <IconButton aria-label="delete todo" onClick={handleTodoDelete}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Paper>
    </div>
  );
}
