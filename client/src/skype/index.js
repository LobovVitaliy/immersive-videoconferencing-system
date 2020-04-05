import WebSocketManager from './utils/web-socket-manager';
import RTCPeerConnectionManager from './utils/rtc-peer-connection-manager';
import StreamManager from './utils/stream-manager';

class Skype {
  constructor(url, listener) {
    this.ws = new WebSocketManager(url, this.handle.bind(this));
    this.pc = new RTCPeerConnectionManager();

    this.localStreamManager = new StreamManager();
    this.remoteStreamManager = new StreamManager();

    this.state = {};

    this.notify = listener;

    this.pc.addEventListener('track', (event) => {
      this.remoteStreamManager.setStream(event.streams[0]);

      this.notify({
        type: SKYPE_EVENTS.SET_REMOTE_STREAM,
        data: {
          stream: event.streams[0],
        },
      });
    });
  }

  // public

  async call(cameraId) {
    await this.connect('offer-request', cameraId);
  }

  async reply(cameraId) {
    await this.accept(this.state.request.data);
    await this.connect('offer-response', cameraId);
  }

  async changeCamera(cameraId) {
    if (!!this.localStreamManager.getStream()) {
      this.localStreamManager.stopStream();
      await this.startStream(cameraId);
    }
  }

  stop() {
    this.notify({
      type: SKYPE_EVENTS.STOPPED,
      data: {},
    });

    this.localStreamManager.stopStream();
    this.remoteStreamManager.stopStream();

    this.ws.send({ type: 'stop' });
  }

  close() {
    try {
      this.ws.close();
      this.pc.close();
    } catch (e) {
      console.error(e);
    }
  }

  // private

  async handle({ type, data }) {
    switch (type) {
      case 'offer-request':
        this.state.request = { data };

        this.notify({
          type: SKYPE_EVENTS.CALLING,
          data: {},
        });

        break;

      case 'offer-response':
        await this.accept(data);
        break;

      case 'answer':
        await this.pc.setRemoteDescriptionFromData(data);
        break;

      case 'stop':
        this.notify({
          type: SKYPE_EVENTS.STOPPED,
          data: {},
        });

        this.localStreamManager.stopStream();
        this.remoteStreamManager.stopStream();

        break;

      default:
        console.error('Raw data type:', type);
    }
  }

  async connect(type, cameraId) {
    try {
      await this.startStream(cameraId);

      await this.pc.createOfferAndSetLocalDescription();

      this.ws.send({
        type,
        data: this.pc.getLocalDescription(),
      });
    } catch (e) {
      console.error(e);
    }
  }

  async startStream(cameraId) {
    const constraints = cameraId ? {
      video: {
        deviceId: {
          exact: cameraId,
        },
      },
      audio: true,
    } : {
      video: true,
      audio: true,
    };

    await this.localStreamManager.initStream(constraints);

    this.notify({
      type: SKYPE_EVENTS.SET_LOCAL_STREAM,
      data: {
        stream: this.localStreamManager.getStream(),
      },
    });

    this.localStreamManager.sendStream(this.pc.addTrack.bind(this.pc));
  }

  async accept(data) {
    try {
      await this.pc.setRemoteDescriptionFromData(data);
      await this.pc.createAnswerAndSetLocalDescription();

      this.ws.send({
        type: 'answer',
        data: this.pc.getLocalDescription(),
      });
    } catch (e) {
      console.error(e);
    }
  }
}

export const SKYPE_EVENTS = {
  CALLING: 'CALLING',
  SET_REMOTE_STREAM: 'SET_REMOTE_STREAM',
  SET_LOCAL_STREAM: 'SET_LOCAL_STREAM',
  STOPPED: 'STOPPED',
};

export default function create(url, listener) {
  const skype = new Skype(`ws://${url}`, listener);

  return {
    call: skype.call.bind(skype),
    reply: skype.reply.bind(skype),
    changeCamera: skype.changeCamera.bind(skype),
    stop: skype.stop.bind(skype),
    close: skype.close.bind(skype),
  };
}