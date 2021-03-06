import React from 'react';

import { Box, Typography, Paper, Grid } from '@material-ui/core';
import Card from 'components/Board/Card/Card';
import ChipInput from 'material-ui-chip-input';

import { useApp } from 'hooks/useApp';
import useStyles from 'components/Board/boardStyle';

const validateEmail = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export default function TodoMsgBoard() {
  const classes = useStyles();
  const { cards, board, updateBoard } = useApp();
  const [emailsValid, setEmailsValid] = React.useState(false);
  const [emails, setEmails] = React.useState([]);

  React.useEffect(() => {
    if (!board.emails) return;
    setEmails(board.emails);
  }, [board]);

  React.useEffect(() => {
    let notValidEmails = emails.filter((e) => {
      return !validateEmail(e);
    });
    setEmailsValid(notValidEmails.length === 0);
  }, [emails]);

  const handleEmailAdd = (email) => {
    const emailsToUpdate = [...emails, email];
    const boardToUpdate = { ...board, emails: emailsToUpdate };
    setEmails(emailsToUpdate);
    updateBoard(boardToUpdate);
  };

  const handleEmailDelete = (email, index) => {
    let emailsToUpdate = [...emails];
    emailsToUpdate.splice(index, 1);
    const boardToUpdate = { ...board, emails: emailsToUpdate };
    setEmails(emailsToUpdate);
    updateBoard(boardToUpdate);
  };

  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} sm={12}>
          <Paper className={classes.emailPaper} elevation={3}>
            <Box className={classes.emailHeader}>
              <Typography variant="subtitle1">
                Todo notification messages will be sent to the below email
                addresses
              </Typography>
            </Box>
            <Box className={classes.emailSubHeader}>
              {!emailsValid ? (
                <Typography
                  variant="caption"
                  className={classes.emailsNotValid}
                >
                  Please note some of the addresses is not a valid email
                  address, correct them to receive the messages
                </Typography>
              ) : null}
              {emails.length < 1 ? (
                <Typography variant="caption" color="textSecondary">
                  You don't have any email addresses, add them to receive the
                  messages
                </Typography>
              ) : null}
            </Box>
            <Box className={classes.emailInput}>
              <ChipInput
                value={emails}
                onAdd={handleEmailAdd}
                onDelete={(email, index) => handleEmailDelete(email, index)}
                fullWidth
                variant={'outlined'}
                color={'secondary'}
                classes={{
                  chip: classes.emailChip,
                  input: classes.emailChipInput,
                }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {cards.map((c, index) => (
        <Card card={c} key={index} />
      ))}
    </div>
  );
}
