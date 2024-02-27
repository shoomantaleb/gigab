import { Link , useMatch, useResolvedPath } from "react-router-dom"

export default function Navbar() {
    return (
        <nav className="nav">
            <div className="left-region">
                <Link to="/" className="site-title"> GigaB</Link>
                <Link to="/Friends">Friends</Link>   
                <Link to="/Workout">Workout</Link>
            </div>
            <div className="right-region">
                <Link to="/Profile">Profile</Link>
            </div>
        </nav>
    );
}


// function CustomLink({ to, children, ... props}){
//     const resolvedPath = useResolvedPath(to)
//     const isActive = useMatch({ path: resolvedPath.pathname, end: true })

//     return (
//         <li className={isActive ? "active" : ""}>
//             <Link to={to} {...props}> {children} </Link>
//         </li>
//     )
// }