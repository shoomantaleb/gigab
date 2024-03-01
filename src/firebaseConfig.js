import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyAYxjvnG_EtV5OJ2YZKsu0NuOtBhmyY_uQ",
    authDomain: "gigab-d299f.firebaseapp.com",
    projectId: "gigab-d299f",
    storageBucket: "gigab-d299f.appspot.com",
    messagingSenderId: "67991910335",
    appId: "1:67991910335:web:856b643435b1aa5340d30a",
    measurementId: "G-0G9GXYGCE1"
}

firebase.initializeApp(firebaseConfig)

  const auth = firebase.auth();
  const db = firebase.firestore();

export { db, auth };
