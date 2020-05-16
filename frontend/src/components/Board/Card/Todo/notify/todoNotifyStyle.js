import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: 110,
  },
  selectEmpty: {
    //marginTop: theme.spacing(1),
  },
}));

const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#3c1a5b',
      contrastText: '#fff748',
    },
  },
});

export { useStyles, customTheme };
