import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import Sidebar from "../components/Sidebar";
import "../styles/sidebar.css";
import EditPlan from "../components/EditPlan";
import Calendar from '../components/Calendar';
import ExerciseBox from '../components/ExerciseBox.js'
import Timer from '../components/Timer.js';

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
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
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
                <h1 className="exercise-info-title">{displayExercise.name}</h1>
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
