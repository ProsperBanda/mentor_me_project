import express from "express";
import { mentorshipRequest } from "../models/mentorshipRequest.js";

const router = express.Router();

//Route to fetch all mentorship requests
router.get("/mentorship-requests", async (req, res) => {
  try {
    //Fetch all the mentorship requests from the database
    const mentorshipRequests = await mentorshipRequest.findAll();

    //Send the mentorship requests as a response
    res.status(200).json(mentorshipRequests);
  } catch (error) {
    console.error("error fetching mentorship requests:", error);
    res.status(500).json({ error: "Faield to fetch mentorship requests" });
  }
});

export default router;
