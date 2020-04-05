import React, { memo, useContext, useState } from 'react';
import styles from './index.scss';

import AppContext from '$src/AppContext';

import useToggle from '$src/hooks/use-toggle';

import STEP from '$src/skype/step';

import CameraSelect from './CameraSelect';
import ModeSwitch from './ModeSwitch';
import Range from '$src/components/Range';
import IconButton from './IconButton';
import Settings from './Settings';

import Icon1Svg from '$assets/icons/icon1.svg';
import Icon2Svg from '$assets/icons/icon2.svg';

function Foreground({ skype, step, mode, setMode }) {

  const { options, setOptions } = useContext(AppContext);

  function handleColorChange(color) {
    setOptions({ ...options, color });
  }

  function handleDeltaChange(delta) {
    setOptions({ ...options, delta });
  }

  function handleScaleChange(scale) {
    setOptions({ ...options, scale });
  }

  const [camera, setCamera] = useState(null);

  function changeCamera(option) {
    if (camera) {
      skype.changeCamera(option.value);
    }

    setCamera(option);
  }

  const [isSettings, toggleSettings] = useToggle(false);

  return (
    <>
      <div className={styles.header}>
        <CameraSelect
          camera={camera}
          setCamera={changeCamera}
        />
        <div className={styles.settings}>
          <Settings
            visible={isSettings}
            onClick={toggleSettings}
            color={options.color}
            onColorChange={handleColorChange}
            delta={options.delta}
            onDeltaChange={handleDeltaChange}
          />
          <ModeSwitch
            className={styles.switch}
            mode={mode}
            setMode={setMode}
          />
        </div>
      </div>
      {isSettings && (mode === '3d') && (
        <Range
          className={styles.range}
          max={300}
          value={options.scale}
          onChange={handleScaleChange}
        />
      )}
      <div className={styles.footer}>
        <IconButton
          className={styles.button1}
          active={step === STEP.INITIAL}
          onClick={() => skype.call(camera.value)}
        >
          <Icon1Svg
            className={styles.icon1}
          />
        </IconButton>
        <IconButton
          className={styles.button2}
          active={step === STEP.CALLING}
          onClick={() => skype.reply(camera.value)}
        >
          <Icon2Svg
            className={styles.icon2}
          />
        </IconButton>
        <IconButton
          className={styles.button3}
          active={step === STEP.CALLING || step === STEP.TALKING}
          onClick={() => skype.stop()}
        >
          <Icon1Svg
            className={styles.icon3}
          />
        </IconButton>
      </div>
    </>
  );
}

Foreground.defaultProps = {
  skype: {
    call: () => {},
    reply: () => {},
    stop: () => {},
    changeCamera: () => {},
  },
  step: STEP.INITIAL,
  mode: '2d',
  setMode: () => {},
};

export default memo(Foreground);