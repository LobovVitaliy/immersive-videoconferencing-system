class StreamManager {
  constructor() {
    this.stream = null;
  }

  setStream(stream) {
    this.stream = stream;
  }

  getStream() {
    return this.stream;
  }

  async initStream(constraints) {
    this.stream = await navigator.mediaDevices.getUserMedia(constraints);
  }

  sendStream(callback) {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => callback(track, this.stream));
    }
  }

  stopStream() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
  }
}

export default StreamManager;