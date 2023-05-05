import React, { useState, useEffect } from 'react';
import { db} from "../../Firebase";
import { refreshAccessToken } from "../pages/config";
import { groupBy, maxBy } from 'lodash';
import { Link } from 'react-router-dom';

import { 
    collection,
    where,
    query,
    orderBy,
    getDocs } from "firebase/firestore";

const currentUserDataEndPoint = 'https://api.spotify.com/v1/me';
const userProfileEndPoint = 'https://api.spotify.com/v1/users';

let ChatList =  () => {
    let [userId, setUserId] = useState("");
    let [chatList, setChatList] = useState([]);
    let userIdStore = "";
    
    const messagesRef = collection(db, "messages");

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
            getUserChats()
        }
        };
        getUserData();

        const getUserChats = async () => {
            const queryMessages1 = query(
                messagesRef,
                where("from", "==", userIdStore),
                orderBy("createdAt")
            );
            const queryMessages2 = query(
                messagesRef,
                where("to", "==", userIdStore),
                orderBy("createdAt")
            );
            const querySnapshot1 = await getDocs(queryMessages1);
            const messages1 = querySnapshot1.docs.map((doc) => {
                    return {...doc.data(), id: doc.id }
            });
            const querySnapshot2 = await getDocs(queryMessages2);
            const messages2 = querySnapshot2.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
            });
            
            const messages = [...messages1, ...messages2];
            const groups = groupBy(messages, message => {
                const otherUserId =  message.from === userIdStore
                           ? message.to
                           : message.from;
                return otherUserId;
            });
            const latestMessages = Object.values(groups).map(group => {
                const latestMessage = maxBy(group, 'createdAt');
                return latestMessage;
            });
            setChatList(latestMessages);
        }
    }, []);

    return (
        <div>
                {chatList.map((message) => (
                    <ChatPreview key={message.id} message={message} userId={userId} />
                ))}
        </div>
    );
}

function ChatPreview({ message , userId }) {
    const {id, from , to, text , createdAt} = message;
    const [profilePictureUrl, setProfilePictureUrl] = useState(''); 
    const [displayName, setDisplayName] = useState(''); 
    const otherUserId = userId === from ? to : from;
    
    useEffect(() => {
        let accessToken = localStorage.getItem('accessToken');

        const getUserData = async () => {
            const response = await fetch(userProfileEndPoint+ '/' + otherUserId, {
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
    }, []);

    const data = {
        userId : userId,
        otherUserId : otherUserId,
        userName: displayName,
    }
    
    return (
        <Link to="/chatview" state={data}>
            <img src={profilePictureUrl} alt={displayName} />
            <div>
                <h2>{displayName}</h2>
                <p>{text}</p>
                <p>{createdAt.toDate().toString()}</p>
            </div>
        </Link>
    )
}

export default ChatList