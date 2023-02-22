import React from 'react';
import cn from 'classnames';

import Input from '../Input';
import logoSrc from '../logo.png';

import styles from './Overlay.module.scss';

const Overlay = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.overlay}>
        <div className={styles.overlay__inner}>
          <img src={logoSrc} alt="Orally" className={styles.logo} />

          <h1 className={styles.overlay__title}>
            Join the Orally waitlist and be the first to access our <span className={styles.textGradient}>decentralized data feeding</span> and automation platform!
          </h1>
          
          
          <div className={styles.overlay__btns}>
            <Input className={styles.input} />
            
            <button className={cn([styles.overlay__btn, styles.overlay__btnTransparent])}>
              Join Waitlist
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Overlay;