
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
      <section >
        {user ? <HomePage /> : isGuest ? <HomePage /> : <SignInPage setIsGuest={setIsGuest} />} 
      </section>
    </div>
  );
  
}

function SignInPage({ setIsGuest }){
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
    <div className='sign-in-page'>
      <div className='sign-in-box'>
        <h1 className='sign-in-title'>Giga<span id='title-b'>B</span></h1>
        <h2 className='sign-in-subtitle'>The Ultimate Workout Experience</h2>
        <button id="sign-in-btn" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" 
          onClick={signInWithGoogle}>
            Sign in with Google
        </button>
      </div>
    </div>

    {/* GUEST USER BUTTON */}
    {/* <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => setIsGuest(true)}>Continue as Guest</button>  */}
    </>
  )
}

function SignOut() {
  //Signs user out
  return auth.currentUser && (
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function HomePage() {

  return (<>
    <main>
      
      <Navbar/>
      <div className="container"> 
        <Routes>
          <Route path ="/" element ={<Workout />} />
          <Route path ="/Friends" element ={<Friends />} />
          <Route path ="/Workout" element ={<Workout />} />
          <Route path ="/Profile" element ={<Profile />} />
        </Routes>
        </div>
      

      </main>
  </>)
}
