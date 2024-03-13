import React, { useState, useEffect, useRef } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import Sidebar from "../components/Sidebar";
import "../styles/sidebar.css";
import EditPlan from "../components/EditPlan";
import { workouts } from './Exercises'; // Adjust the path as necessary
import Calendar from '../components/Calendar';
import { debounce } from 'lodash';

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//Workout********************************************************************************************************************ssdcsdc
export default function Workout() {
  
//States********************************************************************************************************************
  const [exercises, setExercises] = useState([]); // Function to update the fields for an exercise
  const [activeDate, setActiveDate] = useState(new Date());
  const [editMode, setEditMode] = useState(false); // New state to manage edit mode
  const [user] = useAuthState(auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editPlanMode, setEditPlanMode] = useState(false);
  const [displayExercise, setDisplayExercise] = useState(false);
  
  // Function to toggle sidebar open/close state
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    if (!user) {
      console.log("Guest user detected. Setting default exercises.");
      setExercises([
        { name: "Smoke", reps: 5, sets: 2, weight: 10 },
        { name: "Cray", reps: 8, sets: 3, weight: 15 },
        { name: "Pog", reps: 8, sets: 3, weight: 15 },
        { name: "Gop", reps: 8, sets: 3, weight: 15 },
      ]);
      return;
    }
    const fetchDocument = async () => {
      const docRef = doc(db, "users", user.uid, "workout-plan", getDateString());
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setExercises(docSnap.data().exercises);
      } else {
        console.log("No such document!");
      }
    };

    defaultWorkouts();
    fetchDocument();
  }, []);

  //Functions********************************************************************************************************************
  function getDateString() {
    return `${activeDate.getMonth() + 1}-${activeDate.getDate()}-${activeDate.getFullYear()}`
  }



  async function defaultWorkouts() {
    if (!user) {
      return;
    }
    // Check if the document for the user already exists
    const userDoc = await db
      .collection("users")
      .doc(user.uid)
      .collection("workout-plan")
      .doc(getDateString())
      .get();
    // If the document does not exist, set the default data
    if (!userDoc.exists) {
      let defaultData = {
        exercises: [
          {
            name: "DefaultExercise1",
            reps: 8,
            sets: 3,
            weight: 15,
          },
          {
            name: "DefaultExercise2",
            reps: 10,
            sets: 2,
            weight: 12,
          },
        ],
      };

      // if checking previous day and it doesnt exist
      if (!isSameOrGreaterDay(activeDate)) {
        console.log('before?')
        defaultData = {
          exercises: [],
        };
      }
      else {
        // checking if theres a dayofWeek workout
        console.log('further')
        const dayDoc = await db
          .collection("users")
          .doc(user.uid)
          .collection("workout-plan")
          .doc(daysOfWeek[activeDate.getDay()])
          .get();

        if (dayDoc.exists) {
          defaultData = {
            exercises: dayDoc.data().exercises
          }
        }
        
      }

      // Set the default data for the user
      await db
      .collection("users")
      .doc(user.uid)
      .collection("workout-plan")
      .doc(getDateString())
      .set(defaultData);

    }
  }

  const addExercise = () => {
    const newExercise = {
      name: "New Exercise", // You can set a default name or leave it empty
      reps: 8,
      sets: 3,
      weight: 15,
    };
    setExercises((prevExercises) => [...prevExercises, newExercise]);
  };
  const removeExercise = (index) => {
    const newExercises = exercises.filter((exercise, i) => i !== index);
    setExercises(newExercises);
  };

  const plans = [
    { className: 'day1', exerciseName: 'Bench Press', weight: '350', reps: '10', sets: '5' },
    { className: 'day2', exerciseName: 'Squat', weight: '300', reps: '12', sets: '4' },
    { className: 'day3', exerciseName: 'Incline Press', weight: '300', reps: '12', sets: '4' },
    { className: 'day4', exerciseName: 'Squat', weight: '300', reps: '12', sets: '4' },
    { className: 'day5', exerciseName: 'Squat', weight: '300', reps: '12', sets: '4' },
    { className: 'day6', exerciseName: 'Squat', weight: '300', reps: '12', sets: '4' },
    { className: 'day7', exerciseName: 'Squat', weight: '300', reps: '12', sets: '4' },
    // Add more objects for each plan you want to render
  ];



  useEffect(() => {
    if (!user) {
      return;
    }
    if (user) {
      const getData = async () => {
        await defaultWorkouts()
        const docRef = doc(db, "users", user.uid, "workout-plan", getDateString());
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setExercises(docSnap.data().exercises)
        }
      }
      
      getData();
  }
    
  }, [activeDate]);

  const updateExercise = async (index, details) => {
    // Assuming details can include name, category, weight, sets, reps
    const updatedExercises = exercises.map((exercise, i) => {
      if (i === index) {
        return {
          ...exercise,
          ...details,
        };
      }
      return exercise;
    });

    console.log("Updating exercises:", updatedExercises);

    setExercises(updatedExercises);

    // Update the corresponding document in the database
  };

  // Toggle edit mode
  const toggleEditMode = async () => {
    
    if (editMode) {
      const docRef = doc(db, "users", user.uid, "workout-plan", getDateString());
      const exercisesData = { exercises: exercises };
      await setDoc(docRef, exercisesData, { merge: true });

      // updates overarching monday-sunday workouts
      if (isSameOrGreaterDay(activeDate)) {
        const docRef = doc(db, "users", user.uid, "workout-plan", daysOfWeek[activeDate.getDay()]);
        
        const newExercises = exercises.map(({ completedSets, ...rest }) => rest);

        const exercisesData = { exercises: newExercises };
        await setDoc(docRef, exercisesData, { merge: true });
      }

      console.log("Exercises updated in Firebase");
    }
    
    setEditMode(!editMode);
  }

  const checkHover = (hover, workout) => {
    if(hover){
      setDisplayExercise(workout);
    } else {
      setDisplayExercise(null);
  } }

  function isSameOrGreaterDay(date1) {
    let date2 = new Date();

    // Set both dates to the start of the day for accurate comparison
    date1 = new Date(date1.setHours(0, 0, 0, 0));
    date2 = new Date(date2.setHours(0, 0, 0, 0));

    // Use the valueOf() method to get the time value of the dates for comparison
    return date1.valueOf() >= date2.valueOf();
  }

  const dynamicSizing = isSidebarOpen ? 'page-sidebar-open' : 'page-sidebar-closed';


  //Workout Structure********************************************************************************
  return (
    <>
      {/*sidebar*/}
      <button className="-toggle" onClick={toggleSidebar}>
      {isSidebarOpen ? (
          <i className="toggle-sidebar fas fa-chevron-left"></i>
        ) : (
          <i className="toggle-sidebar fas fa-chevron-right"></i>
        )}
      </button>
      <Sidebar isOpen={isSidebarOpen} style={{ position: "relative" }} checkHover={checkHover} />
      {/*page*/}
      <div className={`page ${dynamicSizing}`}>
        <h1 className="day"> 
          {daysOfWeek[activeDate.getDay()]} {`${activeDate.getMonth() + 1}/${activeDate.getDate()}`}
        </h1>
        <Calendar activeDate={activeDate} setActiveDate={setActiveDate}/>


          {/* ACTUAL BOX */}
          <div className="box">
            {displayExercise ? (
              <div className="exercise-info">
                <h1 className="exercise-info-title">{displayExercise.title}</h1>
                <h2 className="exercise-info-category">{displayExercise.category}</h2>
                <img src={displayExercise.imageUrl} 
                  style={{width:"40%", marginLeft:"auto", marginRight:"auto", borderRadius:"30px", boxShadow:"0 2px 5px grey"}} ></img>
                <p className="exercise-info-description">{displayExercise.description}</p>
              </div>
            ) : (
              <>
              <div className="editBtns">
                {/* EDIT BUTTON */}
                {editMode ? ("") :
                  (<button className="editPlanBtn"
                    onClick={toggleEditMode}>
                    Edit
                  </button>
                )}

                {/* CANCEL BUTTON - cancelEditMode does not exist*/}
                {/* {editMode ?
                  (<button className="cancelPlanBtn"
                    onClick={() => { cancelEditMode();}}> 
                    Cancel
                  </button>
                ) : ("")} */}

                {/* SAVE BUTTON */}
                {editMode ?
                  (<button className="savePlanBtn"
                    onClick={toggleEditMode}>
                    Save
                  </button>
                ) :  ("")}
              </div>

              {editPlanMode ? (
              plans.map((plan, index) => (
                <EditPlan
                  key={index}
                  className={plan.className}
                  exerciseName={plan.exerciseName}
                  weight={plan.weight}
                  reps={plan.reps}
                  sets={plan.sets}
                />
              ))) : (
                exercises.length > 0 &&
              exercises.map((exercise, index) => (
                <ExerciseBox
                  key={Math.random()} 
                  index={index}
                  uid={user.uid}
                  activeDate={activeDate}
                  exercises={exercises}
                  exercise={exercise.name}
                  weight={exercise.weight}
                  sets={exercise.sets}
                  reps={exercise.reps}
                  completedSets={exercise.completedSets}
                  updateExercise={updateExercise} // Pass updateWeight function here
                  removeExercise={removeExercise}
                  addExercise={addExercise}
                  getDateString={getDateString}
                  editMode={editMode} // Pass edit mode to control input fields visibility
                />
              )) 
              )}
              <button className="addExerciseBtn"
                onClick={() => addExercise()}>
                {exercises.length < 1 && <div style={{fontSize: 20}}>Rest Day 💪 (no exercises)</div>}
                <i className="fas fa-solid fa-plus"></i>
              </button>
            </>
            )}
       </div>
    
      
      <Timer />
     </div>
    </>
  );
}



//ExerciseBox****************************************************************************************************************
const ExerciseBox = ({
  index,
  uid,
  exercises,
  exercise,
  weight,
  sets,
  reps,
  completedSets,
  updateExercise,
  getDateString,
  editMode, // Prop to control the visibility of input fields
  removeExercise,
}) => {
  const dataListId = `workouts-${index}`;
  const [checkedButtons, setCheckedButtons] = useState(completedSets == null ? Array.from({ length: sets }, () => false) : completedSets);
  const [editedExerciseName, setEditedExerciseName] = useState(exercise);
  const [selectedWeight, setSelectedWeight] = useState(weight);
  const [selectedSets, setSelectedSets] = useState(sets);
  const [selectedReps, setSelectedReps] = useState(reps);
  const [selectedWorkout, setSelectedWorkout] = useState(exercise); 
  

 //HANDLES*******************************************************************************************************************

  const handleToggle = async (idx) => {
    const test = [...checkedButtons]
    test[idx] = !test[idx]
    exercises[index].completedSets = test
      
    await db
          .collection("users")
          .doc(uid)
          .collection("workout-plan")
          .doc(getDateString())
          .set({exercises: exercises});

    setCheckedButtons((prevCheckedButtons) => {
      const newCheckedButtons = [...prevCheckedButtons];
      newCheckedButtons[idx] = !newCheckedButtons[idx];
      return newCheckedButtons;
    });
  };


  const debouncedUpdateExercise = debounce((index, details) => {
    updateExercise(index, details);
  }, 500); // Increased delay to 500 milliseconds

  const handleInputChange = (event) => {
    setSelectedWorkout(event.target.value);
    console.log('Autocomplete field selected:', event.target.value);
    
  };

  const handleInputBlur = (event) => {
    const newWorkout = event.target.value;
    setSelectedWorkout(newWorkout);
    updateExercise(index, { name: newWorkout });
  };

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




// ...other code...
  //Exercise Box Structure********************************************************************************************************************
  return (
    <>
    {editMode ? (
      <div className="workouts-list">
      <input 
        list={dataListId} 
        onChange={handleInputChange} 
        onBlur={handleInputBlur}
        value={selectedWorkout} 
      />
      <datalist id={dataListId}>
            {workouts.map((workout) => (
              <option key={workout.id} value={workout.name} />
            ))}
          </datalist>
    </div>
    ):(<div className="workout-state">
    {exercise}
  </div>
  )}


         
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
                //Add more options as needed
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
        {editMode && (
          <div
            className="RemoveButton"
            style={{
              fontSize: "30px",
              padding: "10px",
              marginRight: "10px",
            }}
          >
            <button onClick={() => removeExercise(index)}>
              <i class="fas fa-solid fa-minus">
                {" "}
                <br />
              </i>
            </button>
          </div>
        )}
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
