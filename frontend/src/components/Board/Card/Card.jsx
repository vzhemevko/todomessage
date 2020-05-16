import React from 'react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
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
      <Card className={classes.card} elevation={3}>
        <CardHeader
          title={props.card.day}
          subheader={props.card.day}
          className={classes.cardHeader}
          classes={{
            title: classes.cardHeaderTitle,
          }}
        />
        <div className={classes.cardContent}>
          <CardContent>
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
          </CardContent>
        </div>
        <div className={classes.cardActions}>
          <CardActions disableSpacing>
            <IconButton
              aria-label="add todo"
              onClick={handleAddTodo}
              className={classes.cardActionsIcon}
            >
              <AddIcon fontSize="large" />
            </IconButton>
          </CardActions>
        </div>
      </Card>
    </div>
  );
}
