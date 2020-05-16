import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import App from 'components/App/App';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffeb3b',
      contrastText: '#6a1b9a',
    },
    secondary: {
      main: '#6a1b9a',
      light: '#975FB8',
      contrastText: '#ffeb3b',
    },
    action: {
      main: '#EF5350',
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
