import React from 'react';

import { AppStateContext } from 'contexts/AppContext';
import themes from 'themes';

const useTheme = () => {
  const { defaultAppTheme, appTheme, setAppTheme } = React.useContext(
    AppStateContext
  );

  return { themes, defaultAppTheme, appTheme, setAppTheme };
};

export { useTheme };
