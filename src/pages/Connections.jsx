import React, { useState, useEffect } from 'react';
import { db, RealtimeDatabase } from "../../Firebase";
import { refreshAccessToken } from "../pages/config";
import { Link } from 'react-router-dom';
import { ref, onValue} from "firebase/database";
import { 
    collection,
    or,
    and,
    where,
    query,
    getDocs } from "firebase/firestore";

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
        <div>
                {connectionList.map((connection) => (
                   (<div key={connection.id} >
                       <ConnectionPreview userId={connection.userId} logedInUser = {userId}/>
                    </div>)
                ))}
        </div>
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
            setProfilePictureUrl(data.images[0].url);
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
        <Link to={'/profile/'  + userId}>
            <img src={profilePictureUrl} alt={userId} />
            <h2>{displayName}</h2>
        </Link>
        <Link to="/chatview" state={data}>
            chat
        </Link>
        </>
    )
}
export default Connections
