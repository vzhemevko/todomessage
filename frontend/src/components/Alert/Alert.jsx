import React from 'react';
import PropTypes from 'prop-types';

import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import MuiAlert from '@material-ui/lab/Alert';

import { useApp } from 'hooks/useApp';

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

export default function TodoMsgAlert({ elevation }) {
  const { message, type, open, closeAlert } = useApp();

  return (
    <Snackbar
      autoHideDuration={6000}
      open={open}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      TransitionComponent={TransitionUp}
      onClose={closeAlert}
    >
      <MuiAlert
        elevation={elevation}
        severity={type}
        variant="filled"
        onClose={closeAlert}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
}

TodoMsgAlert.propTypes = {
  elevation: PropTypes.number,
};

TodoMsgAlert.defaultProps = {
  elevation: 6,
};
