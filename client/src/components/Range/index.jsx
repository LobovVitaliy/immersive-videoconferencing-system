import React, { memo } from 'react';
import './index.css';

import Slider from 'rc-slider';

function Range(props) {
  return (
    <Slider {...props} vertical />
  );
}

export default memo(Range);