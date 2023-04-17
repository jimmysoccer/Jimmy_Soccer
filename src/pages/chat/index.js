import { useEffect, useState } from "react";
import "./index.css";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:3001";
const socket = io.connect(ENDPOINT);

export default function Chat() {
  //Room State
  const [room, setRoom] = useState("");

  // Messages States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState([]);

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
    // setMessageReceived(...messageReceived, message);
    setMessageReceived((prev) => [...prev, message]);
  };

  function disconnect() {
    socket.on("disconnect", () => {
      console.log("disconnected");
    });
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived((prev) => [...prev, data.message]);
      console.log("message received", messageReceived);
    });
  }, [socket]);

  return (
    <div
      className="main-content"
      style={{
        justifyContent: "center",
      }}
    >
      <div className="login">
        <text>Room Number:</text>
        <input
          onChange={(e) => {
            setRoom(e.target.value);
          }}
          style={{ width: "40%" }}
        ></input>
        <button onClick={joinRoom()}>Join</button>
      </div>
      <textarea
        className="chat-content"
        placeholder="message"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      ></textarea>
      <button className="chat-send" onClick={sendMessage}>
        Send
      </button>
      <button className="chat-send" onClick={disconnect}>
        Disconnect
      </button>
      <div
        className="main-container"
        style={{ width: "100%", padding: "10px" }}
      >
        {messageReceived.map((item, index) => {
          return <div key={index}>{item}</div>;
        })}
      </div>
    </div>
  );
}
