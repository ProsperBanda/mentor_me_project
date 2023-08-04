import React, { useEffect } from "react";
import { ChatEngine } from "react-chat-engine";
import axios from "axios";

const Chat = () => {
  {
    const projectId = import.meta.env.VITE_REACT_APP_CE_PROJECT_ID;
    const userJSON = localStorage.getItem("user");
    const userObject = JSON.parse(userJSON);
    const username = userObject.username;
  }
  function getOrCreateUser() {
    axios
      .put(
        "https://api.chatengine.io/users/",
        { username: username, secret: username },
        { headers: { "Private-Key": "6b97a1d8-04ed-44ab-b012-bb101e8f909b" } }
      )
      .catch((e) => console.log("Get or create user error", e));
  }
  function getChat() {
    axios
      .get("https://api.chatengine.io/chats/", {
        headers: {
          "Project-ID": projectId,
          "User-Name": username,
          "User-Secret": username,
        },
      })
      .catch((e) => console.log("Get chat error", e));
  }

  useEffect(() => {
    getOrCreateUser();
    getChat();
  }, []);
  return (
    <>
      <ChatEngine
        height="100vh"
        userName={username}
        userSecret={username}
        projectID={projectId}
        renderNewChatForm={(creds) => {}}
      />
    </>
  );
};

export default React.memo(Chat);
