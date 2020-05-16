import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    maxWidth: 750,
    minWidth: 250,
    margin: `${theme.spacing(2)}px auto`,
    padding: theme.spacing(2),
  },
  todo: {
    width: '100%',
    marginLeft: 15,
  },
  cardHeader: {
    background: theme.palette.secondary.main,
    borderRadius: 5,
    //color: theme.palette.primary.main,
    paddingBottom: theme.spacing(1),
  },
  cardHeaderTitle: {
    //color: theme.palette.secondary.light,
  },
  cardContent: {
    //background: theme.palette.primary.main,
    borderRadius: 5,
  },
  cardActions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    //background: theme.palette.secondary.main,
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
