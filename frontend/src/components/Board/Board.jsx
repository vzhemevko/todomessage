import React from 'react';

import { Box, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import Card from 'components/Board/Card/Card';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
}));

export default function TodoMsgBoard() {
  const classes = useStyles();

  const defaultDays = [
    { name: 'Wed', date: 'May 6' },
    { name: 'Thu', date: 'May 7' },
    { name: 'Fri', date: 'May 8' },
    { name: 'Sat', date: 'May 9' },
    { name: 'Sun', date: 'May 10' },
    { name: 'Mon', date: 'May 11' },
  ];

  const [days, setDays] = React.useState(defaultDays);

  const loadDaysDown = () => {
    setDays([...days, { name: 'Mon', date: 'Same' }]);
  };

  const loadDaysUp = () => {
    setDays([{ name: 'Mon', date: 'Same' }, ...days]);
  };

  return (
    <div className={classes.root}>
      <Box justifyContent="center" display="flex">
        <IconButton onClick={loadDaysUp}>
          <KeyboardArrowUpIcon style={{ fontSize: '50px' }} />
        </IconButton>
      </Box>
      {days.map((d, index) => (
        <Card day={d} key={index} />
      ))}
      <Box justifyContent="center" display="flex">
        <IconButton onClick={loadDaysDown}>
          <KeyboardArrowDownIcon style={{ fontSize: '50px' }} />
        </IconButton>
      </Box>
    </div>
  );
}
