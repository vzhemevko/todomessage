import React from 'react';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useLoader } from 'hooks/useLoader';

export default function TodoMsgLoader() {
  const { isLoading } = useLoader();
  return (
    <Box position="fixed" top="50%" left="50%" zIndex={Number.MAX_SAFE_INTEGER}>
      {isLoading && <CircularProgress />}
    </Box>
  );
}
