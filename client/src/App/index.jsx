import React, { useState } from 'react';

import { AppProvider } from '$src/AppContext';

import HomePage from './pages/Home';
import RoomPage from './pages/Room';

function App() {
  const [page, setPage] = useState('home');

  function setHome() {
    setPage('home');
  }

  function setRoom() {
    setPage('room');
  }

  return (
    <AppProvider>
      {(page === 'home') && (
        <HomePage
          handleStart={setRoom}
        />
      )}
      {(page === 'room') && (
        <RoomPage
          handleClose={setHome}
        />
      )}
    </AppProvider>
  );
}

export default App;