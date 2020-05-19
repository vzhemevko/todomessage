import React from 'react';

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  IconButton,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { format, getDay, parseISO } from 'date-fns';

import TodoOne from 'components/Board/Card/Todo/Todo';
import { useApp } from 'hooks/useApp';
import useStyles from 'components/Board/Card/cardStyle';

const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const TODO_NUMBER_LIMIT = 10;

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
          title={DAY_NAMES[getDay(parseISO(props.card.day))]}
          subheader={format(parseISO(props.card.day), 'MMM d')}
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
            {props.card.todos.length < TODO_NUMBER_LIMIT ? (
              <IconButton
                aria-label="add todo"
                onClick={handleAddTodo}
                className={classes.cardActionsIcon}
              >
                <AddIcon fontSize="default" />
              </IconButton>
            ) : null}
          </CardActions>
        </div>
      </Card>
    </div>
  );
}
