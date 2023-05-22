import { useEffect } from "react";
import { onPageLoad } from "./config";
import { NavBar } from "../api_calls/NavBar.jsx";
import spotifyLogo from "../assets/spotify.svg";
import { Link } from "react-router-dom";
import "../App.css";

const Landing = () => {
  useEffect(() => {
    onPageLoad();
  },[])

  return (
    <>
      <NavBar />
      <div>
        <img
          src={spotifyLogo}
          className="logo landing-logo"
          alt="Spotify logo"
        />
      </div>
      <h1 className="hometitle">MusiConn</h1>
      <div className="desc-container">
        <div className="desc">
          Quickly open up your Spotify and play your favourite track.<br></br>
          Let's groove and connect with fellow music lovers
        </div>
      </div>
      <div className="card">
        <Link to="/currenttrack">
          <button className="spotifyLogin">What's playing?</button>
        </Link>
      </div>
    </>
  );
};

export default Landing;
