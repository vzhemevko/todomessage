import React from 'react';

import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/core/styles';

import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import { format } from 'date-fns';

import {
  useStyles,
  customTheme,
} from 'components/Board/Card/Todo/Notify/todoNotifyStyle';

// TODO add props type
export default function TodoMsgTodoNotify({
  todoState,
  day,
  dueTimeFixed,
  handleTodoDueTimeChange,
}) {
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center">
      <Box m={1}>
        <Typography variant="subtitle2">Notify</Typography>
      </Box>
      <Box m={1} display="flex" alignItems="center">
        <FormControl className={classes.formControl}>
          <Select
            value={dueTimeFixed}
            onChange={(e) => handleTodoDueTimeChange(e.target.value)}
            displayEmpty
            className={classes.selectEmpty}
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value={dueTimeFixed}>at</MenuItem>
            <MenuItem value={'06:00:00'}>Morning</MenuItem>
            <MenuItem value={'12:00:00'}>Noon</MenuItem>
            <MenuItem value={'18:00:00'}>Evening</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box m={1}>
        <ThemeProvider theme={customTheme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              ampm={false}
              value={`${day}T${todoState.dueTime}`}
              onChange={(time) =>
                handleTodoDueTimeChange(format(time, 'hh:mm:ss'))
              }
              className={classes.formControl}
            />
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </Box>
    </Box>
  );
}
