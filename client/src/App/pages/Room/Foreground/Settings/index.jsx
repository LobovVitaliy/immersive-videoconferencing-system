import React, { memo } from 'react';
import styles from './index.scss';

import Color from './components/Color';
import Range from './components/Range';

import SettingsSvg from '$assets/icons/settings.svg';

function Settings({
  visible,
  onClick,
  color,
  onColorChange,
  delta,
  onDeltaChange,
}) {
  return (
    <div className={styles.settings}>
      {visible && (
        <>
          <Color
            value={color}
            onChange={onColorChange}
          />
          <Range
            value={delta}
            onChange={onDeltaChange}
          />
        </>
      )}
      <SettingsSvg
        className={styles.settingsSvg}
        onClick={onClick}
      />
    </div>
  );
}

Settings.defaultProps = {
  visible: false,
  onClick: () => {},
  color: '#000000',
  onColorChange: () => {},
  delta: 0,
  onDeltaChange: () => {},
};

export default memo(Settings);