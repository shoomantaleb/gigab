// Import necessary modules/components
import React from 'react';
import { Link } from 'react-router-dom';

// Profile component
export default function Profile() {
  return (
    <div className='page'>
      <h1> Profile </h1>
    </div>
  );
}

// Navigation bar link with profile picture
export const ProfileLink = () => (
  <Link to="/Profile" className="profile-link">
    <img src="/images/profile.png" alt="Profile" className="profile-picture" />
    Profile
  </Link>
);
