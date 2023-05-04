import { useEffect, useId, useState } from "react";
import "./index.css";
import io from "socket.io-client";

const ENDPOINT = "https://chat.uucircle.com";
// const ENDPOINT = "localhost:3001";
const socket = io(ENDPOINT, { autoConnect: false });

export default function Chat() {
  const [loginStatus, setLoginStatus] = useState(false);

  //Room State
  const [userName, setUserName] = useState("");
  const [friend, setFriend] = useState([]);
  const [friendSelected, setFriendSelected] = useState(""); //socket userID

  // Messages States
  const [message, setMessage] = useState("");

  //check if localStorage has info
  useEffect(() => {
    // const sessionID = localStorage.getItem("sessionID");
    // if (sessionID) {
    //   socket.auth = { sessionID };
    //   socket.connect();
    //   setLoginStatus(true);
    //   console.log("trying to auto connect my local storage session ID");
    // }
  }, []);

  socket.onAny((e, ...args) => {
    // console.log(e, args);
  });

  socket.on("connect_error", (err) => {
    setLoginStatus(false);
  });

  socket.on("session", ({ sessionID, userID }) => {
    // attach the session ID to the next reconnection attempts
    socket.auth = { sessionID };
    // store it in the localStorage
    localStorage.setItem("sessionID", sessionID);
    // save the ID of the user
    socket.userID = userID;
  });

  //first fetch all users list
  socket.on("users", (users) => {
    console.log("socket users");
    let temp = users;
    for (let i = 0; i < temp.length; i++) {
      temp[i].history = [];
      temp[i].connected = true;
    }
    setFriend(temp);
  });

  //when a new user is online
  socket.on("user connected", (user) => {
    console.log("socket user connected");
    if (!friend.some((e) => user.userID === e.userID)) {
      let arr = [...friend];
      let temp = user;
      temp.history = [];
      temp.connected = true;
      arr.push(temp);
      setFriend(arr);
    }
  });

  socket.on("user disconnected", (data) => {
    console.log("disconnect", data);
    for (let i = 0; i < friend.length; i++) {
      if (friend[i].userID === data.userID) {
        let arr = [...friend];
        arr[i].connected = false;
        setFriend(arr);
      }
    }
  });

  socket.off("private message").on("private message", ({ content, from }) => {
    console.log("socket private message", "from", from, "to", userName);
    for (let i = 0; i < friend.length; i++) {
      if (friend[i].userID === from) {
        let arr = [...friend];
        arr[i].history.push({ from: from, message: content });
        setFriend(arr);
      }
    }
  });

  function sendMessage(message) {
    if (friendSelected !== "") {
      console.log("send message", friendSelected);
      socket.emit("private message", {
        content: message,
        to: friendSelected,
      });
      let index = friend.findIndex((a) => a.userID === friendSelected);
      let arr = [...friend];
      arr[index].history.push({ from: userName, message: message });
      setFriend(arr);
    }
  }

  function sendText(message) {
    return (
      <div style={{ display: "flex", justifyContent: "right" }}>
        <div className="row">
          <div
            className="text"
            style={{ marginLeft: "0px", marginRight: "10px" }}
          >
            {message}
          </div>
          <div className="avatar"></div>
        </div>
      </div>
    );
  }

  function receiveText(message) {
    return (
      <div className="row">
        <div className="avatar"></div>
        <div className="text">{message}</div>
      </div>
    );
  }

  function ChatBox() {
    console.log("friend list check", friend);
    //in case friend is an empty array
    if (friend.length === 0 || friend === undefined) return;

    let selected = friend.filter((item) => {
      return item.userID === friendSelected;
    });

    if (selected === undefined || selected.length === 0) return;
    selected = selected[0].userID;
    return (
      <>
        {friend.map((item, index) => {
          if (item.userID === selected && item.history !== undefined) {
            return (
              <>
                {item.history.map((content) => {
                  if (content.from === userName) {
                    return sendText(content.message);
                  } else {
                    return receiveText(content.message);
                  }
                })}
              </>
            );
          } else {
            return <></>;
          }
        })}
      </>
    );
  }

  return (
    <div
      className="main-content"
      style={{
        margin: 0,
        flexDirection: "row",
      }}
    >
      <div className="friend-list">
        {loginStatus === false ? (
          <div className="friend-container" style={{ cursor: "auto" }}>
            <button
              className="center"
              onClick={() => {
                let temp = window.prompt("type your username");
                setUserName(temp);
                socket.auth = { username: temp };
                socket.connect();
                setLoginStatus(true);
              }}
            >
              Click to login
            </button>
          </div>
        ) : (
          ""
        )}
        {friend.map((item, index) => {
          return (
            <div
              className="friend-container"
              style={{
                backgroundColor:
                  item.userID === friendSelected ? "yellowgreen" : "",
              }}
              onClick={() => setFriendSelected(item.userID)}
            >
              <div className="name">
                {item.username}
                {item.username === userName ? "(self)" : ""}
              </div>
              <div className="status">
                <div
                  className="dot"
                  style={{
                    backgroundColor: item.connected ? "green" : "red",
                  }}
                ></div>
                <div style={{ marginLeft: "5px" }}>
                  {item.connected ? "online" : "offline"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="chat-content">
        <div className="chat-history">
          {friendSelected !== "" ? <ChatBox></ChatBox> : ""}
        </div>
        <div className="chat-input">
          <textarea
            className="send-content"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          ></textarea>
          <button
            className="send-button"
            onClick={() => {
              if (message === "") {
                alert("input cannot be empty!");
                return;
              }
              sendMessage(message);
              setMessage("");
            }}
          >
            send
          </button>
        </div>
      </div>
    </div>
  );
}