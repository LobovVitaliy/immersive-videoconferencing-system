import React, { memo, useEffect, useRef } from 'react';
import cn from 'classnames';
import styles from './index.scss';

import draw, { ranges } from './drawing';

function useVideo() {
  const videoRef = useRef(document.createElement('video'));

  function startVideo(stream) {
    videoRef.current.srcObject = stream;
    stream && videoRef.current.play();
  }

  return {
    video: videoRef.current,
    startVideo,
  };
}

function Video({ className, style, stream, chroma }) {
  const { video, startVideo } = useVideo();

  const canvasRef = useRef(null);

  const width = window.innerWidth;
  const height = window.innerHeight;

  useEffect(() => {
    canvasRef.current.width = width;
    canvasRef.current.height = height;
  }, []);

  useEffect(() => startVideo(stream), [stream]);

  useEffect(() => {
    const context = canvasRef.current.getContext('2d');

    if (stream) {
      const timer = setInterval(draw, 1000 / 24, {
        context, video, width, height, ranges: ranges(chroma),
      });

      return () => clearTimeout(timer);
    } else {
      context.clearRect(0, 0, width, height);
    }
  }, [stream, chroma]);

  return (
    <canvas
      className={cn(styles.video, className)}
      style={style}
      ref={canvasRef}
    />
  );
}

Video.defaultProps = {
  stream: null,
  chroma: {
    color: '#000000',
    delta: 0,
  },
};

export default memo(Video);