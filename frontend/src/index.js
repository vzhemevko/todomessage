import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import App from './components/App/App';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fff748',
      contrastText: '#3c1a5b',
    },
    secondary: {
      main: '#3c1a5b',
      contrastText: '#fff748',
    },
    action: {
      main: '#e57373',
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
