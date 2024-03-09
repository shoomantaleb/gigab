import React, { useState } from 'react';
import '../styles/exercises.css';
import Sidebar from '../components/Sidebar';

const Exercises = ({sidebarWidth, style}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredWorkouts, setFilteredWorkouts] = useState(workouts);

  const customStyle = {
    maxWidth: sidebarWidth, // Ensure the component doesn't overflow the sidebar
    // Additional responsive styling can go here
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = workouts.filter(workout =>
      workout.name.toLowerCase().includes(value) || workout.category.toLowerCase().includes(value)
    );
    setFilteredWorkouts(filtered);
  };

  const midIndex = Math.ceil(filteredWorkouts.length / 2);
  const leftColumnWorkouts = filteredWorkouts.slice(0, midIndex);
  const rightColumnWorkouts = filteredWorkouts.slice(midIndex);

  return (
    <div style={{ ...style, width: `${sidebarWidth}px` }}>    <div className='page'>
      <h1> Exercises </h1>
      <div className="container">
        <div className="exercises-box">
          <div className="search-bar-container">
              <input 
                type="text" 
                className="search-input"
                placeholder="Search by name or muscle..." 
                value={searchTerm}
                onChange={handleSearch}
              />
          </div>
          <div className="workout-columns">
            <ul className="workout-column">
              {leftColumnWorkouts.map(workout => (
                <li key={workout.id} className="workout-item">
                  <span className="workout-name">{workout.name}</span>
                  <span className="workout-category">{workout.category}</span>
                </li>
              ))}
            </ul>
            <ul className="workout-column">
              {rightColumnWorkouts.map(workout => (
                <li key={workout.id} className="workout-item">
                  <span className="workout-name">{workout.name}</span>
                  <span className="workout-category">{workout.category}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export const workouts = [
  { id: 1, name: "Push-ups", category: "Chest" },
  { id: 2, name: "Dips", category: "Chest" },
  { id: 3, name: "Bench Press", category: "Chest" },
  { id: 4, name: "Incline Press", category: "Chest" },
  { id: 5, name: "Chest Flys", category: "Chest" },
  { id: 6, name: "Decline Press", category: "Chest" },
  { id: 7, name: "Incline Press", category: "Chest" },

  { id: 8, name: "Tricep Pushdown", category: "Triceps" },
  { id: 9, name: "Overhead Tricep Extension", category: "Triceps" },
  { id: 10, name: "Rope Pulldown", category: "Triceps" },
  { id: 11, name: "Tricep Kickback", category: "Triceps" },

  { id: 12, name: "Hammer Curls", category: "Biceps" },
  { id: 13, name: "Bicep Curls", category: "Biceps" },
  { id: 14, name: "Preacher Curls", category: "Biceps" },

  { id: 15, name: "Lat Pulldown", category: "Back" },
  { id: 16, name: "T-Bar Row", category: "Back" },
  { id: 17, name: "Cable Rows", category: "Back" },
  { id: 18, name: "High Row", category: "Back" },
  { id: 19, name: "Pull-ups", category: "Back" },
  { id: 20, name: "Deadlift", category: "Back" },

  { id: 21, name: "Lateral Raises", category: "Shoulders" },
  { id: 22, name: "Military Press", category: "Shoulders" },
  { id: 23, name: "Shoulder Press", category: "Shoulders" },
  { id: 24, name: "Front Raises", category: "Shoulders" },
  { id: 25, name: "Rear Delt Flys", category: "Shoulders" },

  { id: 26, name: "Squats", category: "Legs" },
  { id: 27, name: "Calf-Raises", category: "Legs" },
  { id: 28, name: "Leg Press", category: "Legs" },
  { id: 29, name: "Leg Extension", category: "Legs" },
  { id: 30, name: "RDLs", category: "Legs" },
  { id: 31, name: "Bulgarian Split Squats", category: "Legs" },
  { id: 32, name: "Leg Curls", category: "Legs" },
  { id: 33, name: "Calf-Raises", category: "Legs" },
  { id: 34, name: "Sissy Squats", category: "Legs" },
  { id: 35, name: "Hip-Thrust", category: "Legs" },
];

export default Exercises;