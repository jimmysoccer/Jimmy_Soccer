import { useEffect, useState } from "react";
import "./index.css";
import io from "socket.io-client";

const ENDPOINT = "chat.uucircle.com";
// const ENDPOINT = "localhost:3001";

export default function Chat() {
  //socket connection
  const [socket, setSocket] = useState(null);
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
    setMessageReceived((prev) => [
      ...prev,
      { direction: "send", message: message },
    ]);
  };

  function disconnect() {
    socket.disconnect();
  }

  useEffect(() => {
    if (socket === null) {
      setSocket(io(ENDPOINT));
    }
    if (socket) {
      socket.on("connect", () => {
        console.log("connected");
      });
      socket.on("receive_message", (data) => {
        setMessageReceived((prev) => [
          ...prev,
          { direction: "receive", message: data.message },
        ]);
      });
    }
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
      <button
        className="chat-send"
        onClick={() => {
          setMessageReceived([]);
        }}
      >
        Clear all messages
      </button>
      <div
        className="main-container"
        style={{ width: "100%", padding: "10px", overflow: "scroll" }}
      >
        {messageReceived.map((item, index) => {
          return (
            <div key={index}>
              {item.direction === "send" ? "Me: " : "He/She: "}
              {item.message}
            </div>
          );
        })}
      </div>
    </div>
  );
}
