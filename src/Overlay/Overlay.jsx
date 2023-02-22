import React from 'react';
import cn from 'classnames';

import styles from './Overlay.module.scss';

const Overlay = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.overlay}>
        <div className={styles.overlay__inner}>
          <h1 className={styles.overlay__title}>
            Hey, would you like to learn how to create a
            <span className={styles.textGradient}>generative</span> UI just like this?
          </h1>
          <p className={styles.overlay__description}>
            In this tutorial we will be creating a generative “orb” animation
            using pixi.js, picking some lovely random colors and pulling it all
            together in a nice frosty UI.
            <strong>We're gonna talk accessibility, too.</strong>
          </p>
          <div className={styles.overlay__btns}>
  
            <button className={cn([styles.overlay__btn, styles.overlay__btnTransparent])}>
              <a href="https://georgefrancis.dev/writing/create-a-generative-landing-page-and-webgl-powered-background/"
                 target="_blank">
  
                View Tutorial
              </a>
            </button>
  
            <button className={styles.overlay__btn}>
              <span>Randomise Colors</span>
              <span className={styles.overlay__btnEmoji}>🎨</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Overlay;