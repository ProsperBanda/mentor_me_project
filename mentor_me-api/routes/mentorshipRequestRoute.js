import express from "express";
import { mentorshipRequest } from "../models/mentorshipRequest.js";
import { io, onlineUsers } from "../server.js";
import { notifications } from "../models/notifications.js";

const router = express.Router();

//Route to handle sending a mentorship request
router.post("/request", async (req, res) => {
  try {
    //Get mentorID and menteeID from the body
    const { mentorID, menteeID } = req.body;

    //Create a mentorship request in the database
    const request = await mentorshipRequest.create({
      MenteeID: menteeID,
      MentorID: mentorID,
      Status: "Pending",
    });

    //Create a notification in the database
    const notificationContent = "You have a new mentorship request!";
    const notification = await notifications.create({
      content: notificationContent,
      receivingUserID: mentorID,
      sendingUserID: menteeID,
    });

    //If the mentor is online, send them a notification
    console.log("OnlineUsers on Request: ", onlineUsers);
    if (mentorID in onlineUsers) {
      io.to(onlineUsers[mentorID]).emit("new_request", {
        menteeID,
        requestID: request.id,
        notification,
      });
    }

    res
      .status(201)
      .json({ message: "Mentorship request sent successfully", request });
  } catch (error) {
    console.error("Error sending mentorship request:", error);
    res.status(500).json({ error: "Failed to send mentorship request" });
  }
});

export default router;
