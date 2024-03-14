import React, { useState } from "react";
import { db } from "../firebaseConfig";
import "../styles/sidebar.css";
import { workouts } from '../pages/Exercises'; // Adjust the path as necessary
import { debounce } from 'lodash';

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
    };

    const handleWeightBlur = async (event) => {
      //Weight event
      const newWeight = event.target.value;
      setSelectedWeight(newWeight); //Update Weight state
      debouncedUpdateExercise(index, { weight: newWeight }); //Update index@ Exercise.Weights to newWeight
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
                  onBlur={handleWeightBlur}
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

  export default ExerciseBox