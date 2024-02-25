import React, { useState } from 'react';
import '../styles/friends.css';

export default function Friends() {
    const example_friends = [
        ["Zonk", 150, 20], 
        ["Omer", 30, 45], 
        ["Shown", 100, 15], 
        ["Busted", 10, 50],
        ["Sharl", 97, 60], 
        ["Claleb", 1031, 3]];
    
    const [friends, setFriends] = useState(example_friends);

    return (
        <div className='page'>
            <h1> Friends </h1>
            <div className='container'>
                
            <div className='box' id="friends-board">
                    <div id="search-friends"></div>
                    <div id="friend-list">
                        {/* DISPLAY USERS THAT MATCH THE SEARCH  */}
                        {/* 1) Find subset of all users  */}
                        {/* 2) Display that subset  */}
                            {/* Default - show current friends */}

                        
                        {/* {user_subset.map((user_subset, index) => (
                            <UserBox
                                key ={index}
                                name ={user_subset[0]}
                                curr_score ={user_subset[1]}
                                high_score ={user_subset[2]}
                                friended ={user_subset[3]} //whether the user has already friended this person
                                // addFriend={(newWeight) => updateWeight(index, newWeight)} // Pass updateWeight function here
                            />
                        ))} */}
                    </div>
                </div>
                
                <div className="box" id='leaderboard'>
                    <h2> Leaderboard </h2>
                    <div className='leaderboard-list'>
                        {/* {friends.map((friends, index) => (
                            <LeaderboardBox
                                key ={index}
                                name ={friends[0]}
                                curr_score ={friends[1]}
                                high_score ={friends[2]}
                                // updateWeight={(newWeight) => updateWeight(index, newWeight)} // Pass updateWeight function here
                            />
                        ))} */}
                    </div>
                </div>
                
            </div>  
        </div>
    );
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
