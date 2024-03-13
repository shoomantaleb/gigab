import React, { useState, useEffect, useRef } from "react";
import "../styles/sidebar.css";

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
  
  export default Timer