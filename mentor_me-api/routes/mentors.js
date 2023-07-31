import express from "express";
import { User } from "../models/user.js";
import { userProfile } from "../models/userProfile.js";
import mentorshipRequest from "../models/mentorshipRequest.js";

const router = express.Router();

// GET mentors endpoint with the filter parameters
router.get("/mentors", async (req, res) => {
  try {
    const { major, classification, menteeID } = req.query;
    const filters = {};
    if (major) {
      filters.major = major;
    }
    if (classification) {
      filters.classification = classification;
    }

    const mentors = await User.findAll({
      where: filters,
      include: [
        {
          model: userProfile,
          as: "userprofile",
          where: { accountType: "Mentor" },
        },
      ],
    });

    // Iterate through mentors and fetch the request status for each mentor
    const mentorsWithStatus = await Promise.all(
      mentors.map(async (mentor) => {
        const request = await mentorshipRequest.findOne({
          where: { MentorID: mentor.id, MenteeID: menteeID },
        });
        return {
          ...mentor.get(),
          requestStatus: request ? request.Status : "Send Request",
        };
      })
    );

    res.json(mentorsWithStatus);
  } catch (error) {
    console.error("Failed to fetch mentors", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
