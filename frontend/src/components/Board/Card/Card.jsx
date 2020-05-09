import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Checkbox from '@material-ui/core/Checkbox';
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 1000,
    margin: `${theme.spacing(2)}px auto`,
    padding: theme.spacing(2),
    cursor: 'pointer',
  },
  todo: {
    width: '90%',
    marginLeft: 15,
  },
}));

export default function TodoMsgBoardCard(props) {
  const classes = useStyles();

  const [dayHover, setDayHover] = React.useState(1);

  const dayHoverOver = () => {
    setDayHover(10);
  };
  const dayHoverOut = () => {
    setDayHover(1);
  };

  return (
    <Paper
      className={classes.paper}
      onMouseOver={dayHoverOver}
      onMouseOut={dayHoverOut}
      elevation={dayHover}
    >
      <Grid
        container
        direction="column"
        alignItems="flex-start"
        wrap="nowrap"
        spacing={2}
      >
        <Grid item xs>
          <Box display="flex" alignItems="center">
            <Typography>{props.day.name}</Typography>
            &nbsp;
            <Typography>{props.day.date}</Typography>
          </Box>
        </Grid>
        <Grid item xs>
          <Box display="flex" alignItems="center">
            <Checkbox inputProps={{ 'aria-label': 'primary checkbox' }} />
            <Typography>Get Milk </Typography>
          </Box>
        </Grid>
        <Grid container display="flex" alignItems="center">
          <Grid item xs>
            <TextField
              id="standard-basic"
              label="new todo..."
              className={classes.todo}
            ></TextField>
            <IconButton aria-label="add new todo">
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
