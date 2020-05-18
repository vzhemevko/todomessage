import { createMuiTheme } from '@material-ui/core/styles';

export default [
  {
    index: 0,
    name: 'Big Stone & Sweet Corn',
    theme: createMuiTheme({
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
    }),
  },
  {
    index: 1,
    name: 'Port Gore & Putty',
    theme: createMuiTheme({
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
    }),
  },
  {
    index: 2,
    name: 'Bunker & Broom',
    theme: createMuiTheme({
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
    }),
  },
  {
    index: 3,
    name: 'Grape & Gorse',
    theme: createMuiTheme({
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
    }),
  },
];
