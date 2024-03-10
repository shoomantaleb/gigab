import React, { useState, useEffect, useRef } from "react";
import "../styles/EditPlan.css";



export const EditPlan = ({ className, exerciseName, weight, reps, sets }) => {
  
  return (
    <div className={"component-1 " + className}>
      <div className="rectangle-15"></div>
      <div className="rectangle-24"></div>
      <div className="exercise">{exerciseName}</div>
      <div className="weight">{weight} </div>
      <div className="reps">10 </div>
      <div className="sets">5 </div>
      <div className="reps-title"> reps </div>
      <div className="sets-title"> sets </div>
    </div>
  
  
    
  );
};
export default EditPlan;