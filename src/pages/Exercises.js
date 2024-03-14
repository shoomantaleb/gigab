import React, { useState } from 'react';
import '../styles/exercises.css';

const Exercises = ({sidebarWidth, style, checkHover}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredWorkouts, setFilteredWorkouts] = useState(workouts);
  const [hoveredExercise, setHoveredExercise] = useState(null);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = workouts.filter(workout =>
      workout.name.toLowerCase().includes(value) || workout.category.toLowerCase().includes(value)
    );
    setFilteredWorkouts(filtered);
  };

  return (
    <div className = "container">
      <div style={{ ...style, width: `${sidebarWidth}px` }}>    <div className='page'>
        <h1> Exercises </h1>
        <div className="container">
          <div className="exercises-box">
            <div className="search-bar-container">
                <input 
                  type="text" 
                  className="search-input"
                  placeholder="Search by name/muscle" 
                  value={searchTerm}
                  onChange={handleSearch}
                />
            </div>
            <div className="workout-columns">
              {filteredWorkouts.map(workout => (
                <li 
                  key={workout.id} 
                  className="workout-item" 
                  onMouseEnter={() => {
                    setHoveredExercise(workout);
                    checkHover(true, workout);
                    }}
                  onMouseLeave={() => {
                    setHoveredExercise(null);
                    checkHover(false, workout);
                  }}
                >
                  <span className="workout-name">{workout.name}</span>
                  <span className="workout-category">{workout.category}</span>
                </li>
                ))}
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export const workouts = [
  { id: 1, name: "Push-ups", category: "Chest", description: "Body-weight exercise done by lying with your face down and pushing your hands to raise your body.", imageUrl: "https://imgur.com/DYtsHxt.gif" },
  { id: 2, name: "Dips", category: "Chest", description: "Weighted exercise performed by supporting your body with your arms while lifting their body up.", imageUrl: "https://imgur.com/5nCYuYj.gif"},
  { id: 3, name: "Bench Press", category: "Chest", description: "Weighted exercise performed by lying on a flat bench and pushing a bar up and down.", imageUrl: "https://imgur.com/BkwmUIj.gif" },
  { id: 4, name: "Incline Press", category: "Chest", description: "Weighted exercise performed by lying on an inclined bench while pushing the bar straight up and down.", imageUrl: "https://imgur.com/eIZsbL1.gif" },
  { id: 5, name: "Chest Flys", category: "Chest", description: "Machine exercise performed by bringing the handles together to squeeze the chest muscles.", imageUrl: "https://imgur.com/gdignH4.gif" },
  { id: 6, name: "Decline Press", category: "Chest", description: "Weighted exercise performed by lying on a declined bench and pushing a bar up and down.", imageUrl: "https://imgur.com/Nmfu5qE.gif" },
  { id: 7, name: "Cable Press", category: "Chest", description: "Cable exercise performed by bringing the cables out in front to squeeze the chest muscles", imageUrl: "https://imgur.com/90obIuM.gif" },

  { id: 8, name: "Tricep Pushdown", category: "Triceps", description: "Machine exercise performed by pushing a bar , fully extending your arms.", imageUrl: "https://imgur.com/KnxB2yp.gif" },
  { id: 9, name: "Overhead Tricep Ext.", category: "Triceps", description: "Machine exercise performed by holding a rope behind your head and fully extending your arms upward.", imageUrl: "https://imgur.com/dhTqAwN.gif" },
  { id: 10, name: "Rope Pulldown", category: "Triceps", description: "Machine exercise performed by pulling the rope down, fully extending your arms.", imageUrl: "https://imgur.com/SfYqRvh.gif" },
  { id: 11, name: "Tricep Kickback", category: "Triceps", description: "Machine exercise performed by bending over at a 90 degree angle and fully extending your arm.", imageUrl: "https://imgur.com/nPMi9np.gif" },

  { id: 12, name: "Hammer Curls", category: "Biceps", description: "Dumbell exercise performed by holding the weights, palms facing each other, curling upwards.", imageUrl: "https://imgur.com/yRLvAhq.gif" },
  { id: 13, name: "Bicep Curls", category: "Biceps", description: "Dumbbell exercise performed by holding the weights, palms facing upwards, curling upwards", imageUrl: "https://imgur.com/ipDBTcS.gif" },
  { id: 14, name: "Preacher Curls", category: "Biceps", description: "Dumbell exercise performed by positioning your arm on a preacher curl bench and curling upwards.", imageUrl: "https://imgur.com/0LOWVPq.gif" },

  { id: 15, name: "Lat Pulldown", category: "Back", description: "Machine exercise performed by sitting on the lat pulldown machine, using a wide grip to pull the bar to your chest.", imageUrl: "https://imgur.com/LnCcsI2.gif" },
  { id: 16, name: "T-Bar Row", category: "Back", description: "Weighted exercise performed, either chest-supported or free, by pulling the bar to contract the upper back muscles.", imageUrl: "https://imgur.com/yU6JXkZ.gif" },
  { id: 17, name: "Cable Rows", category: "Back", description: "Machine exercise performed by pulling the your attachment of choice towards your abdominen.", imageUrl: "https://imgur.com/3Z2ZnNf.gif" },
  { id: 18, name: "High Row", category: "Back", description: "Machine exercise performed by pulling the handles towards your chest, squeezing the lat muscles.", imageUrl: "https://imgur.com/iOSTGi7.gif" },
  { id: 19, name: "Pull-ups", category: "Back", description: "Body-weight exercise performed by pulling yourself upwards on the bar.", imageUrl: "https://imgur.com/rWoiVZh.gif"},
  { id: 20, name: "Deadlift", category: "Back", description: "Weighted exercise performed by lifting the bar, by hinging at the hips to stand upright.", imageUrl: "https://imgur.com/ghbQQHz.gif" },

  { id: 21, name: "Lateral Raises", category: "Shoulders", description: "Weighted exercise performed by holding weights, palms facing in, and lifting out to the side.", imageUrl: "https://imgur.com/sXZj2ZR.gif" },
  { id: 22, name: "Overhead Press", category: "Shoulders", description: "Weighted exercise performed by starting at the top of the shoulders to lift above your head.", imageUrl: "https://imgur.com/n2k9t7k.gif" },
  { id: 23, name: "Shoulder Press", category: "Shoulders", description: "Weighted exercise performed by lifting the weights from shoulder height to above your head.", imageUrl: "https://imgur.com/occmEkZ.gif" },
  { id: 24, name: "Front Raises", category: "Shoulders", description: "Weighted exercise performed by holding the weights at your hips, palms facing behind you, and lifting straight out.", imageUrl: "https://imgur.com/AMIAf14.gif" },
  { id: 25, name: "Rear Delt Flys", category: "Shoulders", description: "Machine exercise performed by facing inwards on the machine and pushing your elbows back.", imageUrl: "https://imgur.com/Kp3fIpj.gif" },
  { id: 38, name: "Arnold Press", category: "Shoulders", description: "Weighted exercise performed with weights at shoulder height, palms facing towards you, and lifting to a normal shoulder press.", imageUrl: "https://imgur.com/yVVfoa8.gif" },
  { id: 42, name: "Shrugs", category: "Shoulders", description: "Weighted exercise performed by holding weights at your side and shrugging the shoulders upwards.", imageUrl: "https://imgur.com/k4uMACf.gif" },

  { id: 26, name: "Squats", category: "Legs", description: "Weighted exercise performed by resting the weights on your traps and squat down to a 90 degree angle.", imageUrl: "https://imgur.com/6IDzdW4.gif" },
  { id: 27, name: "Calf-Raises", category: "Legs", description: "Weighted exercise perfomed by lifting weights by raising the heels and keeping the toes on the ground.", imageUrl: "https://imgur.com/dCyx9fQ.gif" },
  { id: 28, name: "Leg Press", category: "Legs", description: "Weighted exercise performed by keeping your legs shoulder width apart and pressing outwards to lift the weight.", imageUrl: "https://imgur.com/rRBUSeG.gif" },
  { id: 29, name: "Leg Extension", category: "Legs", description: "Machine exercise performed by straightening your legs, hinging at the knees.", imageUrl: "https://imgur.com/rRBUSeG.gif" },
  { id: 30, name: "RDLs", category: "Legs", description: "Weighted exercise performed by starting at the top of a deadlift and lowering to the shins, hinging at the hips.", imageUrl: "https://imgur.com/NcIgWl5.gif" },
  { id: 31, name: "Bulgarian Split Squats", category: "Legs", description: "Weighted exercise performed by putting one foot on a bench and squatting with your other leg in front.", imageUrl: "https://imgur.com/LDuGE4R.gif" },
  { id: 32, name: "Leg Curls", category: "Legs", description: "Weighted exercise performed by curling your legs inwards, hinging at the knees.", imageUrl: "https://imgur.com/i01sIMj.gif" },
  { id: 33, name: "Hip Abduction", category: "Legs", description: "Weighted exercise performed by pressing your legs outwards away from the center of the body.", imageUrl: "https://imgur.com/UERHFo2.gif" },
  { id: 34, name: "Hip Adduction", category: "Legs", description: "Weighted exercise performed by pressing your legs inwards towards the center of the body.", imageUrl: "https://imgur.com/CM9C4Oq.gif"},
  { id: 35, name: "Sissy Squats", category: "Legs", description: "Weighted exercise performed by leaning backwards while bending at the knee and returning upwards.", imageUrl: "https://imgur.com/SKp1GW9.gif" },
  { id: 36, name: "Hip-Thrust", category: "Legs", description: "Weighted exercise performed by thrusting the hip upwards, driving through the heels.", imageUrl: "https://imgur.com/TIwMa4d.gif" },
  { id: 40, name: "Donkey Kicks", category: "Legs", description: "Weighted exercise performed by cuffing your ankle and kicking upwards.", imageUrl: "https://imgur.com/d2hMtFV.gif" },
  { id: 41, name: "Jump Squats", category: "Legs", description: "Weighted exercise performed by holding weights at your side and jumping.", imageUrl: "https://imgur.com/LOk7H4J.gif" },

  { id: 37, name: "Burpees", category: "Core", description: "Body-weight exercise performed by doing a pushup immediately followed by a leap in the air.", imageUrl: "https://imgur.com/NEuGQXu.gif" },
  { id: 39, name: "Plank", category: "Core", description: "Body-weight exercise performed by laying paralell to the ground with your forearms on the ground.", imageUrl: "https://imgur.com/9jogAvb.gif" },
  { id: 43, name: "Crunches", category: "Core", description: "Body weight exercise performed by doing a partial situp, stopping halfway.", imageUrl: "https://imgur.com/fHgmybb.gif" }, 
  { id: 44, name: "Sit-ups", category: "Core", description: "Body weight exercise performed by lying on your back and raising the back to an upward position.", imageUrl: "https://imgur.com/ORnOhig.gif" },
  { id: 45, name: "Mountain Climbers", category: "Core", description: "Body-weight exercise performed in a pushup position and moving the knees to the chest.", imageUrl: "https://imgur.com/eBb6xIA.gif" },
  { id: 46, name: "Scissor Kicks", category: "Core", description: "Body-weight exercise performed by lying on your back and kicking up and down.", imageUrl: "https://imgur.com/8AyqIwd.gif" },
  { id: 47, name: "Leg-Raises", category: "Core", description: "Body-weight exercise performed by lying on your back and lifting your legs to the sky.", imageUrl: "https://imgur.com/jaSaqNh.gif" },

  { id: 48, name: "Wrist Curls", category: "Forearms", description: "Weighted exercise performed by lying your forearm flat and bending the wrist.", imageUrl: "https://imgur.com/qDlgUII.gif" },
];

export default Exercises;