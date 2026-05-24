import { useEffect, useRef, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import * as firebaseui from 'firebaseui';
import { auth } from '../services/firebase';

interface Props {
  uiConfig: firebaseui.auth.Config;
  firebaseAuth: firebase.default.auth.Auth;
}

const StyledFirebaseAuth: React.FC<Props> = ({ uiConfig, firebaseAuth }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [userSignedIn, setUserSignedIn] = useState(false);

  useEffect(() => {
    const unregisterAuthObserver = onAuthStateChanged(auth, (user) => {
      setUserSignedIn(!!user);
    });
    return () => unregisterAuthObserver();
  }, []);

  useEffect(() => {
    if (userSignedIn) return; // Don't show UI if already signed in

    // Get or create the FirebaseUI instance
    const firebaseUiWidget =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebaseAuth);

    if (elementRef.current) {
      firebaseUiWidget.start(elementRef.current, uiConfig);
    }

    return () => {
      firebaseUiWidget.reset();
    };
  }, [uiConfig, firebaseAuth, userSignedIn]);

  if (userSignedIn) {
    return null;
  }

  return <div ref={elementRef} />;
};

export default StyledFirebaseAuth;
