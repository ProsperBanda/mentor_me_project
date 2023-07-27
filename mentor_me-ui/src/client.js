import { io } from "socket.io-client";
const socket = io("http://localhost:5173/");

socket.on("connect", () => {
  console.log("Successfully connected!");
});

socket.on("disconnect", () => {
  console.log("Disconnected!");
});
