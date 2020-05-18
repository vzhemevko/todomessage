import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import Navbar from 'components/Navbar/Navbar';
import Loader from 'components/Loader/Loader';
import Alert from 'components/Alert/Alert';
import Login from 'components/Login/Login';
import { useApp } from 'hooks/useApp';

export default function TodoMsgAppContent() {
  const { board, initBoard, isBoardInit, isBoardLoaded, appTheme } = useApp();

  React.useEffect(() => {
    initBoard();
  }, []);

  const TodoMsg = () => {
    return (
      <div>
        {isBoardInit ? (
          <div>{isBoardLoaded ? <Navbar /> : <Login />} </div>
        ) : null}
      </div>
    );
  };

  return (
    <div>
      <ThemeProvider theme={appTheme.theme}>
        <CssBaseline />
        <TodoMsg />
        <Loader />
        <Alert />
      </ThemeProvider>
    </div>
  );
}
