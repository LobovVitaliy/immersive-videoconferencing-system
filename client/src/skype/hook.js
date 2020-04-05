import { useState, useEffect } from 'react';

import createSkype, { SKYPE_EVENTS } from './index';

import STEP from './step';

function useSkype(address) {
  const [skype, setSkype] = useState(undefined);
  const [stream, setStream] = useState(null);
  const [step, setStep] = useState(STEP.INITIAL);

  useEffect(() => {
    setSkype(createSkype(address, listener));

    function listener({ type, data }) {
      switch (type) {
        case SKYPE_EVENTS.SET_LOCAL_STREAM:
          setStep(STEP.TALKING);
          break;
        case SKYPE_EVENTS.SET_REMOTE_STREAM:
          setStep(STEP.TALKING);
          setStream(data.stream);
          break;
        case SKYPE_EVENTS.CALLING:
          setStep(STEP.CALLING);
          break;
        case SKYPE_EVENTS.STOPPED:
          setStep(STEP.INITIAL);
          setStream(null);
          break;
        default:
          break;
      }
    }
  }, []);

  return { skype, stream, step };
}

export default useSkype;