import React, { memo } from 'react';
import cn from 'classnames';
import styles from './index.scss';

import Video from '$src/components/Video';

function PrismVideo({ className, stream, chroma, size }) {
  const style = { height: size, width: size };

  return (
    <div className={cn(styles.prism, className)}>
      <div className={styles.block}>
        <Video
          className={styles.video1}
          style={style}
          stream={stream}
          chroma={chroma}
        />
      </div>
      <div className={styles.block}>
        <Video
          className={styles.video2}
          style={style}
          stream={stream}
          chroma={chroma}
        />
        <Video
          className={styles.video3}
          style={style}
          stream={stream}
          chroma={chroma}
        />
      </div>
      <div className={styles.block}>
        <Video
          className={styles.video4}
          style={style}
          stream={stream}
          chroma={chroma}
        />
      </div>
    </div>
  );
}

PrismVideo.defaultProps = {
  stream: null,
  chroma: {
    color: '#000000',
    delta: 0,
  },
  size: 0,
};

export default memo(PrismVideo);