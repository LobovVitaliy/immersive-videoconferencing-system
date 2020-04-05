import React, { memo } from 'react';

function Color({ value, onChange }) {
  function handleChange(e) {
    onChange(e.target.value);
  }

  return (
    <input
      type='color'
      value={value}
      onChange={handleChange}
    />
  );
}

Color.defaultProps = {
  value: '#000000',
  onChange: () => {},
};

export default memo(Color);