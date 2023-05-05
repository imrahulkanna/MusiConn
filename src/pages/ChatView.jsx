import React, { useState, useEffect } from "react";
import { db } from  "../../Firebase";
import { useLocation } from "react-router-dom"
import "./ChatView.css"

import {
  collection,
  addDoc,
  where,
  or,
  and,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";


const ChatView = (props) => {
  const location  = useLocation();
  const data = location.state;
  const userId = data.userId;
  const otherUserId = data.otherUserId;
  const userName = data.userName
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      or(
       and ( where("from", "==", userId), where("to", "==", otherUserId) ),
       and ( where("from", "==", otherUserId), where("to", "==", userId), )
      )
      ,
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      from: userId,
      to: otherUserId,
    });

    setNewMessage("");
  };

  return (
    <div>
      <div>
        <h1 className="chatHeader">@{userName.toUpperCase()}</h1>
      </div>
      <div className="messageBox" >
        {messages.map((message) => (
          <div className={`message ${message.from=== userId ? "sent" : "received"}`} key={message.id} >
            <span className="user">{message.from=== userId ? "You" :  `${userName}` }</span><br /> <span className="textBody">{message.text}</span><br /> <span className="textTime">{message.createdAt?.toDate().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true})}  {(message.createdAt?.toDate().toLocaleDateString() != (new Date().toLocaleDateString()))?message.createdAt?.toDate().toLocaleDateString():""}<br /><br /> </span> 
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          placeholder="Type your message here..."
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatView