// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { FacebookAuthProvider, GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAP_OZ978zbLOGcB5N3rskUJhQP3L1RDbo',
  authDomain: 'chat-app-react-4bb6f.firebaseapp.com',
  projectId: 'chat-app-react-4bb6f',
  storageBucket: 'chat-app-react-4bb6f.appspot.com',
  messagingSenderId: '476391661776',
  appId: '1:476391661776:web:5000508302ef07eb3fbed5',
  measurementId: 'G-T7DW4SMRF8'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
// connectAuthEmulator(auth, 'http://127.0.0.1:9099');
export const providerFace = new FacebookAuthProvider();
export const providerGoogle = new GoogleAuthProvider();
export const db = getFirestore(app);
// connectFirestoreEmulator(db, '127.0.0.1', 8080);
