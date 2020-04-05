import getSizeAndOffset from './calc-size';

function draw({ context, video, width, height, ranges }) {
  if (!video.videoWidth || !video.videoHeight) return;

  const size = getSizeAndOffset(video.videoWidth, video.videoHeight, width, height);

  context.drawImage(video, size.dx, size.dy, size.width, size.height);

  const frame = context.getImageData(0, 0, width, height);

  for (let i = 0; i < frame.data.length / 4; i++) {
    const r = frame.data[i * 4 + 0];
    const g = frame.data[i * 4 + 1];
    const b = frame.data[i * 4 + 2];

    if (
      r > ranges.r[0] && r < ranges.r[1] &&
      g > ranges.g[0] && g < ranges.g[1] &&
      b > ranges.b[0] && b < ranges.b[1]
    ) {
      frame.data[i * 4 + 3] = 0;
    }
  }

  context.putImageData(frame, 0, 0);
}

export { default as ranges } from './ranges';

export default draw;