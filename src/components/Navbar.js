import { Link, useMatch, useResolvedPath } from "react-router-dom";
import 'firebase/compat/firestore'; //for the database
import 'firebase/compat/auth'; //for authentication
import { auth } from '../firebaseConfig.js';
import { useAuthState } from 'react-firebase-hooks/auth';

// ... (previous imports)

export default function Navbar() {
    const [user] = useAuthState(auth);
    

    return (
        <nav className="nav">
            <Link to="/" className="site-title"> GigaB</Link>
            <ul>
                <CustomLink to="/Friends" className="normal"> Friends </CustomLink>
                <CustomLink to="/Workout" className="normal"> Workout </CustomLink>
                {/* <CustomLink to="/Exercises" className="normal"> Exercises</CustomLink> */}
                

                {user ? (
                    <CustomLink to="/Profile" className="profile-link" displayName={user.displayName} photoURL={user.photoURL} />
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
