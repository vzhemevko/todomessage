import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import Navbar from 'components/Navbar/Navbar';
import Loader from 'components/Loader/Loader';
import Alert from 'components/Alert/Alert';

import { LoaderProvider } from 'contexts/LoaderCx';
import { AlertProvider } from 'contexts/AlertCx';

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
