import React, { memo, useContext } from 'react';
import styles from './index.scss';

import AppContext from '$src/AppContext';

import Video from '$src/components/Video';
import PrismVideo from './PrismVideo';

function Background({ stream, mode }) {
  const { options } = useContext(AppContext);

  const chroma = {
    color: options.color,
    delta: options.delta,
  };

  return (mode === '2d') ? (
    <Video
      className={styles.video}
      stream={stream}
      chroma={chroma}
    />
  ) : (
    <PrismVideo
      className={styles.video}
      stream={stream}
      chroma={chroma}
      size={options.scale}
    />
  );
}

Background.defaultProps = {
  stream: null,
  mode: '2d',
};

export default memo(Background);