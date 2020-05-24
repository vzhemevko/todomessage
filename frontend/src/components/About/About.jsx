import React from 'react';

import { Grid, Box, Typography, Paper } from '@material-ui/core';

import useStyles from 'components/About/aboutStyle';

export default function TodoMsgAbout() {
  const classes = useStyles();

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={10} sm={10}>
        <Paper className={classes.aboutPaper} elevation={3}>
          <Grid container spacing={3} direction="column">
            <Grid item>
              <Box className={classes.aboutHeader}>
                <Typography variant="subtitle1">About</Typography>
              </Box>
            </Grid>
            <Grid item className={classes.aboutSection}>
              <Typography variant="subtitle2">What is Todomessage?</Typography>
              <br />
              <Typography variant="body2">
                Todomessage is an example application of using the Spring Boot
                framework, React.js (Hooks) library and Material UI React
                framework.
              </Typography>
              <br />
              <Typography variant="body2">
                Learn more at &nbsp;
                <a href=" https://github.com/vzhemevko/todomessage">
                  Todomessage GitHub
                </a>
              </Typography>
              <br />
              <Typography variant="subtitle2">Idea</Typography>
              <br />
              <Typography variant="body2">
                Receive group email notifications about your to-do things. You
                and your friends are working on some project after some
                discussion you agreed on some list of things you need to do.
                Create a board add your emails to the board list and create some
                to-dos to be reminded about them. Todomeasge has three basic
                concepts Board, Card and Todo. The board is basically is a user
                account. You need to have a board to sign in. When you sign in
                you see the cards that are basically a representation of a
                particular day. The card has a list of todos. Each todo has its
                name and due time. When the due time of the todo approached an
                email will be sent to all the emails which are assigned to the
                board.
              </Typography>
              <br />
              <Typography variant="subtitle2">Limitations</Typography>
              <br />
              <Typography variant="body2">
                This is a demo project so a few limitations were applied.
                <ul>
                  <li>The board can have 8 cards at a time.</li>
                  <li>The card can have 10 todos at a time.</li>
                  <li>
                    There is a cleaning service that deletes boards unused for
                    30 days and any card older than 1 day.
                  </li>
                  <li>
                    New cards are generated automatically to maintain 8 cards at
                    a time - yesterday and 7 cards in the future.
                  </li>
                </ul>
                <Typography variant="body2">
                  The project is deployed on Heroku as part of the free plan.
                  This means you can create a board there and other data however
                  the application will go in a sleep mode after 30 minutes of
                  inactivity, thus it can not be used for actual notification
                  messages.
                  <p />
                  You can deploy the application on some other hosting platforms
                  set up the SMTP server details and receive the email
                  notifications.
                </Typography>
              </Typography>
              <br />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
