class RTCPeerConnectionManager {
  constructor(configuration) {
    this.pc = new RTCPeerConnection(configuration);
  }

  addEventListener(type, listener) {
    this.pc.addEventListener(type, listener);
  }

  getLocalDescription() {
    return this.pc.localDescription;
  }

  addTrack(track, stream) {
    this.pc.addTrack(track, stream);
  }

  replaceTrack(track) {
    const sender = this.pc.getSenders().find((s) => {
      return s.track.kind === track.kind;
    });

    sender.replaceTrack(track);
  }

  removeTracks() {
    this.pc.getSenders().forEach((s) => this.pc.removeTrack(s));
  }

  async createOfferAndSetLocalDescription() {
    const offer = await this.pc.createOffer();
    await this.pc.setLocalDescription(offer);
  }

  async createAnswerAndSetLocalDescription() {
    const answer = await this.pc.createAnswer();
    await this.pc.setLocalDescription(answer);
  }

  async setRemoteDescriptionFromData(data) {
    const sd = new RTCSessionDescription(data);
    await this.pc.setRemoteDescription(sd);
  }

  close() {
    this.pc.close();
  }
}

export default RTCPeerConnectionManager;