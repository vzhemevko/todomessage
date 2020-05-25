import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  doneTodo: {
    textDecoration: 'line-through',
  },
  todoBox: {
    padding: 12,
  },
}));

export default useStyles;
