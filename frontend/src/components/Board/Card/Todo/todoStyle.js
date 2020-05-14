import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paperTodo: {
    width: '100%',
    margin: `${theme.spacing(0.1)}px auto`,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    padding: theme.spacing(0.5),
    cursor: 'pointer',
  },
  iconAction: {
    color: theme.palette.action.main,
  },
}));

export default useStyles;
