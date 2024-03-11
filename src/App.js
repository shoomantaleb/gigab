
import React, { useRef, useState, useEffect } from 'react';
import Navbar from "./components/Navbar"
import './styles/App.css';
import Workout from "./pages/Workout"
import Friends from "./pages/Friends"
import Exercises from "./pages/Exercises"
import Profile from "./pages/Profile"
import {Route, Routes} from "react-router-dom"
import { auth } from './firebaseConfig';
import { db } from './firebaseConfig';
import { setDoc, doc } from 'firebase/firestore';

//Tutorial for firebase x react:
//https://www.youtube.com/watch?v=zQyrwxMPm88&ab_channel=Fireship
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; //for the databse
import 'firebase/compat/auth'; //for the authentication

//makes it easier to work with firebase in react
import { useAuthState } from 'react-firebase-hooks/auth'; 

export default function App() {
  const [user] = useAuthState(auth);
  const [isGuest, setIsGuest] = useState(false); // + New state for guest users
  //Signed in - user is an object
  //Signed out - user is null

  return (
    <div className="App">
      <header>

      </header>
      
      <section >
        {/* Sign in component */}
        {user ? <HomePage /> : isGuest ? <HomePage /> : <SignIn setIsGuest={setIsGuest} />} 
      
      </section>
    </div>
  );
  
}

function SignIn({ setIsGuest }){
  //Opens google sign in window
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(async (res) => {
      const user = res.user

      const data = {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      }

      await setDoc(doc(db, 'users', user.uid), data)
      
    })

  }

  return (
    <>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={signInWithGoogle}>Sign in with Google</button>
    <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => setIsGuest(true)}>Continue as Guest</button> 
    </>// + Button for guest users
  )
}

function SignOut() {
  //Signs user out
  return auth.currentUser && (
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => auth.signOut()}>Sign Out</button>
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
          <Route path ="/exercises" element ={<Exercises />} />
          <Route path ="/Profile" element ={<Profile />} />
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