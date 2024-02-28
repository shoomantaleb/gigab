import { Link , useMatch, useResolvedPath } from "react-router-dom"
import 'firebase/compat/firestore'; //for the databse
import 'firebase/compat/auth'; //for the authentication
import { auth } from '/Users/omartaleb/Documents/GitHub/gigab/src/firebaseConfig.js';
import { useAuthState } from 'react-firebase-hooks/auth'; 




export default function Navbar() {

    const [user] = useAuthState(auth);
    const signOutUser = () => {
        auth.signOut();
    };
    return (
      <nav className="nav">
        <Link to="/" className="site-title"> GigaB</Link>
        <ul>
            <CustomLink to ="/Friends"> Friends </CustomLink>
            <CustomLink to ="/Workout"> Workout </CustomLink>
            <CustomLink to ="/Profile"> Profile </CustomLink>
            {user && (
                    <li>
                        <button onClick={signOutUser} style={{padding: '8px', background: 'none', border: 'none', color:'white', font: 'inherit', cursor: 'pointer',}}>Sign Out</button>
                    </li>
                )}
        </ul>
    </nav>
    )
}

function CustomLink({ to, children, ... props}){
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}> {children} </Link>
        </li>
    )
}
