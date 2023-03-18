import React, { useState, useEffect } from 'react';
import "./SpotifyApiCalls.css"


const currentTrackendpoint = 'https://api.spotify.com/v1/me/player/currently-playing';
export const CurrentTrack = () => {

  const [trackName, setTrackName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [artistName, setArtistName] = useState('');
  const [albumName, setAlbumName] = useState('');

  useEffect(() => {
    let accessToken = localStorage.getItem('accessToken');
    console.log('on api page: '+accessToken)
    const getTrack = async () => {
      const response = await fetch(currentTrackendpoint, {
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      });
      const data = await response.json();
      setTrackName(data.item.name);
      setImageUrl(data.item.album.images[0].url);
      setArtistName(data.item.artists[0].name);
      setAlbumName(data.item.album.name);
    };
    getTrack();
    // auto-update current-track for every 5sec
    const interval = setInterval(() => {
      getTrack();
    }, 5000); // call getTrack every 10 seconds
  }, []);

  return (
    <div>
      <img className='currTrackImg' src={imageUrl} alt={trackName} />
      <p className='currTrackName'>{trackName}</p>
      <div className="currTrackDesc">
        <p>Album: {albumName}</p>
        <p>Artist: {artistName}</p>
      </div>
    </div>
  );
};