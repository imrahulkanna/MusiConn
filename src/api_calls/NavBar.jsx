import { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

// export let NavBar = () => {
//   const [showMenu, setShowMenu] = useState(false);

//   const handleMenuToggle = () => {
//     setShowMenu(!showMenu);
//   };
//   const userId = localStorage.getItem('userId');

//   return (
//     <nav>
//       <div className="nav-container">
//         <Link to="/app">
//           <div className="navTitle">MusiConn</div>
//         </Link>
//         <div className="hamburger" onClick={handleMenuToggle}>
//           <div className="hamburger-line"></div>
//           <div className="hamburger-line"></div>
//           <div className="hamburger-line"></div>
//         </div>
//         <ul className={`navbar ${showMenu ? "active" : ""}`}>
//           <li>
//             <Link to="/userrecommendations" >Recommend Users</Link>
//           </li>
//           <li>
//             <Link to="/trackrecommendations">Recommend Tracks</Link>
//           </li>
//           <li>
//             <Link to={`/profile/${userId}`}>My Profile</Link>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

export let NavBar = () => {
  const userId = localStorage.getItem("userId");
  const [showLinks, setShowLinks] = useState(false);

  const handleToggle = () => {
    setShowLinks(!showLinks);
  };
  return (
    <nav>
      <div className="navBar">
        <div className="navTitle">
          <Link to="/app" className="link">
            MusiConn
          </Link>
        </div>
        <div className={`navButtons ${showLinks ? "show" : ""}`}>
          <div className="pageLinksdiv">
            <Link to="/userrecommendations" className="pageLinks">
              Recommend Users
            </Link>
          </div>

          <div className="pageLinksdiv">
            <Link to="/trackrecommendations" className="pageLinks">
              Recommend Tracks
            </Link>
          </div>
          <div className="pageLinksdiv">
            <Link to={`/profile/${userId}`} className="pageLinks">
              My Profile
            </Link>
          </div>
        </div>
        <a className="hambugger-icon" onClick={handleToggle}>
          <FontAwesomeIcon
            icon={faBars}
            bounce
            size="2xl"
            style={{ color: "#ffffff" }}
          />
        </a>
      </div>
      {/* <div class="topnav" id="myTopnav">
        <Link to="/app" className="link">
          MusiConn
        </Link>
        <Link to={`/profile/${userId}`} className="pageLinks">
          My Profile
        </Link>
        <Link to="/trackrecommendations" className="pageLinks">
          Recommend Tracks
        </Link>
        <Link to="/userrecommendations" className="pageLinks">
          Recommend Users
        </Link>
        <a className="hambugger-icon" onClick={handleToggle}>
          <FontAwesomeIcon
            icon={faBars}
            bounce
            size="2xl"
            style={{ color: "#ffffff" }}
          />
        </a>
      </div> */}
    </nav>
  );
};
