import "./TopTracksContainer.css";
import { getDatabase, ref, child, get, onValue } from "firebase/database";
import React, { useState, useEffect } from 'react';
// const userId = localStorage.getItem('userId');
import { useParams } from "react-router-dom";
const dbRef = getDatabase();
const accessToken = localStorage.getItem('accessToken');



const TopTracksContainer = () => {
    const {userId}= useParams();
    const [topTracks, setTopTracks] = useState(null);

    useEffect(() => {
        const topTracksRef = ref(dbRef, `users/${userId}/topTracksMedium`);
          // Read followingCount data once
          onValue(topTracksRef, (snapshot) => {
            if (snapshot.exists()) {
            // const followingCount = snapshot.val();
            setTopTracks(snapshot.val());
          console.log(topTracks);
        } else {
            console.log("No data available");
          }
          // Update component state
        
        });
      }, []);
      console.log(topTracks);

    
    return (
        <div className="topTracksContainer">
             <h3>Top Tracks of All Time</h3>
             <div className="tracksList">
             {topTracks && topTracks.slice(0, 12).map((track, index) => (
               <a href={track.external_urls.spotify}>
                    <div className="track" key={index}>
                        <img src={track.album.images? track.album.images[0].url:"/public/luffy.jpeg"} alt={track.name} />
                        <div className="trackInfo">
                        <p className="trackName">{track.name}</p>
                        <div className="artistNames">
                        {track.artists.map( (artist,index2)=>(
                          <p key={index2}>{artist.name} &nbsp;&nbsp;&nbsp;</p>
                        ) )}</div>
                        </div>
                    </div>
                    </a>
                ))}
             </div>

        </div>
    );
};

export default TopTracksContainer;