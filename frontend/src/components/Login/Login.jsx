import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import useStyles from 'components/Login/loginStyle';
import { useApp } from 'hooks/useApp';

export default function TodoMsgLogin() {
  const classes = useStyles();
  const [boardName, setBoardName] = React.useState('');
  const [boardKey, setBoardKey] = React.useState('');
  const { loginBoard } = useApp();

  const signInBoard = (event) => {
    event.preventDefault();
    loginBoard(boardName, boardKey);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h4">
            Todo Message
          </Typography>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="subtitle1">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={signInBoard}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="boardName"
              label="Board Name"
              name="boardName"
              autoFocus
              value={boardName}
              onChange={(event) => setBoardName(event.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="boarKey"
              label="Board Key"
              type="password"
              id="boarKey"
              autoComplete="current-password"
              value={boardKey}
              onChange={(event) => setBoardKey(event.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have a board? Create one"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
