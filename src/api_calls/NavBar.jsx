import { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"
import "./CurrentTrack.jsx"

export let NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };
  const userId = localStorage.getItem('userId');

  return (
    <nav>
      <div className="nav-container">
        <Link to="/app">
          <div className="navTitle">MusiConn</div>
        </Link>
        <div className="hamburger" onClick={handleMenuToggle}>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
        </div>
        <ul className={`navbar ${showMenu ? "active" : ""}`}>
          <li>
            <Link to="/userrecommendations" >Recommend Users</Link>
          </li>
          <li>
            <Link to="/trackrecommendations">Recommend Tracks</Link>
          </li>
          <li>
            <Link to={`/profile/${userId}`}>My Profile</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

// export let NavBar = () => {
//   return (
//     <nav>
//       <ul className="navbar">
//         <li>
//           <Link to="/app">
//             <div className="navTitle">MusiConn</div>
//           </Link>
//         </li>
//         <li className="navButton">
//           <div>Recommendations</div>
//           <ul className="drop-down">
//             <li>
//               <Link to="/userrecommendations">
//                 <div className="recommendSongsWrapper">Users</div>
//               </Link>
//             </li>
//             <li>
//               <Link to="/trackrecommendations">
//                 <div className="recommendSongsWrapper">Tracks</div>
//               </Link>
//             </li>
//           </ul>
//         </li>
//       </ul>
//     </nav>
//   );
// }