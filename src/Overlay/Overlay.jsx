import React, { useState, useCallback } from 'react';
import cn from 'classnames';
import Confetti from 'react-confetti';
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getFirestore, collection, addDoc } from "firebase/firestore";

import Input from '../Input';
import logoSrc from '../logo.png';

import styles from './Overlay.module.scss';

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const getButtonLabel = (isLoading, isError, isSuccess) => {
  if (isLoading) {
    return 'Joining...';
  }
  
  if (isError) {
    return 'Not joined :(';
  }
  
  if (isSuccess) {
    return 'Joined!';
  }
  
  return 'Join Waitlist';
}

const Overlay = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState('');
  
  const onJoinWaitlistClick = useCallback(async () => {
    setIsLoading(true);
    
    try {
      const docRef = await addDoc(collection(db, "whitelist"), {
        email,
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);

      logEvent(analytics, 'website:join_waitlist_error', {
        email,
        error: e.message,
      });
      setError('Something went wrong. Please try again later.');
      
      return;
    } finally {
      setIsLoading(false);
    }

    setIsSuccess(true);
    setEmail('');

    // remove
    // const querySnapshot = await getDocs(collection(db, "whitelist"));
    // querySnapshot.forEach((doc) => {
    //   console.log(`${doc.id} => ${doc.data().email}`);
    // });
  }, [email]);
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.overlay}>
        <div className={styles.overlay__inner}>
          <img src={logoSrc} alt="Orally" className={styles.logo} />

          <h1 className={styles.overlay__title}>
            Join the Orally waitlist and be the first to access our <span className={styles.textGradient}>decentralized data feeding</span> and automation platform!
          </h1>
          
          <div className={styles.overlay__btns}>
            <Input
              className={styles.input}
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            
            <button
              className={cn([styles.overlay__btn, styles.overlay__btnTransparent])}
              onClick={onJoinWaitlistClick}
              disabled={isLoading || isSuccess || Boolean(error) || !email || !emailRegex.test(email)}
            >
              {getButtonLabel(isLoading, error, isSuccess)}
            </button>
          </div>
          
          {error && <div className={styles.overlay__error}>{error}</div>}
        </div>
      </div>

      {isSuccess && <Confetti />}
    </div>
  )
};

export default Overlay;
