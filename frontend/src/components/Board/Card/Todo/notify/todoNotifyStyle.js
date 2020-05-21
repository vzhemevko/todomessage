import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: 110,
  },
  todoNotifyGrid: {
    paddingTop: 0,
    paddingBottom: 8,
    paddingLeft: 15,
    marginTop: 1,
    marginBottom: -30,
  },
}));

export { useStyles };
