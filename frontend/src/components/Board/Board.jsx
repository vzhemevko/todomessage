import React from 'react';

import { Box, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useApi } from 'hooks/useApi';

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
  const { getAllCards } = useApi();

  const defaultDays = [
    {
      name: 'Wednesday',
      date: 'May 6',
      todos: [
        {
          name: 'Buy Milk',
          time: 'Morning',
        },
        { name: 'Call Mom', time: 'Morning' },
        { name: 'Buy Eggs', time: 'Morning' },
      ],
    },
    { name: 'Thursday', date: 'May 7', todos: [] },
    { name: 'Friday', date: 'May 8', todos: [] },
    { name: 'Saturday', date: 'May 9', todos: [] },
    { name: 'Sunday', date: 'May 10', todos: [] },
    { name: 'Monday', date: 'May 11', todos: [] },
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
        <IconButton onClick={getAllCards}>
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
