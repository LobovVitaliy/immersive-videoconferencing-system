import React, { memo, useState, useContext, useEffect } from 'react';

import AppContext from '$src/AppContext';

import useSkype from '$src/skype/hook';

import usePreventWindowUnload from '$src/hooks/use-prevent-window-unload';

import Background from './Background';
import Foreground from './Foreground';

function RoomPage({ handleClose }) {
  const { address } = useContext(AppContext);

  const { skype, stream, step } = useSkype(address);

  const [mode, setMode] = useState('2d');

  useEffect(() => () => skype.close(), []);

  usePreventWindowUnload();

  return (
    <>
      <Background
        stream={stream}
        mode={mode}
      />
      <Foreground
        skype={skype}
        step={step}
        mode={mode}
        setMode={setMode}
      />
    </>
  );
}

RoomPage.defaultProps = {
  handleClose: () => {},
};

export default memo(RoomPage);