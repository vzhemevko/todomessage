import React from 'react';

import Box from '@material-ui/core/Box';

import classes from 'components/Loader/loaderStyle.module.css';
import { useLoader } from 'hooks/common/useLoader';

export default function TodoMsgLoader() {
  const { isLoading } = useLoader();

  return (
    <Box className={classes.container} zIndex={Number.MAX_SAFE_INTEGER}>
      {isLoading && (
        <div className={classes.spinner}>
          <div className={classes.bounce1} />
          <div className={classes.bounce2} />
          <div className={classes.bounce3} />
        </div>
      )}
    </Box>
  );
}
