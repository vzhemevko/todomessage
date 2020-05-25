import React from 'react';

import {
  Typography,
  MenuItem,
  FormControl,
  Select,
  Grid,
} from '@material-ui/core';

import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import { format } from 'date-fns';

import { useStyles } from 'components/Board/Card/Todo/Notify/todoNotifyStyle';

export default function TodoMsgTodoNotify({
  todoState,
  day,
  dueTimeFixed,
  handleTodoDueTimeChange,
}) {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      className={classes.todoNotifyGrid}
    >
      <Grid item xs={10} sm={2} md={2} lg={2} xl={2}>
        <Typography variant="subtitle1" align="left">
          Notify
        </Typography>
      </Grid>
      <Grid item xs={10} sm={4} md={4} lg={4} xl={8}>
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
      </Grid>
      <Grid item xs={10} sm={4} md={4} lg={4} xl={4}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardTimePicker
            ampm={false}
            value={`${day}T${todoState.dueTime}`}
            onChange={(time) => {
              handleTodoDueTimeChange(format(time, 'HH:mm:ss'));
            }}
            className={classes.formControl}
          />
        </MuiPickersUtilsProvider>
      </Grid>
    </Grid>
  );
}
