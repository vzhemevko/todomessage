import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';
import Todo from './Todo/Todo';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    maxWidth: 750,
    minWidth: 250,
    margin: `${theme.spacing(2)}px auto`,
    padding: theme.spacing(2),
    cursor: 'pointer',
    background: theme.palette.primary.main,
  },
  todo: {
    width: '100%',
    marginLeft: 15,
  },
  cardTitle: {
    color: theme.palette.secondary.main,
    paddingBottom: theme.spacing(2),
  },
}));

// TODO add props type
export default function TodoMsgBoardCard(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
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
              <Todo card={props.card} todo={t} />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </div>
  );
}
