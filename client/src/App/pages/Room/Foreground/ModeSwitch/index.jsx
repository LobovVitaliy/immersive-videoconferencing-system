import React, { memo } from 'react';
import cn from 'classnames';
import styles from './index.scss';

function ModeSwitch({ className, mode, setMode }) {

  function handleClick() {
    switch (mode) {
      case '2d': return setMode('3d');
      case '3d': return setMode('2d');
    }
  }

  return (
    <div
      className={cn(styles.switch, className)}
      onClick={handleClick}
    >
      <div className={cn({ [styles.active]: mode === '2d' })}>
        2D
      </div>
      <div className={styles.delimiter}>
        /
      </div>
      <div className={cn({ [styles.active]: mode === '3d' })}>
        3D
      </div>
    </div>
  );
}

ModeSwitch.defaultProps = {
  mode: '2d',
  setMode: () => {},
};

export default memo(ModeSwitch);