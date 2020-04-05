import React, { useState } from 'react';

const AppContext = React.createContext();

function AppProvider({ children }) {
  const [address, setAddress] = useState('');

  const [options, setOptions] = useState({
    color: '#000000',
    delta: 0,
    scale: 200,
  });

  return (
    <AppContext.Provider value={{
      address, setAddress,
      options, setOptions,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export { AppProvider };

export default AppContext;