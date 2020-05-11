import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import Navbar from 'components/Navbar/Navbar';
import Loader from 'components/Loader/Loader';
import Alert from 'components/Alert/Alert';

import { AppProvider } from 'contexts/AppCtx';
import { LoaderProvider } from 'contexts/LoaderCtx';
import { AlertProvider } from 'contexts/AlertCtx';

export default function TodoMsgApp() {
  return (
    <div>
      <CssBaseline />
      <AppProvider>
        <LoaderProvider>
          <AlertProvider>
            <Navbar />
            <Loader />
            <Alert />
          </AlertProvider>
        </LoaderProvider>
      </AppProvider>
    </div>
  );
}
