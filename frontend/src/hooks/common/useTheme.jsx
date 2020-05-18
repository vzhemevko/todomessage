import React from 'react';

import { AppStateContext } from 'contexts/AppContext';
import themes from 'themes';

const useTheme = () => {
  const { appTheme, setAppTheme } = React.useContext(AppStateContext);

  return { themes, appTheme, setAppTheme };
};

export { useTheme };
