import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { UserContext } from "../UserContext";
import MenteeDashboard from "./components/MenteeDashboard";
import MentorDashboard from "./components/MentorDashboard";
import { socket } from "./client.js";

function App() {
  const [user, setUser] = useState(() => {
    // Retrieve the user data from storage or set it to null if not found
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  useEffect(() => {
    // Save the user data to storage whenever the user state changes
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  useEffect(() => {
    socket.on("new_request", () => {
      console.log("The request was received!");
      new Notification("You have a new mentorship request!");
      alert("You have a new mentorship request!");
    });
    socket.on("request_accepted", () => {
      console.log("The request has been accepted");
      new Notification("Your mentorship request has been responded to!");
      alert("Your mentorship request has been accepted!");
    });

    //Cleaning up listeners when component unmounts
    return () => {
      // socket.off("new_request");
      socket.off("request_accepted");
    };
  }, []);

  return (
    <div className="app">
      <UserContext.Provider value={{ user, updateUser }}>
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={user ? <Home /> : <Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Login />} />
            <Route path="/mentee" element={<MenteeDashboard />} />
            <Route path="/mentor" element={<MentorDashboard />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
