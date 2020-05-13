import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Box } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import { format } from 'date-fns';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 110,
  },
  selectEmpty: {
    //marginTop: theme.spacing(1),
  },
}));

// TODO add props type
export default function TodoMsgTodoNotify({
  todoState,
  day,
  dueTimeFixed,
  handleTodoDueTimeChange,
}) {
  const classes = useStyles();

  const handleTimeChange = (time) => {};

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
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardTimePicker
            ampm={false}
            value={`${day}T${todoState.dueTime}`}
            format="hh:mm"
            onChange={(time) =>
              handleTodoDueTimeChange(format(time, 'hh:mm:ss'))
            }
          />
        </MuiPickersUtilsProvider>
      </Box>
    </Box>
  );
}
