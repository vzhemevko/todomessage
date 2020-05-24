import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  aboutPaper: {
    maxWidth: 700,
    minWidth: 200,
    margin: `${theme.spacing(2)}px auto`,
    padding: theme.spacing(1),
  },
  aboutHeader: {
    display: 'flex',
    justifyContent: 'start',
    color: theme.palette.caption.main,
    background: theme.palette.secondary.light,
    borderRadius: 5,
    padding: theme.spacing(2),
  },
  aboutSection: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export default useStyles;
