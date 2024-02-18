import React, { useRef, useState, useEffect } from 'react';
import Navbar from "./Navbar"
import './App.css';
import Workout from "./pages/Workout"
import Friends from "./pages/Friends"
import {Route, Routes} from "react-router-dom"

//Tutorial for firebase x react:
//https://www.youtube.com/watch?v=zQyrwxMPm88&ab_channel=Fireship
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; //for the databse
import 'firebase/compat/auth'; //for the authentication

//makes it easier to work with firebase in react
import { useAuthState } from 'react-firebase-hooks/auth'; 
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
// const firebaseConfig = {
  apiKey: "AIzaSyAYxjvnG_EtV5OJ2YZKsu0NuOtBhmyY_uQ",
  authDomain: "gigab-d299f.firebaseapp.com",
  projectId: "gigab-d299f",
  storageBucket: "gigab-d299f.appspot.com",
  messagingSenderId: "67991910335",
  appId: "1:67991910335:web:856b643435b1aa5340d30a",
  measurementId: "G-0G9GXYGCE1"
})

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

const auth = firebase.auth();
const firestore = firebase.firestore();




export default function App() {
  const [user] = useAuthState(auth);
  //Signed in - user is an object
  //Signed out - user is null

  return (
    <div className="App">
      <header>

      </header>
      
      <section >
        {/* Sign in component */}
        {user ? <HomePage /> : <SignIn />}
      </section>
    </div>
  );
  
}

function SignIn(){
  //Opens google sign in window
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut() {
  //Signs user out
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function HomePage() {

 /* const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
    
   

  }
*/
  
  return (<>
    <main>
      
      <Navbar/>
      <div className="container"> 
        <Routes>
          <Route path ="/" element ={<Workout />} />
          <Route path ="/Friends" element ={<Friends />} />
          <Route path ="/Workout" element ={<Workout />} />
        </Routes>
        </div>
      

      </main>
{/*
      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
     
      <span ref={dummy}></span>
      
    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

      <button type="submit" disabled={!formValue}>🕊️</button>

    </form>
  */}

  </>)
}


/*
function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      <p>{text}</p>
    </div>
  </>)
}
*/