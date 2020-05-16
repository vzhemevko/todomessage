import React from 'react';

import Navbar from 'components/Navbar/Navbar';
import Loader from 'components/Loader/Loader';
import Alert from 'components/Alert/Alert';
import Login from 'components/Login/Login';

import { useApp } from 'hooks/useApp';

export default function TodoMsgAppContent() {
  const { loadBoard, getBoardNameLocalStorage } = useApp();

  React.useEffect(() => {
    loadBoard();
  }, []);

  return (
    <div>
      <div>{getBoardNameLocalStorage() ? <Navbar /> : <Login />}</div>
      <Loader />
      <Alert />
    </div>
  );
}
