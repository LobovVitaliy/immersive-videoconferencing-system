import React, { memo } from 'react';
import cn from 'classnames';
import styles from './index.scss';

function IconButton({ className, active, onClick, ...props }) {
  return (
    <div
      className={cn(styles.button, className)}
      disabled={!active}
      onClick={active ? onClick : null}
      {...props}
    />
  );
}

export default memo(IconButton);