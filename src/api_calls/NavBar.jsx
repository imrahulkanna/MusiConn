import { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"

export let NavBar = () => {
  return (
    <nav>
      <ul className="navbar">
        <li>
          <Link to="/app">
            <div className="navTitle">MusiConn</div>
          </Link>
        </li>
        <li className="navButton">
          <div>Recommendations</div>
          <ul className="drop-down">
            <li>
              <Link to="/userrecommendations">
                <div className="recommendSongsWrapper">Users</div>
              </Link>
            </li>
            <li>
              <Link to="/trackrecommendations">
                <div className="recommendSongsWrapper">Tracks</div>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}