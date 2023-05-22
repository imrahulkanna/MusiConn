import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import musiconnLogo from "./../assets/musiconn.png"

const currUserProfileEndpoint = "https://api.spotify.com/v1/me";

export let NavBar = () => {
  const [userID, setUserID] = useState("");
  const [showLinks, setShowLinks] = useState(false);

  useEffect(() => {
    let accessToken = localStorage.getItem("accessToken");
    const getCurrUserProfile = async () => {
      const response = await fetch(currUserProfileEndpoint, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      if (response.status === 401) {
        refreshAccessToken();
        accessToken = localStorage.getItem("accessToken");
        await getCurrUserProfile();
      }
      const currUserDetails = await response.json();

      setUserID(currUserDetails.id);
    };

    getCurrUserProfile();
  }, []);
  
  const handleToggle = () => {
    setShowLinks(!showLinks);
  };
  return (
    <nav>
      <div className="navBar">
        <div className="navTitle">
          <Link to="/app" className="link">
            {/* MusiConn */}
            <img class="mainLogo" src={musiconnLogo} alt=""  />
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
            <Link to={`/profile/${userID}`} className="pageLinks">
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
