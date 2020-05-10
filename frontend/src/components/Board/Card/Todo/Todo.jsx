import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TodoRead from './TodoRead';
import TodoEdit from './TodoEdit';
import Zoom from '@material-ui/core/Zoom';

const useStyles = makeStyles((theme) => ({
  paperTodo: {
    width: '100%',
    margin: `${theme.spacing(0.1)}px auto`,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    padding: theme.spacing(0.5),
    cursor: 'pointer',
  },
}));

// TODO add props type
export default function TodoMsgTodo(props) {
  const classes = useStyles();

  const [todoElevation, setTodoElevation] = useState(1);
  const [edit, setEdit] = useState(false);

  const todoHoverOver = () => {
    setTodoElevation(10);
  };
  const todoHoverOut = () => {
    setTodoElevation(3);
  };

  const todoStartEdit = () => {
    setEdit(true);
  };

  const todoFinishEdit = () => {
    console.log('todoFinishEdit');
    setEdit(false);
  };

  return (
    <Paper
      className={classes.paperTodo}
      onMouseOver={todoHoverOver}
      onMouseOut={todoHoverOut}
      elevation={todoElevation}
      onClick={todoStartEdit}
    >
      <Zoom
        in={!edit}
        style={{ transitionDelay: !edit ? '100ms' : '300ms' }}
        unmountOnExit={true}
      >
        <div>
          <div>
            <TodoRead {...props} />
          </div>
        </div>
      </Zoom>
      <Zoom
        in={edit}
        style={{ transitionDelay: edit ? '300ms' : '300ms' }}
        unmountOnExit={true}
      >
        <div>
          <TodoEdit {...props} finishEdit={edit} />
        </div>
      </Zoom>
    </Paper>
  );
}
