import React, { useState, useEffect } from 'react';
import "./CurrentTrack.css";


const currentTrackEndpoint = 'https://api.spotify.com/v1/me/player/currently-playing';

export let CurrentTrack = () => {
  const [trackName, setTrackName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [artistName, setArtistName] = useState('');
  const [albumName, setAlbumName] = useState('');

  useEffect(() => {
    let accessToken = localStorage.getItem('accessToken');
    console.log('on api page: '+accessToken)
    const getTrack = async () => {
      const response = await fetch(currentTrackEndpoint, {
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
    // auto-update current-track for every 1.5sec
    const interval = setInterval(() => {
      getTrack();
    }, 1500); // call getTrack every 1.5 seconds
    return () => clearInterval(interval); // clear interval on unmount
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