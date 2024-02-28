import React, { useState, useEffect, useRef } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebaseConfig"
import { useAuthState } from 'react-firebase-hooks/auth'; 


export default function Workout() {
  const [exercises, setExercises] = useState([]); // Function to update the fields for an exercise
  const [dayOfWeek, setDayOfWeek] = useState('monday');
  const [editMode, setEditMode] = useState(false); // New state to manage edit mode
  const [user] = useAuthState(auth)

  
  useEffect(() => {
    if (!user) {
      console.log("Guest user detected. Setting default exercises.");
      setExercises([
        { name: 'Smoke', reps: 5, sets: 2, weight: 10 },
        { name: 'Cray', reps: 8, sets: 3, weight: 15 },
        { name: 'Pog', reps: 8, sets: 3, weight: 15 },
        { name: 'Gop', reps: 8, sets: 3, weight: 15 }
        
      ]);
      return;
    }
    const fetchDocument = async () => {
      const docRef = doc(db, "users", user.uid, "workout-plan", dayOfWeek);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setExercises(docSnap.data().exercises);
      } else {
        console.log("No such document!");
      }
    };

    async function defaultWorkouts() {  
      if (!user) {
        return;
      }
      // Check if the document for the user already exists
      const userDoc = await db.collection('users').doc(user.uid).collection('workout-plan').doc('monday').get();
      // If the document does not exist, set the default data
      if (!userDoc.exists) {
        const defaultData = {
          exercises: [
            {
              name: 'DefaultExercise1',
              reps: 8,
              sets: 3,
              weight: 15
            },
            {
              name: 'DefaultExercise2',
              reps: 10,
              sets: 2,
              weight: 12
            }
          ]
        };
        // Set the default data for the user
        await db.collection('users').doc(user.uid).collection('workout-plan').doc('monday').set(defaultData);
  
        const docRef = doc(db, "users", user.uid, "workout-plan", "monday");

        
       // await setDoc(docRef, exercisesData);
      }
    }

    defaultWorkouts();
    fetchDocument();
  }, [])

  useEffect(() => {
    if (!user) {
      return;
    }
    if (user) {
      const docRef = doc(db, "users", user.uid, "workout-plan", dayOfWeek);
      const exercisesData = { exercises };

      const updateExercisesInFirebase = async () => {
        await setDoc(docRef, exercisesData, { merge: true });
        console.log("Exercises updated in Firebase");
      };

      updateExercisesInFirebase();
    }
  }, [exercises, user, dayOfWeek]);

  const updateExercise = async (index, details) => {
    const updatedExercises = exercises.map((exercise, i) => {
      if (i === index) {
        return {
          ...exercise,
          weight: details.weight !== undefined ? Number(details.weight) : exercise.weight,
          sets: details.sets !== undefined ? Number(details.sets) : exercise.sets,
          reps: details.reps !== undefined ? Number(details.reps) : exercise.reps,
        };
      }
      return exercise;
    });
  
    console.log("Updating exercises:", updatedExercises);
  
    setExercises(updatedExercises);

    // Update the corresponding document in the database 
  };
  
  
  
  // Toggle edit mode
  const toggleEditMode = () => setEditMode(!editMode);
  return (
    <>
      <div className="page">
        <h1 className=""> Monday </h1>

        <button onClick={toggleEditMode}>
              {editMode ? "Cancel" : "Edit"}
            </button>{" "}
            {/* Toggle between Edit and Cancel */}
            <button onClick={() => setEditMode(false)}>Save</button>{" "}
            {/* Save button to exit edit mode */}

        <div className="container">
          <div className="box">
            {exercises.map((exercise, index) => 
              (
              <ExerciseBox
                key={index}
                exercise={exercise.name}
                weight={exercise.weight}
                sets={exercise.sets}
                reps={exercise.reps}
                updateExercise={updateExercise} // Pass updateWeight function here
                editMode={editMode} // Pass edit mode to control input fields visibility
              />
            ))}
            
          </div>
        </div>
      </div>
      <Timer />
    </>
  );
}

const ExerciseBox = ({
  index,
  exercise,
  weight,
  sets,
  reps,
  updateExercise,
  editMode, // Prop to control the visibility of input fields
}) => {
  const [checkedButtons, setCheckedButtons] = useState(
    Array.from({ length: sets }, () => false)
  );
  const [selectedWeight, setSelectedWeight] = useState(weight);
  const [selectedSets, setSelectedSets] = useState(sets);
  const [selectedReps, setSelectedReps] = useState(reps);

  const handleToggle = (index) => {
    setCheckedButtons((prevCheckedButtons) => {
      const newCheckedButtons = [...prevCheckedButtons];
      newCheckedButtons[index] = !newCheckedButtons[index];
      return newCheckedButtons;
    });
  };

  /*  const handleWeightChange = (event) => {
        const newWeight = event.target.value;
        setSelectedWeight(newWeight);
        updateExercise(index, { weight: newWeight }); // Adjusted to use the updated function signature
        //also fix size of the input fields
        const SIZE_OF_LETTERS = 15;
        const textWidth = event.target.value.length * SIZE_OF_LETTERS; //

        // Set the input field width to match the width of the text
        event.target.style.width = `${textWidth}px`;

    };*/

  const handleWeightChange = async (event) => {
    //Weight event
    const newWeight = event.target.value;
    setSelectedWeight(newWeight); //Update Weight state
    updateExercise(index, { weight: newWeight }); //Update index@ Exercise.Weights to newWeight
   
  };

  const handleSetsChange = (event) => {
    //Sets event
    const newSets = event.target.value;
    setSelectedSets(newSets); //Update Sets state
    updateExercise(index, { sets: newSets }); //Update index@ Exercise.Sets to newSets
    // Update checkedButtons to reflect the new number of sets
    setCheckedButtons(Array.from({ length: Number(newSets) }, () => false));
  };

  const handleRepsChange = (event) => {
    //Reps event
    const newReps = event.target.value; // Update reps state
    setSelectedReps(newReps); //Update Reps State
    updateExercise(index, { reps: newReps }); //Update index@ Exercise.Reps to newReps
  };
  
  return (
    <>
      <div className="exercise-title">
        <b>{exercise}</b>
      </div>
      <div className="exercise-box">
        {editMode ? ( // Edit mode: Display input fields for editing
          <div className="content">
            <div className="edit-exercise-weight">
              <input
                type="number"
                value={selectedWeight}
                onChange={handleWeightChange}
                className="weight-input"
                step="2.5" //Increment weight by 0.5
              />
            </div>
            <div className="edit-sets-reps">
              <select
                value={selectedSets}
                onChange={handleSetsChange}
                className="sets-input"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
              <div className="input-label-sets">Sets</div>
              <select
                value={selectedReps}
                onChange={handleRepsChange}
                className="reps-input"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                // Add more options as needed
              </select>
              <div class="input-label-reps">Reps</div>
            </div>
          </div>
        ) : (
          // View mode: Display current values without input fields
          <div className="content">
            <div className="weight-state">{selectedWeight}</div>
            <div className="sets-reps-container">
              <div className="reps-state">{selectedSets} Sets</div>
              <div className="sets-state">{selectedReps} Reps</div>
            </div>
          </div>
        )}
        <div className="buttons">
          {checkedButtons.map((isChecked, index) => (
            <button
              key={index}
              className={`circle-button ${isChecked ? "checked" : ""}`}
              onClick={() => handleToggle(index)}
            ></button>
          ))}
        </div>
      </div>
    </>
  );
};

const Timer = () => {
  const [seconds, setSeconds] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null); //Changed "let timer" to properly reference the timer

  //Implementation of cleanup function whenever timer goes out of scope
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = ("0" + (time % 60)).slice(-2);
    return `${minutes}:${seconds}`;
  };

  const decreaseTime = () => {
    setSeconds((prevSeconds) => Math.max(prevSeconds - 5, 0));
  };

  const increaseTime = () => {
    setSeconds((prevSeconds) => prevSeconds + 5);
  };

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      if (timerRef.current) clearInterval(timerRef.current); //clears any existing timers before creating a new one
      timerRef.current = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds <= 0) {
            //Clears when timer reaches 0
            clearInterval(timerRef.current);
            setIsRunning(false);
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRunning(false);
  };

  return (
    <div className="timer">
      <div className="time-display">{formatTime(seconds)}</div>
      <div className="controls">
        <button className="btn" onClick={decreaseTime}>
          -
        </button>
        <button className="btn" onClick={increaseTime}>
          +
        </button>
        <button
          className="btn start-btn"
          onClick={isRunning ? stopTimer : startTimer}
        >
          {isRunning ? "Stop" : "Start"}
        </button>
      </div>
    </div>
  );
};
