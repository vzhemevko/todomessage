import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const useStyles = makeStyles((theme) => ({
  timeBtn: {
    width: 75,
    height: 35,
  },
}));

function TimePicker() {
  return (
    <form noValidate>
      <TextField
        id="time"
        type="time"
        defaultValue="07:30"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
      />
    </form>
  );
}

// TODO add props type
export default function TodoMsgTodoEdit(props) {
  const classes = useStyles();
  const [todo, setTodo] = useState(props.todo);
  let { card } = props;

  const handleNameChange = (name) => {
    card.todos = card.todos.map((t) => (t.id === todo.id ? todo : t));
    setTodo({ ...todo, name });
  };

  return (
    <Box>
      <Box display="flex" alignItems="center">
        <Box order={1} flexGrow={1}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            value={todo.name}
            style={{ width: '100%' }} // TODO
            onChange={(e) => handleNameChange(e.target.value)}
          />
        </Box>

        {false ? (
          <Box order={2} display="flex">
            <IconButton aria-label="delete todo" onClick={props.todoFinishEdit}>
              <CloseIcon />
            </IconButton>
            <IconButton aria-label="add new todo">
              <AddIcon />
            </IconButton>
          </Box>
        ) : (
          <Box order={2} display="flex">
            <IconButton aria-label="delete todo">
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="save todo" onClick={props.todoFinishEdit}>
              <SaveIcon />
            </IconButton>
          </Box>
        )}
      </Box>
      <Box display="flex" alignItems="center">
        <Box m={1}>
          <Typography variant="subtitle2">Notify</Typography>
        </Box>
        <Box m={1}>
          <ToggleButtonGroup size="small" exclusive value="morning">
            <ToggleButton key={1} value="morning" className={classes.timeBtn}>
              Morning
            </ToggleButton>
            <ToggleButton key={2} value="noon" className={classes.timeBtn}>
              Noon
            </ToggleButton>
            <ToggleButton key={3} value="evening" className={classes.timeBtn}>
              Evening
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box m={1}>
          <Typography variant="subtitle2">at</Typography>
        </Box>
        <Box m={1}>
          <TimePicker />
        </Box>
      </Box>
    </Box>
  );
}
