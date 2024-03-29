import React, { useState, useEffect } from 'react';
import '../styles/profile.css';
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  map,
} from 'firebase/firestore';
import { auth, db } from '../firebaseConfig.js';
import { useAuthState } from 'react-firebase-hooks/auth';
import WeightGraph from '../components/WeightGraph.js';
import defaultPfp from '../default_pfp.jpeg'

export default function Profile() {
  const [user] = useAuthState(auth);
  const [inputWeight, setInputWeight] = useState('');
  const [displayedWeight, setDisplayedWeight] = useState(() => {
    const storedWeight = localStorage.getItem('displayedWeight');
    return storedWeight ? storedWeight : '150';
  });
  const [streak, setStreak] = useState(0);
  const [highscore, setHighscore] = useState(0);
  const [weights, setWeights] = useState([]);

  
  const signOutUser = () => {
    auth.signOut();
  }
  
  const handleInputChange = (event) => {
    const { value } = event.target;
    // Check if the input value is a valid number
    if (/^\d*\.?\d*$/.test(value)) {
      setInputWeight(value);
    }
  };
  

  const handleSaveClick = async () => {
    // Check if inputWeight is a valid number
    if (!isNaN(parseFloat(inputWeight)) && isFinite(inputWeight)) {
      setInputWeight('');
      localStorage.setItem('displayedWeight', inputWeight);
  
      const savedWeight = await saveWeightToFirestore(inputWeight);
      if (savedWeight != null) {
        setWeights((weights) => [...weights, savedWeight]);
        setDisplayedWeight(inputWeight);
      }
    } else {
      // Handle invalid input (optional)
      console.log('Invalid input. Please enter a valid number.');
    }
  };
  
  
  
  const saveWeightToFirestore = async (weight) => {
    if (user) {
      const weightsCollectionRef = collection(db, 'weights');
      await addDoc(weightsCollectionRef, {
        userId: user.uid,
        weight: parseFloat(weight),
        timestamp: new Date(),
      });
  
      const storedWeights = JSON.parse(localStorage.getItem('weights')) || [];
      const parsedWeight = parseFloat(weight);
      storedWeights.push(parsedWeight);
      localStorage.setItem('weights', JSON.stringify(storedWeights));
  
      return parsedWeight; // Ensure this function returns the new weight
    }
    return null; // Return null or an appropriate value when the user is not defined
  };  
  

  useEffect(() => {
    document.body.classList.add('scrollable-page');

    // Cleanup function to remove the class when the component unmounts

    const updateStreak = async () => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
    
        if (userDoc.exists()) {
          const lastSignInDate = userDoc.data().lastSignInDate?.toDate();
          const today = new Date();
          today.setHours(0, 0, 0, 0);
    
          let currentStreak = 1;
    
          if (lastSignInDate) {
            if (lastSignInDate.getTime() === today.getTime() - 24 * 60 * 60 * 1000) {
              currentStreak = userDoc.data().currentStreak + 1;
            }
          }
    
          await updateDoc(userDocRef, { currentStreak, lastSignInDate: today });
    
          setStreak(currentStreak);
    
          const currentHighScore = userDoc.data().highScore || 0;
          if (currentStreak > currentHighScore) {
            await updateDoc(userDocRef, { highScore: currentStreak });
            setHighscore(currentStreak); 
          } else {
            setHighscore(currentHighScore); 
          }
        }
      }
    };
    
    const fetchWeights = async () => {
      if (user) {
        const weightsQuery = query(collection(db, 'weights'), where('userId', '==', user.uid));
        const weightsSnapshot = await getDocs(weightsQuery);
        const userWeights = [];
        weightsSnapshot.forEach((doc) => {
          const weightData = doc.data();
          userWeights.push({ weight: weightData.weight, timestamp: weightData.timestamp });
        });
    
        // Sort the weights based on their timestamps
        userWeights.sort((a, b) => a.timestamp - b.timestamp);
    
        // Extract sorted weights without timestamps
        const sortedWeights = userWeights.map((data) => data.weight);
    
        setWeights(sortedWeights);
      }
    };
    
    

    if (user) {
      updateStreak();
      fetchWeights();
      const storedWeight = localStorage.getItem('displayedWeight');
      if (storedWeight) {
        setDisplayedWeight(storedWeight);
      }
    }
  }, [user]); 


  console.log(user.providerData)

  return (
    <div className='page'>
     <div className='card'> 
      <img src={user.photoURL == null ? defaultPfp : user.providerData[0].photoURL} className="user-photo" />
      <div className='profile-card'>
        <div className='user-info'>
        <div className='columnOrganizer'>
            <p className='username align' >{user ? user.displayName : 'User'}</p>
          <p className='tier-subheading align'>
            <span className='tier-subheading'>gigachad</span>{' '}
            <span className='tier'>tier</span>
          </p>
          </div>
        </div>
        <div className='score-info'>
          <div className='score-column'>
            <p>Current Score</p>
            <p className='score'>{streak}<span className='emoji'>🔥</span></p>
          </div>
          <div className='score-column'>
            <p>High Score</p>
            <p className='score'>{highscore}<span className='emoji'>⭐️</span></p>
          </div>
        </div>
        <div className='horizontal-line'></div>
        {/* Displayed Weight Section */}
        <div className='custom-text'>
          <p className='left-align'>Track Weight Here</p>
          <p className='right-align'>{displayedWeight}</p>
        </div>
        <div className='weightgraph-card'>
          <p>Weight Graph</p>
          <WeightGraph weights={weights} />
        </div>
        {/* Input and Save Section */}
        <div className='input-save-container'>
          <div className='input-box'>
            <input
              type='text'
              placeholder='Input your weight'
              onChange={handleInputChange}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleSaveClick();
                }
              }}
            />
          </div>
          <div className='save-button' onClick={handleSaveClick}>
            <p>Save</p>
          </div>
        </div>
          <div className='signOut-button' onClick={signOutUser}>
              <p> Sign Out</p>
           </div>
      {/* </div> */}
      </div>
      </div>
    </div>
    
  );
}

