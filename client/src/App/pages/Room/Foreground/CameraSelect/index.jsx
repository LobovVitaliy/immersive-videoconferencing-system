import React, { memo, useState, useEffect } from 'react';
import styles from './index.scss';

import Select from '$src/components/Select';

async function getCameras() {
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.filter((device) => device.kind === 'videoinput');
}

function CameraSelect({ camera, setCamera }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getCameras().then((devices) => {
      const newOptions = devices.map((device, i) => ({
        value: device.deviceId,
        label: `Camera ${i+1}`,
      }));

      setCamera(newOptions[0]);
      setOptions(newOptions);
    });
  }, []);

  return (
    <Select
      className={styles.select}
      value={camera}
      onChange={setCamera}
      options={options}
      placeholder='Choose a camera'
    />
  );
}

CameraSelect.defaultProps = {
  camera: null,
  setCamera: () => {},
};

export default memo(CameraSelect);