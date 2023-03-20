import { useState, useEffect } from "react";
import "./SongRecommend.css"


const currentTrackEndpoint = 'https://api.spotify.com/v1/me/player/currently-playing';
const recommendationEndPoint = 'https://api.spotify.com/v1/recommendations?limit=12&seed_tracks='

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
        {recommendations.map((track) => (
          <li key={track.id} className="recomTile">
            <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
            <img src={track.album.images[0].url} alt={track.album.name} />
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