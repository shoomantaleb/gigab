import React, { useState, useEffect, useRef } from 'react';
import '../styles/workout.css';

export default function Workout() {
    const exerciseListArray = [
        ["Squats", "100", 3, "10"], 
        ["Deadlift", "50", 5, "8"], 
        ["Leg Press", "200", 4, "6"], 
        ["Rock climb", "100", 3, "10"]
    ];
    const [exercises, setExercises] = useState(exerciseListArray);

    // Function to update the weight for an exercise
    const updateWeight = (index, newWeight) => {
        const updatedExercises = exercises.map((exercise, i) => {
            if (i === index) {
                return [exercise[0], newWeight, exercise[2], exercise[3]];
            }
            return exercise;
        });
        setExercises(updatedExercises);
    };

    return (
        <>
            <div className='page'>
                <h1 className=''> Monday </h1>
                <div className='container'>
                <div className="box">
                    {exercises.map((exercise, index) => (
                        <ExerciseBox
                            key={index}
                            exercise={exercise[0]}
                            weight={exercise[1]}
                            sets={exercise[2]}
                            reps={exercise[3]}
                            updateWeight={(newWeight) => updateWeight(index, newWeight)} // Pass updateWeight function here
                        />
                    ))}

                    <button> Save </button>
                </div>
                </div>

            </div>
            <Timer/>
        </>
    );
}

const ExerciseBox = ({ exercise, weight, sets, reps, updateWeight }) => {
    const [checkedButtons, setCheckedButtons] = useState(Array.from({ length: sets }, () => false));
    const [selectedWeight, setSelectedWeight] = useState(weight); // Use the weight from props

    const handleToggle = (index) => {
        setCheckedButtons(prevCheckedButtons => {
            const newCheckedButtons = [...prevCheckedButtons];
            newCheckedButtons[index] = !newCheckedButtons[index];
            return newCheckedButtons;
        });
    };

    const handleWeightChange = (event) => {
        const newWeight = event.target.value;
        setSelectedWeight(newWeight);
        updateWeight(newWeight); // Call the passed updateWeight function with the new weight
        
        //also fix size of the input fields
        const SIZE_OF_LETTERS = 15;
        const textWidth = event.target.value.length * SIZE_OF_LETTERS; //

        // Set the input field width to match the width of the text
        event.target.style.width = `${textWidth}px`;
   
    };

    return (
        <>
        <div className='exercise-title'><b>{exercise}</b></div>
        <div className="exercise-box">
            <div className="content">
                <div className="exercise-weight">
                    {/* <select value={selectedWeight} onChange={handleWeightChange} className="weight-selector">
                        {Array.from({ length: (250 / 5) + 1 }, (_, i) => i * 5).map(weight => (
                            <option key={weight} value={weight}>{weight} lbs</option>
                            ))}
                    </select> */}
                    <input  value={selectedWeight} 
                            onChange={handleWeightChange} 
                            className="weight-selector"
                            maxlength="7"
                            minlength="1">
                    </input>
                </div>
                <div className="sets-reps">
                    <div>{sets} sets</div>
                    <div>{reps} reps</div>
                </div>
            </div>

            <div className="buttons">
                {checkedButtons.map((isChecked, index) => (
                    <button
                        key={index}
                        className={`circle-button ${isChecked ? 'checked' : ''}`}
                        onClick={() => handleToggle(index)}
                        ></button>
                        ))}
            </div>
        </div>
        </>
        );
}

const Timer = () => {
    const [seconds, setSeconds] = useState(60);
    const [isRunning, setIsRunning] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);
  
    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = ('0' + (time % 60)).slice(-2);
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
            if (timerRef.current) clearInterval(timerRef.current);
            timerRef.current = setInterval(() => {
                setSeconds((prevSeconds) => {
                    if (prevSeconds <= 0) {
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
            <button className="btn" onClick={decreaseTime}>-</button>
            <button className="btn" onClick={increaseTime}>+</button>
            <button className="btn start-btn" onClick={isRunning ? stopTimer : startTimer}>
                {isRunning ? 'Stop' : 'Start'}
            </button>
        </div>
        
      </div>
    );
}