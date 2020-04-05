import { useState } from 'react';

function useToggle(initial) {
  const [value, setValue] = useState(initial);

  function toggle() {
    setValue(!value);
  }

  return [value, toggle];
}

export default useToggle;