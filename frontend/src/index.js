import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import App from 'components/App/App';
import { theme1, theme2, theme3, theme4, theme5 } from './themes';
//let appTheme = theme1;
let appTheme = theme2;
//let appTheme = theme3;
//let appTheme = theme4;

ReactDOM.render(
  <ThemeProvider theme={appTheme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
