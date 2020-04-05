import React, { memo } from 'react';
import cn from 'classnames';
import styles from './index.scss';

const Image = memo(({ className, src, ...props }) => (
  <div
    {...props}
    className={cn(styles.image, className)}
    style={{ backgroundImage: src ? `url(${src})` : null }}
  />
));

const Image16to9 = memo(({ wrapperClassName, className, children, ...props }) => (
  <div className={cn(styles.image16to9wrapper, wrapperClassName)}>
    <div className='media-adaptive-wrapper' />
    <Image className={cn(styles.image16to9, className)} {...props} />
    {children}
  </div>
));

export { Image16to9 };

export default Image;