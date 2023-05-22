import React, { useState, useEffect } from 'react';
import { db} from "../../Firebase";
import { refreshAccessToken } from "../pages/config";
import { groupBy, maxBy } from 'lodash';
import { Link } from 'react-router-dom';
import './ChatList.css'
import { 
    collection,
    or,
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
            const queryMessages = query(
                messagesRef,
                or(
                where("from", "==", userIdStore),
                where("to", "==", userIdStore)
                ),
                orderBy("createdAt")
            );
            
            const querySnapshot = await getDocs(queryMessages);
            const messages = querySnapshot.docs.map((doc) => {
                    return {...doc.data(), id: doc.id }
            });

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
        <a href="/chatview" class="chat-container" state={data}>            
            <img src={profilePictureUrl} alt={displayName} />
            <div>
                <h2>{displayName}</h2>
                <p>{text}</p>
                <p>{createdAt?.toDate().toLocaleTimeString([], { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute:'2-digit', hour12: true})}</p>
            </div>
        </a>
        </Link>
        
    )
}

export default ChatList