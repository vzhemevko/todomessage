import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import AppContent from 'components/App/AppContent';

import { AppStateProvider } from 'contexts/AppContext';
import { LoaderProvider } from 'contexts/LoaderContext';
import { AlertProvider } from 'contexts/AlertContext';

export default function TodoMsgApp() {
  console.log('TodoMsgApp re-rending');
  return (
    <div>
      <CssBaseline />
      <AppStateProvider>
        <LoaderProvider>
          <AlertProvider>
            <AppContent />
          </AlertProvider>
        </LoaderProvider>
      </AppStateProvider>
    </div>
  );
}
