import React, { memo, useContext } from 'react';
import styles from './index.scss';

import AppContext from '$src/AppContext';

function ConnectForm({ handleStart }) {
  const { address, setAddress } = useContext(AppContext);

  function handleAddressChange(e) {
    setAddress(e.target.value);
  }

  return (
    <div className={styles.form}>
      <div className={styles.title}>
        Let’s start
      </div>
      <input
        className={styles.input}
        value={address}
        onChange={handleAddressChange}
        placeholder='Enter the server address'
      />
      <button
        className={styles.button}
        onClick={handleStart}
      >
        Start
      </button>
    </div>
  );
}

ConnectForm.defaultProps = {
  handleStart: () => {},
};

export default memo(ConnectForm);