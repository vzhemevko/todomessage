import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    maxWidth: 750,
    minWidth: 250,
    margin: `${theme.spacing(2)}px auto`,
    padding: theme.spacing(2),
    cursor: 'pointer',
    background: theme.palette.primary.main,
  },
  todo: {
    width: '100%',
    marginLeft: 15,
  },
  cardTitle: {
    color: theme.palette.secondary.main,
    paddingBottom: theme.spacing(2),
  },
  addBtn: {
    margin: 10,
  },
}));

export default useStyles;
