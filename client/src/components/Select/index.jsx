import React, { memo } from 'react';

import ReactSelect from 'react-select';

const styles = {
  control: (style) => ({
    ...style,
    borderRadius: 0,
  }),
  menu: (style) => ({
    ...style,
    borderRadius: 0,
    marginTop: 1,
    marginBottom: 0,
  }),
  menuList: (style) => ({
    ...style,
    padding: 0,
  }),
};

function Select(props) {
  return (
    <ReactSelect
      isSearchable={false}
      styles={styles}
      {...props}
    />
  );
}

export default memo(Select);