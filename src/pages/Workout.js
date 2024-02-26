import React, { useState, useEffect, useRef } from "react";
import "../styles/workout.css";

export default function Workout() {
  const exerciseListArray = [
    //[Excercise, Weight, Sets, Reps]
    ["Squats", "100", 3, "10"],
    ["Deadlift", "50", 5, "8"],
    ["Leg Press", "200", 4, "6"],
    ["Rock climb", "100", 3, "10"],
  ];
  const [exercises, setExercises] = useState(exerciseListArray); // Function to update the fields for an exercise
  const updateExercise = (index, details) => {
    const updatedExercises = exercises.map((exercise, i) => {
      if (i === index) {
        return [
          exercise[0], //Exercise
          details.weight !== undefined ? Number(details.weight) : exercise[1],
          details.sets !== undefined ? Number(details.sets) : exercise[2],
          details.reps !== undefined ? Number(details.reps) : exercise[3],
        ];
      }
      return exercise;
    });
    setExercises(updatedExercises);
  };

  return (
    <>
      <div className="page">
        <h1 className=""> Monday </h1>
        <div className="container">
          <div className="box">
            {exercises.map((exercise, index) => (
              <ExerciseBox
                key={index}
                exercise={exercise[0]}
                weight={exercise[1]}
                sets={exercise[2]}
                reps={exercise[3]}
                  updateExercise={updateExercise} // Pass updateWeight function here
              />
              ))}

              <button> Save </button>
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
}) => {
    const [checkedButtons, setCheckedButtons] = useState(
        Array.from({ length: sets }, () => false)
        );
    const [selectedWeight, setSelectedWeight] = useState(weight.toString()); // Keep as string for input control
    const [selectedSets, setSelectedSets] = useState(sets.toString()); // Keep as string for input control
    const [selectedReps, setSelectedReps] = useState(reps.toString()); // Keep as string for input control

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

    const handleWeightChange = (event) => {
        const newWeight = event.target.value; // Keep as string for input handling
        setSelectedWeight(newWeight);
        updateExercise(index, { weight: newWeight }); // No need to parse here; parsing moved to updateExercise
    };

    const handleSetsChange = (event) => {
        const newSets = event.target.value; // Keep as string for input handling
        setSelectedSets(newSets);
        updateExercise(index, { sets: newSets }); // No need to parse here; parsing moved to updateExercise
        // Update checkedButtons to reflect the new number of sets
        setCheckedButtons(Array.from({ length: Number(newSets) }, () => false));
    };

    const handleRepsChange = (event) => {
        const newReps = event.target.value; // Keep as string for input handling
        setSelectedReps(newReps);
        updateExercise(index, { reps: newReps }); // No need to parse here; parsing moved to updateExercise
    };

    return (
        <>
        <div className="exercise-title">
            <b>{exercise}</b>
        </div>
        <div className="exercise-box">
            <div className="content">
                <div className="exercise-weight">
                    <input
                        type="number"
                        value={selectedWeight}
                        onChange={handleWeightChange}
                        className="weight-input"
                        step="0.5" // Allow decimal values
                    />
                </div>
                <div className="sets-reps">
                    <input
                        type="number"
                        value={selectedSets}
                        onChange={handleSetsChange}
                        className="sets-input"
                        min="1"
                        max="6"
                    />{" "}
                    Sets
                    <input
                        type="number"
                        value={selectedReps}
                        onChange={handleRepsChange}
                        className="reps-input"
                        min="1"
                        max="50"
                    />{" "}
                    Reps
                </div>
            </div>

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
