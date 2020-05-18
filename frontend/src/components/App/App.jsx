import React from 'react';

import { AppStateProvider } from 'contexts/AppContext';
import AppContent from 'components/App/AppContent';

export default function TodoMsgApp() {
  return (
    <div>
      <AppStateProvider>
        <AppContent />
      </AppStateProvider>
    </div>
  );
}
