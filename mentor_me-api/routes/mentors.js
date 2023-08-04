import express from "express";
import { User } from "../models/user.js";
import { userProfile } from "../models/userProfile.js";
import mentorshipRequest from "../models/mentorshipRequest.js";

const router = express.Router();

router.get("/mentors", async (req, res) => {
  try {
    const { major, classification, menteeID } = req.query;

    let userProfileWhere = { accountType: "Mentor" };

    if (major) {
      userProfileWhere.major = major;
    }
    if (classification) {
      userProfileWhere.classification = classification;
    }

    const mentors = await User.findAll({
      include: [
        {
          model: userProfile,
          as: "userprofile",
          where: userProfileWhere,
        },
      ],
    });

    const mentorsWithStatus = menteeID
      ? await Promise.all(
          mentors.map(async (mentor) => {
            const request = await mentorshipRequest.findOne({
              where: { MentorID: mentor.id, MenteeID: menteeID },
            });
            return {
              ...mentor.get(),
              requestStatus: request ? request.Status : "Send Request",
            };
          })
        )
      : mentors;

    res.json(mentorsWithStatus);
  } catch (error) {
    console.error("Failed to fetch mentors", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
