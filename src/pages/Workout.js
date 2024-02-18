import React, { useState } from 'react';
import '../styles/workout.css';

export default function Workout() {
    //Exercise list array should be imported from the database, whatever that means;
    const exerciseListArray = [
        ["Squats", "100", 3, "10"], 
        ["Deadlift", "50", 5, "8"], 
        ["Leg Press", "200", 4, "6"], 
        ["Rock climb", "100", 3, "10"]];
    const [exercises, setExercises] = useState(exerciseListArray);

    return <>
    <div className='page'>
    <h1 className='workout-title'> Monday </h1> 
    <div className="exercise-list">
        {exercises.map((index) => (
            <ExerciseBox exercise={index[0]} weight={index[1]} sets={index[2]} reps={index[3]} />
        ))}
    </div>
    </div>
    </>
}

const ExerciseBox = ({ exercise, weight, sets, reps }) => {
    const initialCheckedButtons = Array.from({ length: sets }, () => false);
    const [checkedButtons, setCheckedButtons] = useState(initialCheckedButtons);

    const handleToggle = (index) => {
        setCheckedButtons((prevCheckedButtons) => {
        const newCheckedButtons = [...prevCheckedButtons];
        newCheckedButtons[index] = !newCheckedButtons[index];
        return newCheckedButtons;
        });
    };


  
    console.log("Checked buttons array:", checkedButtons);

    return (
      <>
      <div className='exercise-title'> <b>{exercise}</b></div>
      <div className="exercise-box">
        <div className="content">
          <div className="exercise-weight" >{weight} lbs</div>
          <div className="sets-reps">
            <div>{sets} sets</div>
            <div>{reps} reps</div>
          </div>
        </div>
        
        <div className="buttons">
            <div className="buttons">
                {checkedButtons.map((isChecked, index) => (
                    // <p>{index}</p>
                    <button
                        key={index}
                        className={`circle-button ${isChecked ? 'checked' : ''}`}
                        onClick={() => handleToggle(index)} 
                    >
                    </button>
                ))}
            </div>
        </div>
      </div>
      </>
    );
  };
  