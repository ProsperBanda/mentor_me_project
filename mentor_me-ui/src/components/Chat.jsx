import React, { useState, useEffect } from "react";
import {
  useMultiChatLogic,
  MultiChatSocket,
  MultiChatWindow,
} from "react-chat-engine-advanced";

const Chat = () => {
  const userJSON = localStorage.getItem("user");
  const userObject = JSON.parse(userJSON);
  const projectId = "5ee9af19-e706-4669-8226-547930062b19";
  const username = userObject.username;
  const secret = userObject.username;
  const chatProps = useMultiChatLogic(projectId, username, secret);
  console.log("I am rendering");

  return (
    <>
      <MultiChatSocket {...chatProps} />
      <MultiChatWindow {...chatProps} style={{ height: "100vh" }} />
    </>
  );
};

export default React.memo(Chat);
