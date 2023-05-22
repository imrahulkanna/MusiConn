import "./UserContainer.css";
import { getDatabase, ref, child, get, onValue} from "firebase/database";
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { db } from "../../Firebase";

import { 
  collection,
  or,
  and,
  where,
  query,
  getDocs } from "firebase/firestore";

// const userId = localStorage.getItem('userId');

// const dbRef = ref(getDatabase());
const dbRef = getDatabase();
const connectionsRef = collection(db, "connections");


const UserContainer = () => {
    const {userId}= useParams();
    // console.log(userId);
    const [userProfile, setUserProfile] = useState(null);
    // const [followingCount, setFollowingCount] = useState(null);
    const [connectionsCount, setConnectionsCount] = useState(0);

useEffect(() => {
    const userProfileRef = ref(dbRef, `users/${userId}/userProfile`);
    // const followingCountRef = ref(dbRef, `users/${userId}/followedArtists/artists/total`);
    const fetchConnectionsCount = async () => {
      try {
        const count = await getUserConnectionsCount(userId);
        setConnectionsCount(count);
      } catch (error) {
        console.error("Error fetching connections count:", error);
      }
    };

    fetchConnectionsCount();
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
        // onValue(followingCountRef, (snapshot) => {
        // if (snapshot.exists()) {
        // const followingCount = snapshot.val();
        // setFollowingCount(snapshot.val());
      // console.log(followingCount);
    // } else {
        // console.log("No data available");
      // }
      // Update component state
    
    // });
  }, []);

// console.log(userProfile);
// console.log(followingCount);

if (userProfile === null) {
    return (<div><h2>Loading...</h2></div>);
  }
    return (
        <div className="userContain">
            <img className="profilePic" src={ userProfile.images? userProfile.images[0].url : getAvatarUrl(userProfile.id)} alt="profile" />
            <a href={userProfile.external_urls.spotify}><h1 className="userName">{userProfile.display_name}</h1></a>
            <div className="userStats" >
      {/* <p className="followingCount" ><span className="statCount">{followingCount}</span><br/>Following</p>
      <p className="followersCount" > <span className="statCount">{userProfile.followers.total}</span><br/>Followers</p> */}
      <p className="followersCount" > <span className="statCount">{connectionsCount == null?0:connectionsCount}</span><br/>Connections</p>
      </div>
      <button className='spotifyLogin'> MESSAGE</button>
        </div>
    );

};
const getAvatarUrl = (userId) => {
  const apiBaseUrl = 'https://avatars.dicebear.com/api/';
  const avatarStyle = 'male'; // or 'female' for different styles
  const avatarOptions = 'mood[]=happy'; // customize options as needed
  const avatarSize = 200;

  const avatarUrl = `${apiBaseUrl}${avatarStyle}/${userId}.svg?${avatarOptions}`;

  return avatarUrl;
};

const getUserConnectionsCount = async (userId) => {
  const queryConnection = query(
      connectionsRef,
      and(
      or(
      where("from", "==", userId),
      where("to", "==", userId)
      ),
      where("status", "==", "accept")
      )
  );
  
  const querySnapshot = await getDocs(queryConnection);
  const connections = querySnapshot.docs.map((doc) => {
          return {userId : doc.data().from == userId ? doc.data().to : doc.data().from
                , id: doc.id }
  });

  
  return connections.length;
}


export default UserContainer;