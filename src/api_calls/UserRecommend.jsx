import { useState, useEffect } from "react";
import spotifyLogo from "../assets/spotify.svg"
import "./UserRecommend.css";

function UserRecommend() {
  console.log('hi')
  return (
    <div>
      <h1 className="title">Find People</h1>
      <div>
        <p className="prompt">with similar music taste</p>
        <div className="flex-container">
          <div className="profile-card">
            <div className="img-container">
              <img src="../src/assets/luffy.jpeg" alt="luffy.jpeg" className="profile-img"/>
            </div>
            <a href="https://onepiece.fandom.com/wiki/Monkey_D._Luffy" className="text-container">
              <p className="profile-name">Monkey D. Luffy</p>
              <p><button onClick={window.open('http://www.google.com')} className="add-friend">Add Friend</button></p>
            </a>
          </div>
          <div className="profile-card">
            <div className="img-container">
              <img src="../src/assets/luffy.jpeg" alt="luffy.jpeg" className="profile-img"/>
            </div>
            <a href="https://onepiece.fandom.com/wiki/Monkey_D._Luffy" className="text-container">
              <p className="profile-name">Monkey D. Luffy</p>
              <p><button onClick={window.open('http://www.google.com')} className="add-friend">Add Friend</button></p>
            </a>
          </div>
          <div className="profile-card">
            <div className="img-container">
              <img src="../src/assets/luffy.jpeg" alt="luffy.jpeg" className="profile-img"/>
            </div>
            <a href="https://onepiece.fandom.com/wiki/Monkey_D._Luffy" className="text-container">
              <p className="profile-name">Monkey D. Luffy</p>
              <p><button onClick={window.open('http://www.google.com')} className="add-friend">Add Friend</button></p>
            </a>
          </div>
          <div className="profile-card">
            <div className="img-container">
              <img src="../src/assets/luffy.jpeg" alt="luffy.jpeg" className="profile-img"/>
            </div>
            <a href="https://onepiece.fandom.com/wiki/Monkey_D._Luffy" className="text-container">
              <p className="profile-name">Monkey D. Luffy</p>
              <p><button onClick={window.open('http://www.google.com')} className="add-friend">Add Friend</button></p>
            </a>
          </div>
          <div className="profile-card">
            <div className="img-container">
              <img src="../src/assets/luffy.jpeg" alt="luffy.jpeg" className="profile-img"/>
            </div>
            <a href="https://onepiece.fandom.com/wiki/Monkey_D._Luffy" className="text-container">
              <p className="profile-name">Monkey D. Luffy</p>
              <p><button onClick={window.open('http://www.google.com')} className="add-friend">Add Friend</button></p>
            </a>
          </div>
          <div className="profile-card">
            <div className="img-container">
              <img src="../src/assets/luffy.jpeg" alt="luffy.jpeg" className="profile-img"/>
            </div>
            <a href="https://onepiece.fandom.com/wiki/Monkey_D._Luffy" className="text-container">
              <p className="profile-name">Monkey D. Luffy</p>
              <p><button onClick={window.open('http://www.google.com')} className="add-friend">Add Friend</button></p>
            </a>
          </div>
          <div className="profile-card">
            <div className="img-container">
              <img src="../src/assets/luffy.jpeg" alt="luffy.jpeg" className="profile-img"/>
            </div>
            <a href="https://onepiece.fandom.com/wiki/Monkey_D._Luffy" className="text-container">
              <p className="profile-name">Monkey D. Luffy</p>
              <p><button onClick={window.open('http://www.google.com')} className="add-friend">Add Friend</button></p>
            </a>
          </div>
          <div className="profile-card">
            <div className="img-container">
              <img src="../src/assets/luffy.jpeg" alt="luffy.jpeg" className="profile-img"/>
            </div>
            <a href="https://onepiece.fandom.com/wiki/Monkey_D._Luffy" className="text-container">
              <p className="profile-name">Monkey D. Luffy</p>
              <p><button onClick={window.open('http://www.google.com')} className="add-friend">Add Friend</button></p>
            </a>
          </div>
          <div className="profile-card">
            <div className="img-container">
              <img src="../src/assets/luffy.jpeg" alt="luffy.jpeg" className="profile-img"/>
            </div>
            <a href="https://onepiece.fandom.com/wiki/Monkey_D._Luffy" className="text-container">
              <p className="profile-name">Monkey D. Luffy</p>
              <p><button onClick={window.open('http://www.google.com')} className="add-friend">Add Friend</button></p>
            </a>
          </div>
          <div className="profile-card">
            <div className="img-container">
              <img src="../src/assets/luffy.jpeg" alt="luffy.jpeg" className="profile-img"/>
            </div>
            <a href="https://onepiece.fandom.com/wiki/Monkey_D._Luffy" className="text-container">
              <p className="profile-name">Monkey D. Luffy</p>
              <p><button onClick={window.open('http://www.google.com')} className="add-friend">Add Friend</button></p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserRecommend;