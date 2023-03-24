import React, { useState, useEffect } from 'react';
import "./CurrentTrack.css";

import { collection, getDocs, doc, setDoc} from "firebase/firestore"; 
import { db } from "../../Firebase";

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
    // FireStoreWrite will happend once after getTrack()
    FireStoreWrite();
    
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

// *** Below Code will run whenver user LogsIn ***
// code for updating fireBase FireStorage {userId->(accessToken, refreshToken)}

let FireStoreWrite =async () =>{
let accessToken = localStorage.getItem('accessToken');
let refreshToken = localStorage.getItem('refreshToken');
// console.log(accessToken);
// console.log(refreshToken);
  const getCurrentUserId = async (accessToken) => {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    });
    const data = await response.json();
    
    return [data.id, data.email];
  }
  
  const userData = await getCurrentUserId(accessToken);
  const userId= userData[0];
  const emailId= userData[1];
  console.log(userId);
  console.log(emailId);




  const collectionRef = collection(db, "users");
  const documentsSnapshot = await getDocs(collectionRef);
  const documentsData = [];
  documentsSnapshot.forEach((doc) => {
    documentsData.push({ id: doc.id, ...doc.data() });
  });

// console.log("users");
console.log(documentsData);


async function storeTokens(userId, accessToken, refreshToken) {
  const userDocRef = doc(collection(db, 'users'), userId.toString());
  const userDocData = {
    access_token: accessToken,
    refresh_token: refreshToken,
    email_id: emailId
  };

  await setDoc(userDocRef, userDocData);
  console.log("Document written with ID: ", userId);

}

await  storeTokens(userId, accessToken, refreshToken)

};

