import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  settingsPaper: {
    minWidth: 250,
    maxWidth: 1000,
    margin: `${theme.spacing(2)}px auto`,
    padding: theme.spacing(2),
  },
  settingsHeader: {
    display: 'flex',
    justifyContent: 'start',
    color: theme.palette.caption.main,
    background: theme.palette.secondary.light,
    borderRadius: 5,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  settingsItem: {
    width: '100%',
    maxWidth: 500,
    minWidth: 250,
  },
  iconAction: {
    color: theme.palette.action.main,
  },
}));

export default useStyles;
