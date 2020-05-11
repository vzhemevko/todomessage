import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import Navbar from 'components/Navbar/Navbar';
import Loader from 'components/Loader/Loader';
import Alert from 'components/Alert/Alert';

import { LoaderProvider } from 'contexts/LoaderCtx';
import { AlertProvider } from 'contexts/AlertCtx';

export default function TodoMsgApp() {
  return (
    <div>
      <CssBaseline />
      <LoaderProvider>
        <AlertProvider>
          <Navbar />
          <Loader />
          <Alert />
        </AlertProvider>
      </LoaderProvider>
    </div>
  );
}
