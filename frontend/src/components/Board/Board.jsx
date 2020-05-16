import React from 'react';

import { Box, IconButton, Typography } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Card from 'components/Board/Card/Card';
import ChipInput from 'material-ui-chip-input';
import Paper from '@material-ui/core/Paper';

import { useApp } from 'hooks/useApp';
import useStyles from 'components/Board/boardStyle';

const validateEmail = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export default function TodoMsgBoard() {
  const classes = useStyles();
  const [emails, setEmails] = React.useState(['foo', 'boo']);
  const [emailsValid, setEmailsValid] = React.useState(false);
  const { cards } = useApp();

  React.useEffect(() => {
    let notValidEmails = emails.filter((e) => {
      return !validateEmail(e);
    });
    setEmailsValid(notValidEmails.length === 0);
  }, [emails]);

  const handleEmailAdd = (email) => {
    setEmails([...emails, email]);
  };

  const handleEmailDelete = (email, index) => {
    let array = [...emails];
    array.splice(index, 1);
    setEmails(array);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.emailPaper} elevation={3}>
        <Box className={classes.emailHeader}>
          <Typography variant="subtitle1">
            Todo notification messages will be sent to the below email addresses
          </Typography>
        </Box>
        <Box className={classes.emailSubHeader}>
          {!emailsValid ? (
            <Typography variant="caption" className={classes.emailsNotValid}>
              &nbsp;please note some of the addresses is not a valid email
              address, correct them to receive the messages
            </Typography>
          ) : null}
        </Box>
        <Box className={classes.emailInput}>
          <ChipInput
            value={emails}
            //onChange={handleEmailChange}
            onAdd={handleEmailAdd}
            onDelete={(email, index) => handleEmailDelete(email, index)}
            fullWidth
            variant={'outlined'}
            color={'secondary'}
          />
        </Box>
      </Paper>
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
