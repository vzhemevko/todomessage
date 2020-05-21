import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paperTodo: {
    width: '100%',
    margin: `${theme.spacing(0.1)}px auto`,
    padding: theme.spacing(1),
  },
  iconAction: {
    color: theme.palette.action.main,
  },
  todoItem: {
    paddingTop: theme.spacing(0.5),
    wordBreak: 'break-all',
  },
  todoRead: {
    paddingTop: theme.spacing(0.5),
    cursor: 'pointer',
  },
}));

export default useStyles;
