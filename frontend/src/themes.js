import { createMuiTheme } from '@material-ui/core/styles';

const theme1 = createMuiTheme({
  palette: {
    primary: {
      main: '#173e43',
      contrastText: '#fae596',
    },
    secondary: {
      main: '#fae596',
      light: '#3fb0ac',
      contrastText: '#173e43',
    },
    action: {
      main: '#EF5350',
    },
    caption: {
      main: 'white',
    },
  },
});

const theme2 = createMuiTheme({
  palette: {
    primary: {
      main: '#22264b',
      contrastText: '#e8edf3',
    },
    secondary: {
      main: '#e6cf8b',
      light: '#e8edf3',
      contrastText: '#22264b',
    },
    action: {
      main: '#EF5350',
    },
    caption: {
      main: 'black',
    },
  },
});

const theme3 = createMuiTheme({
  palette: {
    primary: {
      main: '#101820',
      contrastText: '#FEE715',
    },
    secondary: {
      main: '#FEE715',
      light: '#585D63',
      contrastText: '#101820',
    },
    action: {
      main: '#EF5350',
    },
    caption: {
      main: 'white',
    },
  },
});

const theme4 = createMuiTheme({
  palette: {
    primary: {
      main: '#422057',
      contrastText: '#FCF951',
    },
    secondary: {
      main: '#FCF951',
      light: '#7B6389',
      contrastText: '#422057',
    },
    action: {
      main: '#EF5350',
    },
    caption: {
      main: 'white',
    },
  },
});

const theme5 = createMuiTheme({
  palette: {
    primary: {
      main: '#28334A',
      contrastText: '#FBDE44',
    },
    secondary: {
      main: '#FBDE44',
      light: '#697080',
      contrastText: '#FCE87C',
    },
    action: {
      main: '#EF5350',
    },
    caption: {
      main: 'white',
    },
  },
});

export { theme1, theme2, theme3, theme4, theme5 };
