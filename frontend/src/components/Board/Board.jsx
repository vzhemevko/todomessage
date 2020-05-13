import React, { useEffect } from 'react';

import { Box, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Card from 'components/Board/Card/Card';

import { useApi } from 'hooks/useApi';
import { useApp } from 'hooks/useApp';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
}));

export default function TodoMsgBoard() {
  const classes = useStyles();
  const { loadCards } = useApi();
  const { cards } = useApp();

  useEffect(() => {
    loadCards();
  }, []);

  //useEffect(() => {}, [cards]);

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
