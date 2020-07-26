import firebase from 'firebase';
import store from '../store';

const firebaseConfig = {
  apiKey: 'AIzaSyCpjr3GqmjE_vYMquED_uVA2LyVBt0lsYo',
  authDomain: 'platzi-rooms-5c054.firebaseapp.com',
  databaseURL: 'https://platzi-rooms-5c054.firebaseio.com',
  projectId: 'platzi-rooms-5c054',
  storageBucket: 'platzi-rooms-5c054.appspot.com',
  messagingSenderId: '1030842103984',
  appId: '1:1030842103984:web:7748904af4183806c22375',
  measurementId: 'G-HRSY6Q8399',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch('fetchAuthUser');
  }
});
