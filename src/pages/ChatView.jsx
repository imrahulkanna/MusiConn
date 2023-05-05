import React, { useState, useEffect } from "react";
import { db } from  "../../Firebase";
import { useLocation } from "react-router-dom"

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
        <h1>chatting with {userName.toUpperCase()}</h1>
      </div>
      <div>
        {messages.map((message) => (
          <div key={message.id} >
            <span className="user">{message.from}:</span> {message.text} {message.createdAt.toDate().toLocaleTimeString()}  {message.createdAt.toDate().toLocaleDateString()}
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