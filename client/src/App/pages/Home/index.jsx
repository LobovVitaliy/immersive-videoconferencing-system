import React, { memo } from 'react';
import styles from './index.scss';

import { Image16to9 } from '$src/components/Image';
import { Textfit } from 'react-textfit';

import ConnectForm from './ConnectForm';

import image from '$assets/images/main.png';

function HomePage({ handleStart }) {
  return (
    <>
      <Image16to9
        wrapperClassName={styles.header}
        src={image}
      >
        <div className={styles.content}>
          <Textfit
            className={styles.title}
            mode='multi'
            max={96}
          >
            Immersive videoconferencing system
          </Textfit>
        </div>
      </Image16to9>
      <div className={styles.main}>
        <ConnectForm
          handleStart={handleStart}
        />
      </div>
    </>
  );
}

HomePage.defaultProps = {
  handleStart: () => {},
};

export default memo(HomePage);