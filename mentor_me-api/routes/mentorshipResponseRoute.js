import express from "express";
import { mentorshipResponse } from "../models/mentorshipResponse.js";
import mentorshipRequest from "../models/mentorshipRequest.js";
import { io, onlineUsers } from "../server.js";
import { notifications } from "../models/notifications.js";

const router = express.Router();
let connections = [];

//Route to handle accepting a mentorship request
router.post("/:requestID/accept", async (req, res) => {
  try {
    const { requestID } = req.params;
    console.log("RequestID:", requestID);

    //Find the mentorship request by ID
    const request = await mentorshipRequest.findByPk(requestID);

    if (!request) {
      return res.status(404).json({ error: "Mentorship request not found" });
    }

    //If found, then update the request to 'Accepted'
    request.Status = "Accepted";
    await request.save();

    //Create a notification in the database
    const notificationContent = "Your request was accepted!";
    const notification = await notifications.create({
      content: notificationContent,
      receivingUserID: request.MenteeID,
      sendingUserID: request.MentorID,
    });

    //If the mentee is online, send them a notification
    console.log("OnlineUsers on Response: ", onlineUsers);
    if (request.MenteeID in onlineUsers) {
      io.to(onlineUsers[request.MenteeID]).emit("request_accepted", {
        mentorID: request.MentorID,
        requestID,
        notification,
      });
    }

    //Store connected mentor<>mentee
    connections.push({
      mentorID: request.MentorID,
      menteeID: request.MenteeID,
    });
    console.log(connections);
    //Response record
    const response = await mentorshipResponse.create({
      requestID: requestID,
      Status: "Accepted",
    });

    res.json({ message: "Mentorship request accepted", response });
  } catch (error) {
    console.error("Error accepting mentorship request:", error);
    res.status(500).json({ error: "Failed to accept mentorship request" });
  }
});

//Route to handle declining a request
router.post("/:requestID/decline", async (req, res) => {
  try {
    const { requestID } = req.params;

    //Find the request by ID
    const request = await mentorshipRequest.findByPk(requestID);
    if (!request) {
      return res.status(404).json({ error: "Mentorship request not found" });
    }
    //If found, then update the status to 'Declined'
    request.Status = "Declined";
    await request.save();
    //Response record
    const response = await mentorshipResponse.create({
      requestID: requestID,
      Status: "Declined",
    });
    res.json({ message: "Mentorship request declined", response });
  } catch (error) {
    console.error("Error declining mentorship request:", error);
    res.status(500).json({ error: "Failed to decline mentorship request" });
  }
});

export default router;
export { connections };
