import "./ArtistContainer.css";
import { getDatabase, ref, child, get, onValue } from "firebase/database";
import luffyPic from "../assets/luffy.jpeg";
import React, { useState, useEffect } from 'react';
// const userId = localStorage.getItem('userId');
import { useParams } from "react-router-dom";
const dbRef = getDatabase();



const ArtistContainer = () => {
    const {userId}= useParams();
    const [topArtists, setTopArtists] = useState(null);

    useEffect(() => {
        const topArtistsRef = ref(dbRef, `users/${userId}/topArtistsMedium`);
          // Read followingCount data once
          onValue(topArtistsRef, (snapshot) => {
            if (snapshot.exists()) {
            // const followingCount = snapshot.val();
            setTopArtists(snapshot.val());
          console.log(topArtists);
        } else {
            console.log("No data available");
          }
          // Update component state
        
        });
      }, []);
    //   console.log(topArtists);

    
    return (
        <div className="topArtistsContainer">
             <h3>Top Artists of All Time</h3>
             <div className="artistList">
             {topArtists && topArtists.slice(0, 13).map((artist, index) => (
                <a href={artist.external_urls.spotify}>
                    <div className="artist" key={index}>
                        <img  src={artist.images? artist.images[0].url: luffyPic} alt={artist.name} />
                        <p>{artist.name}</p>
                    </div>
                </a>
                    
                ))}
             </div>

        </div>
    );
};
export default ArtistContainer;