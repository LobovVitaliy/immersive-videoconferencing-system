function getSize(videoWidth, videoHeight, canvasWidth, canvasHeight) {
  const videoRatio = videoWidth / videoHeight;
  const canvasRatio = canvasWidth / canvasHeight;

  if (videoRatio > canvasRatio) {
    return {
      height: canvasHeight,
      width: canvasHeight * videoRatio,
    };
  } else {
    return {
      height: canvasWidth / videoRatio,
      width: canvasWidth,
    };
  }
}

function getSizeAndOffset(videoWidth, videoHeight, canvasWidth, canvasHeight) {
  const size = getSize(videoWidth, videoHeight, canvasWidth, canvasHeight);

  return {
    width: size.width,
    height: size.height,
    dx: (canvasWidth - size.width) * 0.5,
    dy: (canvasHeight - size.height) * 0.5,
  };
}

export default getSizeAndOffset;