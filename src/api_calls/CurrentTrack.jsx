import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { refreshAccessToken } from "../pages/config";
import "./CurrentTrack.css";

import { collection, getDocs, doc, setDoc} from "firebase/firestore"; 
import { db, RealtimeDatabase} from "../../Firebase";
import { ref, set } from "firebase/database";


const currentTrackEndpoint = 'https://api.spotify.com/v1/me/player/currently-playing';

export let CurrentTrack = () => {
  const [trackName, setTrackName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [artistName, setArtistName] = useState('');
  const [albumName, setAlbumName] = useState('');

  useEffect(() => {
    let accessToken = localStorage.getItem('accessToken');
    // console.log('on api page: '+accessToken)
    const getTrack = async () => {
      const response = await fetch(currentTrackEndpoint, {
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      });
      if (response.status === 401) {
        refreshAccessToken();
        accessToken = localStorage.getItem('accessToken');
        await getTrack();
      }
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
      <h1 className="trackHeader">Current Track</h1>
      <img className="currTrackImg" src={imageUrl} alt={trackName} />
      <p className="currTrackName">{trackName}</p>
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
  // console.log(userId);
  // console.log(emailId);

  const userProfileFn = async (accessToken) => {
    const response2 = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    });
    const data2 = await response2.json();
    
    return data2;
  }
  
  const userProfile = await userProfileFn(accessToken);

  const getFollowedArtists = async (accessToken) => {
    const response3 = await fetch("https://api.spotify.com/v1/me/following?type=artist&limit=50", {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    });
    const data3 = await response3.json();
    
    return data3;
  }
  
  const userFollows = await getFollowedArtists(accessToken);
  

const getSavedTracksFn = async (accessToken) => {
  const response4 = await fetch('https://api.spotify.com/v1/me/tracks', {
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  });
  const data4 = await response4.json();
  
  return data4;
}

const savedTracks = await getSavedTracksFn(accessToken);


const getCurrentTracksFn = async (accessToken) => {
  const response5 = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  });
  const data5 = await response5.json();
  
  return data5;
}

 const currTrack = await getCurrentTracksFn(accessToken);

  const collectionRef = collection(db, "users");
  const documentsSnapshot = await getDocs(collectionRef);
  const documentsData = [];
  documentsSnapshot.forEach((doc) => {
    documentsData.push({ id: doc.id, ...doc.data() });

  });

  async function getUserTop(type, timeRange, limit, accessToken) {
    const url = `https://api.spotify.com/v1/me/top/${type}?time_range=${timeRange}&limit=${limit}`;
    const response6 = await fetch(url, {
      headers: {
        'Authorization': 'Bearer '+ accessToken
      }
    });
    const data6= await response6.json();
    return data6.items;
  }
  const topTracks = await getUserTop('tracks', 'short_term', 10, accessToken);
const topArtists = await getUserTop('artists', 'long_term', 5, accessToken);

// console.log("users");
// console.log(documentsData);


async function storeTokens(userId, accessToken, refreshToken) {
  const userDocRef = doc(collection(db, 'users'), userId.toString());
  const userDocData = {
    access_token: accessToken,
    refresh_token: refreshToken,
    email_id: emailId
  };

  await setDoc(userDocRef, userDocData);
  console.log("Document written with ID: ", userId);

   // Store the user ID in the Realtime Database
   set(ref(RealtimeDatabase,'users/' + userId),
   {
     email: emailId,
     currentTrack: currTrack,
     userProfile: userProfile,
     followedArtists: userFollows,
     savedTracks: savedTracks,
     topTracks: topTracks,
     topArtists: topArtists

   }).then(() => {
     console.log('User data stored successfully');
    //  console.log(userProfile.images[0].url);
   }).catch((error) => {
     console.log('Error storing user data: ', error);
   });

}

await  storeTokens(userId, accessToken, refreshToken)


};
