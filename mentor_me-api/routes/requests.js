import express from "express";
import { mentorshipRequest } from "../models/mentorshipRequest.js";
import { userProfile } from "../models/userProfile.js";
import { User } from "../models/user.js";

const router = express.Router();

router.get("/mentorship-requests", async (req, res) => {
  try {
    const { mentorID } = req.query;
    const mentorshipRequests = await mentorshipRequest.findAll({
      where: { MentorID: mentorID },
      include: [
        {
          model: User,
          include: [{ model: userProfile, as: "userprofile" }],
        },
      ],
    });

    res.status(200).json(mentorshipRequests);
  } catch (error) {
    console.error("error fetching mentorship requests:", error);
    res.status(500).json({ error: "Failed to fetch mentorship requests" });
  }
});

export default router;
