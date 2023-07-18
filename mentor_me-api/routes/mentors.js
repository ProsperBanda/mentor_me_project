import express from "express";
import { User } from "../models/user.js";
import { userProfile } from "../models/userProfile.js";

const router = express.Router();

// GET mentors endpoint with the filter parameters
router.get("/mentors", async (req, res) => {
  try {
    const { major, classification } = req.query;

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
    res.json(mentors);
  } catch (error) {
    console.error("Failed to fetch mentors", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
