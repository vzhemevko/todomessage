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
  },
  emailHeader: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    color: theme.palette.primary.main,
    background: theme.palette.secondary.main,
    borderRadius: 5,
    padding: theme.spacing(2),
  },
  emailSubHeader: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    borderRadius: 5,
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  emailInput: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  emailsNotValid: {
    color: theme.palette.action.main,
  },
}));

export default useStyles;
