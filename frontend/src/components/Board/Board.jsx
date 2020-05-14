import React, { useEffect } from 'react';

import { Box, IconButton } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Card from 'components/Board/Card/Card';

import { useApp } from 'hooks/useApp';
import useStyles from './boardStyle';

export default function TodoMsgBoard() {
  const classes = useStyles();
  const { cards, loadCards } = useApp();

  useEffect(() => {
    loadCards();
  }, []);

  return (
    <div className={classes.root}>
      <Box justifyContent="center" display="flex">
        <IconButton>
          <KeyboardArrowUpIcon style={{ fontSize: '50px' }} />
        </IconButton>
      </Box>
      {cards.map((c, index) => (
        <Card card={c} key={index} />
      ))}
      <Box justifyContent="center" display="flex">
        <IconButton>
          <KeyboardArrowDownIcon style={{ fontSize: '50px' }} />
        </IconButton>
      </Box>
    </div>
  );
}
