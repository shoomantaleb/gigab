import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';
import { getDoc, doc, collection, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyAYxjvnG_EtV5OJ2YZKsu0NuOtBhmyY_uQ",
    authDomain: "gigab-d299f.firebaseapp.com",
    projectId: "gigab-d299f",
    storageBucket: "gigab-d299f.appspot.com",
    messagingSenderId: "67991910335",
    appId: "1:67991910335:web:856b643435b1aa5340d30a",
    measurementId: "G-0G9GXYGCE1"
}
  
  const saveWeightToFirestore = async (user, weight, setWeights) => {
    if (user) {
      const weightsCollectionRef = collection(db, 'weights');
      const weightDocRef = await addDoc(weightsCollectionRef, {
        userId: user.uid,
        weight: parseFloat(weight),
        timestamp: new Date(),
      });
  
      setWeights((prevWeights) => [...prevWeights, parseFloat(weight)]);
  
      return weightDocRef.id; // Return the ID of the added document if needed
    }
  };
  
  const loadWeightData = async (userId) => {
    const weightsDocRef = doc(db, 'weights', userId);
    const weightsDoc = await getDoc(weightsDocRef);
  
    if (weightsDoc.exists()) {
      const userWeights = weightsDoc.data().weightData || [];
      return userWeights;
    }
  
    return [];
  };

  
  const app = initializeApp(firebaseConfig);


firebase.initializeApp(firebaseConfig)
  // const auth = getAuth(app);
  const db = getFirestore(app);

export { db, auth, saveWeightToFirestore, loadWeightData };

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

const signInWithGoogle = () => {
  auth.signInWithPopup(provider)
    .then((result) => {
    })
    .catch((error) => {
    });
};