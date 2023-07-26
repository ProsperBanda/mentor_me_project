import express from "express";
import { mentorshipResponse } from "../models/mentorshipResponse.js";
import mentorshipRequest from "../models/mentorshipRequest.js";

const router = express.Router();

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
