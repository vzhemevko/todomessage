import React from 'react';
import PropTypes from 'prop-types';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { useApp } from 'hooks/useApp';

export default function TodoMsgAlert({ elevation }) {
  const { message, type, open, closeAlert } = useApp();

  return (
    <Snackbar
      open={open}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <MuiAlert
        elevation={elevation}
        onClose={closeAlert}
        severity={type}
        variant="filled"
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
