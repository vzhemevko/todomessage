import React from 'react';

import {
  IconButton,
  Grid,
  Box,
  Typography,
  TextField,
  Paper,
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { listTimeZones } from 'timezone-support';

import { useApp } from 'hooks/useApp';
import useStyles from 'components/Settings/settingsStyle';

export default function TodoMsgSettings() {
  const classes = useStyles();
  const { board, updateBoard, themes, appTheme, setAppTheme } = useApp();
  const [boardName, setBoardName] = React.useState(board.name);
  const [timeZone, setTimeZone] = React.useState(board.timeZone);
  const [theme, setTheme] = React.useState(appTheme);
  const [updateNeeded, setUpdateNeeded] = React.useState(false);

  const TimeZoneSelect = () => {
    return (
      <Autocomplete
        disableClearable
        options={listTimeZones()}
        value={timeZone}
        onChange={(event, newValue) => {
          setTimeZone(newValue);
          setUpdateNeeded(true);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Time Zone"
            variant="outlined"
            fullWidth
          />
        )}
      />
    );
  };

  const ThemeSelect = () => {
    return (
      <Autocomplete
        disableClearable
        value={theme}
        options={themes}
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) => {
          setTheme(newValue);
          setUpdateNeeded(true);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Theme" variant="outlined" fullWidth />
        )}
      />
    );
  };

  const handleUpdateBoard = () => {
    setAppTheme(theme);
    const boardToUpdate = {
      ...board,
      name: boardName,
      timeZone: timeZone,
      theme: theme.index,
    };
    updateBoard(
      boardToUpdate,
      'Settings have been updated',
      'Failed to update the settings'
    );
  };

  return (
    <Paper className={classes.settingsPaper} elevation={3}>
      <Grid container spacing={3} direction="column">
        <Grid item>
          <Box className={classes.settingsHeader}>
            <Typography variant="subtitle1">Settings</Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box display="flex" justifyContent="center">
            <Box className={classes.settingsItem}>
              <TextField
                label="Board Name"
                variant="outlined"
                fullWidth
                value={boardName}
                onChange={(e) => {
                  setBoardName(e.target.value);
                  setUpdateNeeded(true);
                }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item>
          <Box display="flex" justifyContent="center">
            <Box className={classes.settingsItem}>
              <TimeZoneSelect />
            </Box>
          </Box>
        </Grid>
        <Grid item>
          <Box display="flex" justifyContent="center">
            <Box className={classes.settingsItem}>
              <ThemeSelect />
            </Box>
          </Box>
        </Grid>
        <Grid item>
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={handleUpdateBoard}>
              <SaveIcon className={updateNeeded ? classes.iconAction : null} />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
