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
} from 'firebase/firestore';
import { auth, db } from '../firebaseConfig.js';
import { useAuthState } from 'react-firebase-hooks/auth';
import '../styles/friends.css';

export default function Friends() {
    const [user] = useAuthState(auth);
    const [inputSearch, setInputSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const [friendList, setFriendList] = useState([]);
    
    // Populate friendList when page loads 
    useEffect(() => {
        searchUsername();
        // Function to fetch friend list based on userID
        const fetchFriendList = async () => {
          try {
            const userRef = db.collection("users").doc(user.uid);
            const userDoc = await userRef.get();
            // console.log(userDoc.data());

            if (userDoc.exists) {
              const userData = userDoc.data();
              if (userData && userData.friends) {
                setFriendList(userData.friends);
              }

            } else {
              console.log("No such document!");
            }
          } catch (error) {
            console.error("Error fetching friend list:", error);
          }
        };
    
        // Fetch friend list when component mounts
        fetchFriendList();
    
        // Cleanup function if needed
        return () => {
          // Cleanup tasks if any
        };
    }, [friendList, user.uid]); // Re-run effect when userID changes

    // Dynamically update the input search (fix the 1 step lag)
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            searchUsername(inputSearch);
        }, 100); // Adjust the debounce delay as needed (e.g., 300 milliseconds)

        return () => {
            clearTimeout(timeoutId);
        };
    }, [inputSearch, friendList, user.uid]);
    

    // Handle change of search input
    const handleInputChange = async (event) => {
        setInputSearch(event.target.value);
        searchUsername();
        console.log("Input change");
    };

    const handleFollow = async (isFollowed, newID) => {
        if (user){
            // user collection, update "friends" field
            const cityRef = db.collection("users").doc(user.uid);
            const friendCopy = friendList;

            if (isFollowed){
                // Unfollow this bitch
                console.log(friendCopy.indexOf(newID));
                friendCopy.splice(friendCopy.indexOf(newID), 1)
            } else {
                //Add to followers list
                friendCopy.push(newID);
            }
            console.log(friendCopy);
            await cityRef.update({friends: friendCopy});
            setFriendList(friendCopy);
        }
    }

    const searchUsername = async () => {
        // console.log(inputSearch)
        try {
            const snapshot = await db.collection("users").orderBy('displayName').startAt(inputSearch).endAt(inputSearch + '\uf8ff').get();
            if (snapshot.empty) {
                setSearchResults([]);
                console.log("No documents found with substring:", inputSearch);
            } else {
                setSearchResults([]);
                // Reset results array
                let resultsArray = [];

                //Go through each document in the user dataset that matches 
                snapshot.forEach(doc => {
                    // Find the info necessary to create a friend-box
                    // {uid, username, photoURL, score, isFollowed}
                    let uid = doc.id;
                    let username = doc.data().displayName;
                    let photoURL = doc.data().photoURL;
                    let score = doc.data().highScore;
                    // Find if already friends
                    // console.log(friendList)
                    let isFriend = friendList.includes(uid);
                    
                    resultsArray.push([uid,username,photoURL,score,isFriend]);
                    // resultsArray.push([doc.id, doc.data()]);
                });

                setSearchResults(resultsArray);
                // console.log(resultsArray);
            }
          } catch (error) {
            console.error("Error searching for substring:", error);
          }        
    }


    return (
        <div className='page'>
            <h1> Friends </h1>
            <div className='container'>
                
            <div className='box' id="friends-board">
                    <div className='friend-option-buttons'>
                        <div></div>
                        <button id='search-friends'>Friends</button>
                        <button id='search-users'>Users</button>
                        <div></div>
                    </div>


                    <div id="search-friends">
                        <div className='friend-input-box'>
                            <input
                            type='text'
                            placeholder='Search for gym bros '
                            onChange={handleInputChange}
                            />
                        </div>
                    </div>


                    <div id="friend-list">
                        {/* DISPLAY USERS THAT MATCH THE SEARCH  */}
                        {searchResults.map((user, index) => (
                            // {uid, username, photoURL, score, isFollowed}
                            <UserBox
                                key={index}
                                uid={user[0]}
                                username={user[1]}
                                photoURL={user[2]}
                                score={user[3]}
                                isFollowed={user[4]}
                                handleFollow={(uid, isFollowed) => handleFollow(uid, isFollowed)} // Pass updateWeight function here
                            />
                        ))}
                    </div>

                </div>
                
                <div className="box" id='leaderboard'>
                    <h2> Leaderboard </h2>
                    <div className='leaderboard-list'>
                    </div>
                </div>
                
            </div>  
        </div>
    );
}

const UserBox = ({uid, username, photoURL, score, isFollowed, handleFollow}) => {

    return (
        <div className='friend-box'>
            {/* <div className='friend-box-left-elements'> */}
                {photoURL && (
                    <img src={photoURL} id='friend-box-pfp' alt="Profile" style={{ width: '35px', height: '35px', borderRadius: '50%', marginLeft: '2px' }} />
                )}
                <p id='friend-box-username'>{username}</p>
                <p id='friend-box-score'>{score} 🔥</p>
            {/* </div> */}


            {/* <button id= {'add-friend-btn' + {isFollowed ? "Follow" : "Following"}}>{isFollowed ? "Follow" : "Following"}</button> */}
            <button 
                className="add-friend-btn" 
                onClick={() => handleFollow(isFollowed, uid)}
                id={isFollowed ? "following" : ""}>
                    {isFollowed ? "Unfollow" : "Follow"}
            </button>
        </div>
    )
}


// const ExerciseBox = ({ exercise, weight, sets, reps, updateWeight }) => {
//     const [checkedButtons, setCheckedButtons] = useState(Array.from({ length: sets }, () => false));
//     const [selectedWeight, setSelectedWeight] = useState(weight); // Use the weight from props

//     const handleToggle = (index) => {
//         setCheckedButtons(prevCheckedButtons => {
//             const newCheckedButtons = [...prevCheckedButtons];
//             newCheckedButtons[index] = !newCheckedButtons[index];
//             return newCheckedButtons;
//         });
//     };

//     const handleWeightChange = (event) => {
//         const newWeight = event.target.value;
//         setSelectedWeight(newWeight);
//         updateWeight(newWeight); // Call the passed updateWeight function with the new weight
        
//         //also fix size of the input fields
//         const SIZE_OF_LETTERS = 18;
//         const textWidth = event.target.value.length * SIZE_OF_LETTERS; //

//         // Set the input field width to match the width of the text
//         event.target.style.width = `${textWidth}px`;
   
//     };

//     return (
//         <>
//         <div className='exercise-title'><b>{exercise}</b></div>
//         <div className="exercise-box">
//             <div className="content">
//                 <div className="exercise-weight">
//                     {/* <select value={selectedWeight} onChange={handleWeightChange} className="weight-selector">
//                         {Array.from({ length: (250 / 5) + 1 }, (_, i) => i * 5).map(weight => (
//                             <option key={weight} value={weight}>{weight} lbs</option>
//                             ))}
//                     </select> */}
//                     <input  value={selectedWeight} 
//                             onChange={handleWeightChange} 
//                             className="weight-selector"
//                             maxlength="7"
//                             minlength="1">
//                     </input>
//                 </div>
//                 <div className="sets-reps">
//                     <div>{sets} sets</div>
//                     <div>{reps} reps</div>
//                 </div>
//             </div>

//             <div className="buttons">
//                 {checkedButtons.map((isChecked, index) => (
//                     <button
//                         key={index}
//                         className={`circle-button ${isChecked ? 'checked' : ''}`}
//                         onClick={() => handleToggle(index)}
//                         ></button>
//                         ))}
//             </div>
//         </div>
//         </>
//         );
// }
