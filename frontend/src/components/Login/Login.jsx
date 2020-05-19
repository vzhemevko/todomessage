import React from 'react';

import {
  Button,
  Box,
  TextField,
  Link,
  Paper,
  Grid,
  Typography,
  Avatar,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';

import useStyles from 'components/Login/loginStyle';
import { useApp } from 'hooks/useApp';

export default function TodoMsgLogin() {
  const classes = useStyles();
  const {
    loginInputsKeeper,
    setLoginInputsKeeper,
    createBoard,
    loginBoard,
    openWarningAlert,
    defaultAppTheme,
  } = useApp();

  const [isCreateBoard, setIsCreateBoard] = React.useState(
    loginInputsKeeper.isCreateBoard
  );
  const [boardName, setBoardName] = React.useState(loginInputsKeeper.boardName);
  const [boardKey, setBoardKey] = React.useState(loginInputsKeeper.boardKey);
  const [confirmBoardKey, setConfirmBoardKey] = React.useState(
    loginInputsKeeper.confirmBoardKey
  );

  const submitBoard = (event) => {
    event.preventDefault();
    setLoginInputsKeeper({
      isCreateBoard: isCreateBoard,
      boardName: boardName,
      boardKey: boardKey,
      confirmBoardKey: confirmBoardKey,
    });

    if (isCreateBoard) {
      handleCreateBoard();
    } else {
      loginBoard(boardName, boardKey);
    }
  };

  const handleCreateBoard = () => {
    if (boardKey !== confirmBoardKey) {
      openWarningAlert("Keys don't match");
      return;
    }
    createBoard({
      id: '',
      name: boardName.trim(),
      key: boardKey,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      emails: [],
      theme: defaultAppTheme.index,
      cards: [],
    });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Box display="flex" alignItems="center">
            <NotificationsNoneIcon
              fontSize="large"
              className={classes.logoIcon}
            />
            <Typography component="h1" variant="h4">
              Todomessage
            </Typography>
          </Box>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="subtitle1">
            {isCreateBoard ? 'Create Board' : 'Sign in'}
          </Typography>
          <form className={classes.form} onSubmit={submitBoard}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="boardName"
              label="Board Name"
              name="boardName"
              value={boardName}
              onChange={(event) => setBoardName(event.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="boarKey"
              id="boarKey"
              label="Board Key"
              type="password"
              autoComplete="current-password"
              value={boardKey}
              onChange={(event) => setBoardKey(event.target.value)}
            />
            {isCreateBoard ? (
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="confirmBoardKey"
                label="Confirm Board Key"
                type="password"
                name="confirmBoardKey"
                autoComplete="current-password"
                value={confirmBoardKey}
                onChange={(event) => setConfirmBoardKey(event.target.value)}
              />
            ) : null}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isCreateBoard ? 'Create' : 'Sign In'}
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => setIsCreateBoard(!isCreateBoard)}
                >
                  {isCreateBoard
                    ? 'Already have a board? Sign In'
                    : "Don't have a board? Create one"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
