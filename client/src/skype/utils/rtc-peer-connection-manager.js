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