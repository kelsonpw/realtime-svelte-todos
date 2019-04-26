import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var config = {
  apiKey: 'AIzaSyB_ACN4P44s72lp9YcCvy6HZNYdnmZwR7I',
  authDomain: 'realtime-todos-ced9f.firebaseapp.com',
  databaseURL: 'https://realtime-todos-ced9f.firebaseio.com',
  projectId: 'realtime-todos-ced9f',
  storageBucket: 'realtime-todos-ced9f.appspot.com',
  messagingSenderId: '1008844801043',
};
firebase.initializeApp(config);

export const db = firebase.firestore();
export default firebase;
export const auth = firebase.auth;
