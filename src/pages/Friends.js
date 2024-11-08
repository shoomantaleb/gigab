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
import src from '../default_pfp.jpeg'

export default function Friends() {
    const [user] = useAuthState(auth);
    const [inputSearch, setInputSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const [updateVar, setUpdateVar] = useState(0);

    const [friendList, setFriendList] = useState([]);
    const [leaderBoardList, setLeaderBoardList] = useState([]);

    // Populate friendList when page loads - save from database
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
                if (userData) {
                    if (userData.friends){
                        setFriendList(userData.friends);
                    } else {
                        //If friends field doesn't exist, create it
                        // await db.collection("users").doc(user.uid).update({"friends": []});
                    }
                } 

            } else {
                //If document doesn't exist, create it
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
    }, [updateVar, user.uid]); // Re-run effect when userID changes




    // Dynamically update the leaderboard based on followers (fix the 1 step lag)
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            searchUsername(inputSearch);
        }, 100); // Adjust the debounce delay as needed (e.g., 300 milliseconds)

        return () => {
            clearTimeout(timeoutId);
        };
    }, [inputSearch, friendList, user.uid]);
    


    // Create leaderboard information based off of friendList ID's
    useEffect(() => {
        let unsortedFriends = [[0, user.uid, user.displayName, 4]];

        const populateFriendListData = async () => {
            // console.log(inputSearch)
            try {
                const snapshot = await db.collection("users").get();

                if (snapshot.empty) {
                    console.log("No friends womp womp");
                    return([]);
                } else {
                    // Reset sorted array
                    unsortedFriends = [];
    
                    //Go through each document in the user dataset that matches 
                    snapshot.forEach(async (doc) => {
                        // console.log(doc.id);
                        if(doc.data().currentStreak == undefined){
                            await doc.ref.set({ currentStreak: 0 }, { merge: true });
                            console.log(`Updated user ${doc.id}: added currentStreak field with value 0`);
                        }
                        
                        if(friendList.includes(doc.id) || doc.id == user.uid){
                            // console.log(friendList)
                            // console.log(doc.id)
                            // console.log(doc.data().displayName)

                            let username = doc.data().displayName;
                            let photoURL = doc.data().photoURL;
                            let score;

                            if(doc.data().currentStreak){
                                score = doc.data().currentStreak;
                                console.log("currentStreak exists for: ", doc.data().displayName);
                            } else {
                                score = 0;
                                console.log("currentStreak doesn't exist for: ", doc.data().displayName);
                            }
                            unsortedFriends.push([0, doc.id, username,photoURL,score]);
                        }
                    });

                    setLeaderBoardList(sortFriends(unsortedFriends));

                }
            } catch (error) {
                console.error("Error searching for friends", error);
            }   
        }
        populateFriendListData();
        // Sort the friends list data by score;

    }, [friendList]);


    // Sort friends for leaderboard 
    const sortFriends = (friendsArray) => {
        // score is unsortedFriendsArray[4]
        // [0, doc.id, username,photoURL,score]
        // And yes there is a way to sort the users by streak before this 
            // .collection("users").orderBy("currentStreak", "asc")
        friendsArray.sort(sortFunction);

        // Rearrange them 
        function sortFunction(a, b) {
            console.log(a[4])
            if (a[4] === b[4]) {
                return 0;
            }
            else {
                return (a[4] > b[4]) ? -1 : 1;
            }
        } 

        for (let i = 0; i < friendsArray.length; i++) {
            friendsArray[i][0] = i + 1;
        }
        return friendsArray;
    }

    // Dynamically update search results 
    const handleInputChange = async (event) => {
        setInputSearch(event.target.value);
        searchUsername();
    };


    /* Update and display the list of users that match the search input */
    const searchUsername = async () => {
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
                    if(doc.id != user.uid){ //Don't display the current user
                        // Find the info necessary to create a friend-box
                        // {uid, username, photoURL, score, isFollowed}
                        let userId = doc.id;
                        let username = doc.data().displayName;
                        let photoURL = doc.data().photoURL;
                        let score = doc.data().currentStreak;
                    
                        // Find if already friends
                        // console.log(friendList)
                        let isFriend = friendList.includes(userId);
                        
                        resultsArray.push([userId,username,photoURL,score,isFriend]);
                    }
                });

                setSearchResults(resultsArray);
            }
        } catch (error) {
            console.error("Error searching for substring:", error);
        }  
        
    }

    // Handle Follow/Unfollow based on button input
    const handleFollow = async (isFollowed, newID) => {
        if (user){
            // user collection, update "friends" field
            const cityRef = db.collection("users").doc(user.uid);
            const friendCopy = friendList;

            if (isFollowed){
                // Unfollow - Remove from followers list
                friendCopy.splice(friendCopy.indexOf(newID), 1)
            } else {
                //Add to followers list
                friendCopy.push(newID);
            }
            await cityRef.update({friends: friendCopy});
            setFriendList(friendCopy);
            setUpdateVar(updateVar + 1); //updates the friend list/follow without recursively editing friendlist
        }
    }
    

    return (
        <div className='page'>
            <h1> Friends </h1>
            <div className='container'>
                
            <div className='box' id="friends-board">
                    <h2 className="friend-title"> Add Friends </h2>
                    {/* <div className='friend-option-buttons'>
                        <div></div>
                        <button id='search-friends'>Friends</button>
                        <button id='search-users'>Users</button>
                        <div></div>
                    </div> */}


                    {/* <div id="search-friends"> */}
                        <div className='friend-input-box'>
                            <input
                            type='text'
                            placeholder='Search for gym bros '
                            onChange={handleInputChange}
                            />
                        </div>
                    {/* </div> */}


                    {/* DISPLAY USERS THAT MATCH THE SEARCH  */}
                    <div id="friend-list">
                        {searchResults.map((user, index) => (
                            // {uid, username, photoURL, score, isFollowed}
                            <UserBox
                                key={index}
                                uid={user[0]}
                                username={user[1]}
                                photoURL={user[2] == null ? src : user[2]}
                                score={user[3]}
                                isFollowed={user[4]}
                                handleFollow={(uid, isFollowed) => handleFollow(uid, isFollowed)} // Pass updateWeight function here
                            />
                        ))}
                    </div>

                </div>
                
                {/* DISPLAY FRIENDS IN ORDER OF STREAK */}
                <div className="box" id='leaderboard'>
                    <h2 className="friend-title"> Leaderboard <i style={{fontSize:"12pt"}}>(Current Streak)</i></h2>
                    <div className='leaderboard-list'>
                        {
                        leaderBoardList.map((user, index) => (
                            // [pos, doc.id, username,photoURL,score]
                            <LeaderBoardBox
                                key={index}
                                position={user[0]}
                                uid={user[1]}
                                username={user[2]}
                                photoURL={user[3] == null ? src : user[3]}
                                score={user[4]}
                            />
                        ))}
                    </div>
                </div>
                
            </div>  
        </div>
    );
}


/* Display all the information for one user */
/* Used in the search results list */
const UserBox = ({uid, username, photoURL, score, isFollowed, handleFollow}) => {

    return (
        <div className='friend-box'>
            {/* Display profile pic if it exists */}
            {photoURL && (
                <img src={photoURL} id='friend-box-pfp' alt="" 
                style={{ width: '35px', height: '35px', borderRadius: '50%', marginLeft: '2px' }} />
            )}
            <p id='friend-box-username'>{username}</p>
            <p id='friend-box-score'>{score} 🔥</p>

            {/* Follow button */}
            <button 
                className="add-friend-btn" 
                onClick={() => handleFollow(isFollowed, uid)}
                id={isFollowed ? "following" : ""}>
                    {isFollowed ? "Unfollow" : "Follow"}
            </button>
        </div>
    )
}


/* Display info for each friend in the leaderboard */
const LeaderBoardBox = ({position, uid, username, photoURL, score}) => {
    return (
        // Each element of list is part of a gradient
        <div className='friend-box leaderboard-box' 
        style={{backgroundColor: `rgba(255, 85, 0, ${1/(Math.exp(.3*position))})`}}>
            
            <p id = "leaderboard-box-pos">{position}</p>
            {photoURL && (
                <img src={photoURL} id='friend-box-pfp' alt="" 
                style={{ width: '35px', height: '35px', borderRadius: '50%', marginLeft: '2px' }} />
            )}
            <p id='leaderboard-box-username'>{username}</p>
            <p id='leaderboard-box-score'>{score} 🔥</p>

        </div>
    )
}