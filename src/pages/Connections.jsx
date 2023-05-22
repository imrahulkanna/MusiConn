import React, { useState, useEffect } from 'react';
import { db, RealtimeDatabase } from "../../Firebase";
import { refreshAccessToken } from "../pages/config";
import { Link } from 'react-router-dom';
import { NavBar } from '../api_calls/NavBar';   
import { 
    collection,
    or,
    and,
    where,
    query,
    getDocs } from "firebase/firestore";
import './Connections.css'
const currentUserDataEndPoint = 'https://api.spotify.com/v1/me';
const userProfileEndPoint = 'https://api.spotify.com/v1/users';

let Connections =  () => {
    let [userId, setUserId] = useState("");
    let [connectionList, setConnectionList] = useState([]);
    let userIdStore = "";

    const connectionsRef = collection(db, "connections");

    useEffect(() => {
        let accessToken = localStorage.getItem('accessToken');
        
        const getUserData = async () => {
        const response = await fetch(currentUserDataEndPoint, {
            headers: {
            'Authorization': 'Bearer ' + accessToken
            }
        });
        if (response.status === 401) {
            refreshAccessToken();
            accessToken = localStorage.getItem('accessToken');
            await getUserData();
        }
        else{
            const data = await response.json();
            setUserId(data.id);
            userIdStore = data.id;
            console.log(userIdStore);
            getUserConnections();
        }
        };
        getUserData();

        const getUserConnections = async () => {
            const queryConnection = query(
                connectionsRef,
                and(
                or(
                where("from", "==", userIdStore),
                where("to", "==", userIdStore)
                ),
                where("status", "==", "accept")
                )
            );
            
            const querySnapshot = await getDocs(queryConnection);
            const connections = querySnapshot.docs.map((doc) => {
                    return {userId : doc.data().from == userIdStore ? doc.data().to : doc.data().from
                          , id: doc.id }
            });

            setConnectionList(connections);
        }
    }, []);

    return (
        <>
        <NavBar/>
        <h1 className="connection-heading">My Connections</h1> 
        <div className="connections-card-container">
            {connectionList.map((connection) => (
                (<div key={connection.id} className="connections-card">
                    <ConnectionPreview userId={connection.userId} logedInUser={userId} />
                </div>)
            ))}
        </div>
        </>
    );
}

function ConnectionPreview({ userId, logedInUser })
{
    const [profilePictureUrl, setProfilePictureUrl] = useState(''); 
    const [displayName, setDisplayName] = useState(''); 

    useEffect(() => {
        let accessToken = localStorage.getItem('accessToken');

        const getUserData = async () => {
            const response = await fetch(userProfileEndPoint+ '/' + userId, {
                headers: {
                'Authorization': 'Bearer ' + accessToken
                }
            });
            if (response.status === 401) {
                refreshAccessToken();
                accessToken = localStorage.getItem('accessToken');
                await getUserData();
            }
            const data = await response.json();
            const imgUrl = data.images.length > 0
                        ? data.images[0].url
                        :getAvatarUrl(data.id);
            setProfilePictureUrl(imgUrl);
            setDisplayName(data.display_name);
        };
            getUserData();
    },[]);

    const data = {
        userId : logedInUser,
        otherUserId : userId,
        userName: displayName,
    }

    return (
        <>
        <div className="profile-card">
        <Link to={'/profile/'  + userId} className="profile-link">
            <img src={profilePictureUrl} alt={userId} className="profile-photo"/>
            <h2 className="profile-name">{displayName}</h2>
        </Link>
        <Link to="/chatview" state={data}  className="connections-button">
            Chat
        </Link>
        </div>
        </>
    )
}

const getAvatarUrl = (userId) => {
    const apiBaseUrl = 'https://avatars.dicebear.com/api/';
    const avatarStyle = 'male'; // or 'female' for different styles
    const avatarOptions = 'mood[]=happy'; // customize options as needed
    const avatarSize = 200;
  
    const avatarUrl = `${apiBaseUrl}${avatarStyle}/${userId}.svg?${avatarOptions}`;
  
    return avatarUrl;
 };

export default Connections
