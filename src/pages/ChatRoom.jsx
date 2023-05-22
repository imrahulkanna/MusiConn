import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NavBar } from "../api_calls/NavBar.jsx";
import { collection, doc, getDocs, addDoc, serverTimestamp, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { db } from "../../Firebase";
import './ChatRoom.css'


const ChatRoom = () => {
  const location = useLocation();
  const trackdata = location.state;
  const roomID = trackdata.trackID;
  const userId = trackdata.userID

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatroomsRef = collection(db,'chatrooms');

  useEffect(() => {
    const queryMessages = query(
      chatroomsRef,
      where("roomID", "==", roomID), orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsuscribe();
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(newMessage === "") return;

    const msgeData = {
      text : newMessage,
      createdAt : serverTimestamp(),
      userID : trackdata.userID,
      user : trackdata.userName,
      roomID : trackdata.trackID
    } ;

    await addDoc(chatroomsRef,msgeData);

    setNewMessage('');
  };

  const [color, setColor] = useState("#000000");

  useEffect(() => {
    // Array containing colors
    const colors = [
      "violet",
      "yellow",
      "greenyellow",
      "skyblue",
      "wheat",
      "lightsalmon",
      "lightsteelblue",
    ];

    // selecting random color
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    setColor(randomColor);
  }, []);


  return (
    <div className="App">
      <NavBar />
      <div className="chat-app-room">
        <div className="header-room">
          <h1>Track: {trackdata.trackName.toUpperCase()}</h1>
        </div>
        <section>
          <div className="messages-room">
            {messages.map((message) => (
              <div key={message.id} className="message-room">
                <div className="user-room" style={{ color }}>
                  {message.user}
                </div>
                <div className="message-text-room">{message.text}</div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="new-message-form-room">
            <input
              className="new-message-input-room"
              placeholder="Type a message"
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            />
            <button type="submit" className="send-button-room">
              Send
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default ChatRoom;
