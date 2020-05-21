import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    maxWidth: 700,
    minWidth: 200,
    margin: `${theme.spacing(2)}px auto`,
    padding: theme.spacing(1),
  },
  todo: {
    width: '100%',
    marginLeft: 15,
  },
  cardHeader: {
    background: theme.palette.secondary.main,
    borderRadius: 5,
    paddingBottom: theme.spacing(1),
  },
  cardContent: {
    borderRadius: 5,
  },
  cardActions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderRadius: 5,
  },
  cardActionsIcon: {
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
}));

export default useStyles;
