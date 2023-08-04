import express from "express";
import { mentorshipResponse } from "../models/mentorshipResponse.js";
import mentorshipRequest from "../models/mentorshipRequest.js";
import { io, onlineUsers } from "../server.js";
import { notifications } from "../models/notifications.js";

const router = express.Router();
let connections = [];

router.post("/:requestID/accept", async (req, res) => {
  try {
    const { requestID } = req.params;
    const request = await mentorshipRequest.findByPk(requestID);

    if (!request) {
      return res.status(404).json({ error: "Mentorship request not found" });
    }

    request.Status = "Accepted";
    await request.save();

    const notificationContent = "Your request was accepted!";
    const notification = await notifications.create({
      content: notificationContent,
      receivingUserID: request.MenteeID,
      sendingUserID: request.MentorID,
    });

    if (request.MenteeID in onlineUsers) {
      io.to(onlineUsers[request.MenteeID]).emit("request_accepted", {
        mentorID: request.MentorID,
        requestID,
        notification,
      });
    }

    connections.push({
      mentorID: request.MentorID,
      menteeID: request.MenteeID,
    });
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

router.post("/:requestID/decline", async (req, res) => {
  try {
    const { requestID } = req.params;

    const request = await mentorshipRequest.findByPk(requestID);
    if (!request) {
      return res.status(404).json({ error: "Mentorship request not found" });
    }
    request.Status = "Declined";
    await request.save();
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
