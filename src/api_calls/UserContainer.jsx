import "./UserContainer.css";
import { getDatabase, ref, child, get, onValue} from "firebase/database";
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

// const userId = localStorage.getItem('userId');

// const dbRef = ref(getDatabase());
const dbRef = getDatabase();

const UserContainer = () => {
    const {userId}= useParams();
    // console.log(userId);
    const [userProfile, setUserProfile] = useState(null);
    const [followingCount, setFollowingCount] = useState(null);


useEffect(() => {
    const userProfileRef = ref(dbRef, `users/${userId}/userProfile`);
    const followingCountRef = ref(dbRef, `users/${userId}/followedArtists/artists/total`);

    // Read user-profile data once
    onValue(userProfileRef, (snapshot) => {
        if (snapshot.exists()) {
    //   const userProfile = snapshot.val();
      setUserProfile(snapshot.val());
      console.log(userProfile);
    } else {
              console.log("No data available");
            }
      // Update component state
   
    });

    // Read followingCount data once
        onValue(followingCountRef, (snapshot) => {
        if (snapshot.exists()) {
        // const followingCount = snapshot.val();
        setFollowingCount(snapshot.val());
      console.log(followingCount);
    } else {
        console.log("No data available");
      }
      // Update component state
    
    });
  }, []);

// console.log(userProfile);
// console.log(followingCount);

if (userProfile === null || followingCount === null) {
    return (<div><h2>Loading...</h2></div>);
  }
    return (
        <div className="userContain">
            <img className="profilePic" src={userProfile.images[0].url} alt="profile" />
            <a href={userProfile.external_urls.spotify}><h1 className="userName">{userProfile.display_name}</h1></a>
            <div className="userStats" >
      <p className="followingCount" ><span className="statCount">{followingCount}</span><br/>Following</p>
      <p className="followersCount" > <span className="statCount">{userProfile.followers.total}</span><br/>Followers</p>
      </div>
      <button className='spotifyLogin'> MESSAGE</button>
        </div>
    );

};


export default UserContainer;