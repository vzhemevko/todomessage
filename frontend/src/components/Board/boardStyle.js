import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  emailPaper: {
    minWidth: 250,
    margin: `${theme.spacing(2)}px auto`,
    padding: theme.spacing(2),
    //background: theme.palette.primary.main,
  },
  emailInput: {
    width: '100%',
  },
  emailsNotValid: {
    color: theme.palette.action.main,
  },
}));

export default useStyles;
