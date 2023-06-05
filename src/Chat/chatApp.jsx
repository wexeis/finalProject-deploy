import "./chatApp.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
import emailjs from "@emailjs/browser";

const socket = io.connect("https://chat-app-be-ok82.onrender.com");

function ChatApp() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
      sendEmail(username, room); // Send email when joining the room
    }
  };

  const sendEmail = (username, room) => {
    emailjs
      .send(
        "service_coce8xl",
        "template_5bzux3c",
        {
          to_name: "Recipient Name",
          from_name: "Your Name",
          message: `${username} has joined the room ${room}`,
        },
        "vc73VhKacIqDN15XG"
      )
      .then(
        (response) => {
          console.log("Email sent successfully!", response.status, response.text);
        },
        (error) => {
          console.error("Error sending email:", error);
        }
      );
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="subject..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join </button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default ChatApp;
