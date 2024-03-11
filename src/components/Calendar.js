import React, { useState, useEffect } from 'react';
import "../styles/calendar.css"

const Calendar = ({activeDate, setActiveDate}) => {
  const [date, setDate] = useState(new Date());
  const [currentYear, setCurrentYear] = useState(activeDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(activeDate.getMonth());
  const [activeDay, setActiveDay] = useState(activeDate.getDate());
  const [isVisible, setIsVisible] = useState(false); // State to control visibility
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const isToday = (day) => day === new Date().getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear();

  const generateCalendar = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const days = [];

    for (let i = firstDayOfMonth; i > 0; i--) {
      days.push(<li key={`prev-${i}`} className="inactive">{new Date(currentYear, currentMonth, -i + 1).getDate()}</li>);
    }

    for (let i = 1; i <= lastDateOfMonth; i++) {
      let dayClass = isToday(i) ? "today" : "";
      dayClass += i === activeDay ? " active" : "";
      days.push(<li key={i} className={dayClass} onClick={() => changeDate(i)}>{i}</li>);
    }

    const lastDayOfMonth = new Date(currentYear, currentMonth, lastDateOfMonth).getDay();
    for (let i = lastDayOfMonth; i < 6; i++) {
      days.push(<li key={`next-${i}`} className="inactive">{i - lastDayOfMonth + 1}</li>);
    }

    return days;
  };

  const changeDate = (i) => {
    setActiveDay(i)
    const newDate = new Date(currentYear, currentMonth, i)
    setActiveDate(newDate)
  };

  const changeMonth = (direction) => {
    const newMonthDate = new Date(currentYear, currentMonth + (direction === 'prev' ? -1 : 1));
    setActiveDate(newMonthDate);
    setCurrentMonth(newMonthDate.getMonth());
    setCurrentYear(newMonthDate.getFullYear());
    setActiveDay(1);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div className="calendar-toggle-container">
        <button onClick={toggleVisibility}>{isVisible ? 'Hide Calendar' : 'Show Calendar'}</button>
        {isVisible && (
          <div className="calendar-container">
            <header className="calendar-header">
              <p className="calendar-current-date">{months[currentMonth]} {currentYear}</p>
              <div className="calendar-navigation">
                <span id="calendar-prev" className="material-symbols-rounded" onClick={() => changeMonth('prev')}>
                  {'<'}
                </span>
                <span id="calendar-next" className="material-symbols-rounded" onClick={() => changeMonth('next')}>
                  {'>'}
                </span>
              </div>
            </header>

            <div className="calendar-body">
              <ul className="calendar-weekdays">
                <li>Sun</li>
                <li>Mon</li>
                <li>Tue</li>
                <li>Wed</li>
                <li>Thu</li>
                <li>Fri</li>
                <li>Sat</li>
              </ul>
              <ul className="calendar-dates">
                {generateCalendar()}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Calendar;
