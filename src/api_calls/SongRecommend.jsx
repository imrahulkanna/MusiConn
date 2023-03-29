import { useState, useEffect } from "react";
import "./SongRecommend.css"
import spotifyLogo from '../assets/spotify.svg';

const currentTrackEndpoint = 'https://api.spotify.com/v1/me/player/currently-playing';
const recommendationEndPoint = 'https://api.spotify.com/v1/recommendations?limit=20&seed_tracks='

function Image({name, data}) {
  var i=0;
  for(i=0;i<data.length;i++) {
    if(typeof (data[i].url) !== "undefined") {
      return <img src={data[i].url} alt={name} />
    }
  }

  return <img src={spotifyLogo} alt={name} />
}

export const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const getCurrentTrack = async () => {
      // Get the user's currently playing track
      const currentTrackResponse = await fetch(currentTrackEndpoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      const currentTrackData = await currentTrackResponse.json();

      // Get recommendations based on the user's currently playing track
      const recommendationsResponse = await fetch(recommendationEndPoint+currentTrackData.item.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      const recommendationsData = await recommendationsResponse.json();

      // Set the state with the recommended tracks
      setRecommendations(recommendationsData.tracks);
    };

    getCurrentTrack();
    
  }, []);

  return (
    <div>
      <h1 className="recomTitle">Recommended Songs</h1>
      <ul>
        <div className="recomContainer">
        {recommendations.map((track,index) => (
          <li key={index} className="recomTile">
            <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
            <Image data = {track.album.images} name = {track.name} />
            <div>
              <p>{track.name}</p>
              <p>{track.artists[0].name}</p>
            </div>
            </a>
          </li>
        ))}
        </div>
      </ul>
    </div>
  );
};