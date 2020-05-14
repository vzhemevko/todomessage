import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import Navbar from 'components/Navbar/Navbar';
import Loader from 'components/Loader/Loader';
import Alert from 'components/Alert/Alert';

import { AppStateProvider } from 'contexts/AppContext';
import { LoaderProvider } from 'contexts/LoaderContext';
import { AlertProvider } from 'contexts/AlertContext';

export default function TodoMsgApp() {
  return (
    <div>
      <CssBaseline />
      <AppStateProvider>
        <LoaderProvider>
          <AlertProvider>
            <Navbar />
            <Loader />
            <Alert />
          </AlertProvider>
        </LoaderProvider>
      </AppStateProvider>
    </div>
  );
}
