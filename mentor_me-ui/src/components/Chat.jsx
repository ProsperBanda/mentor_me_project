import React, { useState, useEffect } from "react";
import { ChatEngine } from "react-chat-engine";
import {
  useMultiChatLogic,
  MultiChatSocket,
  MultiChatWindow,
} from "react-chat-engine-advanced";

const Chat = () => {
  const userJSON = localStorage.getItem("user");
  const userObject = JSON.parse(userJSON);
  console.log("User Object: ", userObject);
  const [userData, setUserData] = useState(null);
  const [chatEngineData, setChatEngineData] = useState(null);

  const chatProps = useMultiChatLogic(
    "5ee9af19-e706-4669-8226-547930062b19",
    userObject.username,
    userObject.username
  );

  return (
    <div style={{ height: "100vh" }}>
      <MultiChatSocket {...chatProps} />
      <MultiChatWindow {...chatProps} style={{ height: "100%" }} />
    </div>
  );
};

export default Chat;
