import React, { useState } from 'react';
import '../styles/sidebar.css';
import useWindowSize from '../components/WindowResize';
import Exercises from '../pages/Exercises';
const Sidebar = ({ isOpen }) => {


const [width, height] = useWindowSize(); // Destructure the width and height from the hook
const sidebarWidth = Math.max(250, width * 0.2); // Example: Sidebar takes up to 20% of the window width, but not less than 250px
// Example custom style object
const customStyleWhenSidebarOpen = {
    padding: '20px', //padding is the space between the content and the border
    margin: '-20px', //margin is the space outside the border
    // Add any other styles you want to apply when the sidebar is open
  };

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`} style={{width: `${sidebarWidth}px`}}>
        <div className="sidebar-content">
          {/* Sidebar content here */}
          <Exercises
         sidebarWidth={sidebarWidth}
        style={isOpen ? customStyleWhenSidebarOpen : {}}
        />
        </div>
      </div>
    );
  };
  
  

export default Sidebar;
