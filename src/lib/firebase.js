import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: 'instagram-hl.firebaseapp.com',
  projectId: 'instagram-hl',
  storageBucket: 'instagram-hl.appspot.com',
  messagingSenderId: '418474441783',
  appId: '1:418474441783:web:1b0c89b7a0efb0573c93b2',
};
const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };
