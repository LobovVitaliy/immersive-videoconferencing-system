import React, { memo } from 'react';

function Range({ value, onChange }) {
  function handleChange(e) {
    onChange(+e.target.value);
  }

  return (
    <input
      type='range'
      min={0}
      max={255}
      value={value}
      onChange={handleChange}
    />
  );
}

Range.defaultProps = {
  value: 0,
  onChange: () => {},
};

export default memo(Range);