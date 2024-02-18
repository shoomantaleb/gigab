import React, { useState } from 'react';
import '../styles.css';

export default function Workout() {
    return <>
    <div className='page'>
    <h1 className='workout-title'> Monday </h1> 
    <div className="exercise-list">
        <ExerciseBox exercise="Squats" weight="100" sets={3} reps="10" />
        <ExerciseBox exercise="Squats" weight="100" sets={5} reps="10" />
        <ExerciseBox exercise="Squats" weight="100" sets={4} reps="10" />
        <ExerciseBox exercise="Squats" weight="100" sets={4} reps="10" />
        <ExerciseBox exercise="Squats" weight="100" sets={4} reps="10" />
        <ExerciseBox exercise="Squats" weight="100" sets={4} reps="10" />
        <ExerciseBox exercise="Squats" weight="100" sets={4} reps="10" />

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
  