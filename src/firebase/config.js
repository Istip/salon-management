import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCKpeBfp3ek6MjeNMeutmc_sNxhjCOMD0s',
  authDomain: 'saloon-management-a3c78.firebaseapp.com',
  projectId: 'saloon-management-a3c78',
  storageBucket: 'saloon-management-a3c78.appspot.com',
  messagingSenderId: '630028634977',
  appId: '1:630028634977:web:6e11af0e300cf55c82d320',
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init service
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };
