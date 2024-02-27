// Import necessary modules/components
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/profile.css';

// Profile component
export default function Profile() {
  return (
    <div className='page'>
      <div className='profile-card'>
        <div className='user-info'>
          <div className='username'>
            <p>420Gamer</p>
          </div>
          <p className='tier-subheading'>
            <span className='tier'>gigachad</span> <span className='tier'>tier</span>
          </p>
        </div>
        <div className='score-info'>
          <div className='score-column'>
            <p>Current Score</p>
            <p className='score'>17</p>
          </div>
          <div className='score-column'>
            <p>High Score</p>
            <p className='score'>995</p>
          </div>
        </div>
        <div className='horizontal-line'></div>
        <div className='custom-text'>
          <p className='left-align'>Track Weight Here</p>
          <p className='right-align'>150</p>
        </div>
        <div className='weightgraph-card'>
          <p>Weight Graph</p>
        </div>
        <div className='input-save-container'>
          <div className='input-box'>
            <input type='text' placeholder='Input your weight' />
          </div>
          <div className='save-button'>
            <p>Save</p>
          </div>
        </div>
      </div>
    </div>
  );
}
