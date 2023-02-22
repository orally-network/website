import React from 'react';

import twitterSrc from './assets/twitter.png';
import githubSrc from './assets/github.png';
import mediumSrc from './assets/medium.png';
import styles from './Socials.module.scss';

const Socials = () => {
  return (
    <div className={styles.socialsWrapper}>
      <div className={styles.socials}>
        <a className={styles.link} href="https://twitter.com/orally_network" target="_blank">
          <img className={styles.img} src={twitterSrc} alt="Twitter" />
        </a>
  
        <a className={styles.link} href="https://github.com/orally-network" target="_blank">
          <img className={styles.img} src={githubSrc} alt="Github" />
        </a>
  
        <a className={styles.link} href="https://medium.com/@orally" target="_blank">
          <img className={styles.img} src={mediumSrc} alt="Medium" />
        </a>
      </div>
    </div>
  )
};

export default Socials;