import React, { useEffect, useState } from 'react';
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { db, auth } from '../firebaseConfig.js'; // Make sure you import db from your firebase config
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function Navbar() {
    const [user] = useAuthState(auth);
    const [currentStreak, setCurrentStreak] = useState(0);

    useEffect(() => {
        const fetchCurrentStreak = async () => {
            if (user) {
                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    setCurrentStreak(userDoc.data().currentStreak || 0);
                }
            }
        };

        fetchCurrentStreak();
    }, [user]);

    return (
        <nav className="nav">
            <Link to="/" className="site-title"> GigaB</Link>
            <ul>
                <CustomLink to="/Friends" className="normal"> Friends </CustomLink>
                <CustomLink to="/Workout" className="normal"> Workout </CustomLink>
                {user ? (
            <CustomLink to="/Profile" className="profile-link" displayName={user.displayName} photoURL={user.photoURL}>
                <div className="streak-container">
                    <span className="streak-display">{currentStreak}🔥</span>
                </div>
            </CustomLink>
            ) : (
    <CustomLink to="/Profile" className="profile-link"> Profile </CustomLink>
)}
            </ul>
        </nav>
    )
}

function CustomLink({ to, children, displayName, photoURL, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {displayName && (
                    <span className="profile-name" style={{ marginRight: '15px' }}>
                        {displayName}
                    </span>
                )}
                {photoURL && (
                    <img src={photoURL} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%', marginLeft: '8px' }} />
                )}
                {children}
            </Link>
        </li>
    );
}
