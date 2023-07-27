import express from "express";
import { mentorshipRequest } from "../models/mentorshipRequest.js";

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
    res
      .status(201)
      .json({ message: "Mentorship request sent successfully", request });
  } catch (error) {
    console.error("Error sending mentorship request:", error);
    res.status(500).json({ error: "Failed to send mentorship request" });
  }
});

export default router;
