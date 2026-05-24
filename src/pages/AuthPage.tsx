import React from 'react';
import StyledFirebaseAuth from '../components/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { compatAuth } from '../services/firebase';
import './AuthPage.css';

const uiConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInSuccessUrl: '/#',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    {
      requireDisplayName: false,
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    },
    {
      defaultCountry: 'IN',
      provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    },
  ],
  tosUrl: '#',
  privacyPolicyUrl: '#',
};

const AuthPage: React.FC = () => {
  return (
    <div className="auth">
      <div className="container">
        <div className="auth__inner">
          <div className="auth__media">
            <img
              src="/images/undraw_security_o890.svg"
              alt="Security"
            />
          </div>
          <div className="auth__auth">
            <h1 className="auth__title">Login or Sign Up</h1>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={compatAuth} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
