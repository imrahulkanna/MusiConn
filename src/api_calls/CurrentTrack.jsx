import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { refreshAccessToken } from "../pages/config";
import "./CurrentTrack.css";

import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db, RealtimeDatabase } from "../../Firebase";
import { ref, set } from "firebase/database";

const currentTrackEndpoint =
  "https://api.spotify.com/v1/me/player/currently-playing";
const currUserProfileEndpoint = "https://api.spotify.com/v1/me";

export let CurrentTrack = () => {
  const [userID, setUserID] = useState("");
  const [userName, setUserName] = useState("");
  const [trackID, setTrackID] = useState("");
  const [trackName, setTrackName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [artistName, setArtistName] = useState("");
  const [albumName, setAlbumName] = useState("");

  useEffect(() => {
    let accessToken = localStorage.getItem("accessToken");
    // console.log('on api page: '+accessToken)
    const getTrack = async () => {
      const response = await fetch(currentTrackEndpoint, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      if (response.status === 401) {
        refreshAccessToken();
        accessToken = localStorage.getItem("accessToken");
        await getTrack();
      }
      const data = await response.json();
      setTrackID(data.item.id);
      setTrackName(data.item.name);
      setImageUrl(data.item.album.images[0].url);
      setArtistName(data.item.artists[0].name);
      setAlbumName(data.item.album.name);
    };
    getTrack();

    const getCurrUserProfile = async () => {
      const response = await fetch(currUserProfileEndpoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (response.status === 401) {
        refreshAccessToken();
        accessToken = localStorage.getItem("accessToken");
        await getCurrUserProfile();
      }
      const currUserDetails = await response.json();

      setUserID(currUserDetails.id);
      setUserName(currUserDetails.display_name); // to get recommeneded users' IDs for current user
    };

    getCurrUserProfile();
    // FireStoreWrite will happend once after getTrack()
    // FireStoreWrite();

    // auto-update current-track for every 1.5sec
    const interval = setInterval(() => {
      getTrack();
    }, 1500); // call getTrack every 1.5 seconds
    return () => clearInterval(interval); // clear interval on unmount
  }, []);

  const trackdata = {
    trackID: trackID,
    trackName: trackName,
    userID: userID,
    userName: userName,
  };

  return (
    <div className="mainComponent">
      <h1 className="trackHeader">Current Track</h1>
      <img className="currTrackImg" src={imageUrl} alt={trackName} />
      <p className="currTrackName">{trackName}</p>
      <div className="currTrackDesc">
        <p className="currTrackAlbum">Album: {albumName}</p>
        <p className="currTrackArtists">Artists: {artistName}</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Link to="/chatroom" state={trackdata}>
          <button style={{marginRight:'15px'}}>Join Chat Room</button>
        </Link>
        <Link to="/trackrecommendations" >
          <button style={{marginLeftt:'15px'}}>Similar Tracks</button>
        </Link>
      </div>
    </div>
  );
};
