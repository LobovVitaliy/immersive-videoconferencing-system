import { useEffect } from 'react';

function usePreventWindowUnload() {
  useEffect(() => {
    function onbeforeunload(e) {
      e.preventDefault();
      e.returnValue = '';
    }

    window.addEventListener('beforeunload', onbeforeunload);

    return () => {
      window.removeEventListener('beforeunload', onbeforeunload);
    };
  }, []);
}

export default usePreventWindowUnload;