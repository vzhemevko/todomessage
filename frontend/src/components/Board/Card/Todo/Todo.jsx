import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import TodoEditOne from './TodoEdit';
import TodoNotifyOne from './TodoNotify';
import TodoReadOne from './TodoRead';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

import { useApi } from 'hooks/useApi';
import { useApp } from 'hooks/useApp';
import { useAlert } from 'hooks/useAlert';

const useStyles = makeStyles((theme) => ({
  paperTodo: {
    width: '100%',
    margin: `${theme.spacing(0.1)}px auto`,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    padding: theme.spacing(0.5),
    cursor: 'pointer',
  },
  iconAction: {
    color: theme.palette.action.main,
  },
}));

// TODO add props type
export default function TodoMsgTodo(props) {
  const classes = useStyles();
  const [todoElevation, setTodoElevation] = useState(1);
  const [edit, setEdit] = useState(false);
  const [notify, setNotify] = useState(false);
  const [read, setRead] = useState(true);
  const [valid, setValid] = useState(false);
  const [todoState, setTodoState] = useState(props.todo);
  const [dueTimeFixed, setDueTimeFixed] = useState('06:00:00');
  const { setTodo } = useApp();
  const { updateCard, deleteTodo, updateTodo } = useApi();
  const { openInfoAlert } = useAlert();

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

    /* let todoDone = !todoState.done;
    setTodoState({ ...todoState, done: todoDone });
    if (!todoState.done) {
      openInfoAlert('Notification are not sent for the completed todos');
    } */
    updateTodo(todoState);
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
