import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const cloudFunctions = {
  createOrder: import.meta.env.VITE_CF_CREATE_ORDER,
  capturePayment: import.meta.env.VITE_CF_CAPTURE_PAYMENT,
};

export const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

const app = initializeApp(firebaseConfig);

// Initialize compat app for react-firebaseui
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const db = getFirestore(app);
export const auth = getAuth(app);
export const compatAuth = firebase.auth();
export const storage = getStorage(app);
export default app;
