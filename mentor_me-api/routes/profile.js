import express from "express";
import { userProfile } from "../models/userProfile.js";
import { newUserObj } from "./users.js";

const router = express.Router();

router.post("/profile", async (req, res) => {
  try {
    const { school, major, accountType, classification, bio } = req.body;
    const userId = newUserObj.id;
    const newProfile = await userProfile.create({
      school,
      major,
      accountType,
      classification,
      bio,
      userId,
    });
    res.json({ profile: newProfile });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create new profile" });
  }
});

router.get("/profile/:id", async (req, res) => {
  try {
    const userID = req.params.id;
    console.log("UserID:", userID);
    const profile = await userProfile.findOne({
      where: { userId: userID },
    });
    console.log("Profile:", profile);
    if (!profile) {
      res.status(404).json({ error: "Profile not found" });
    } else {
      res.status(200).json(profile);
    }
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error: "Failed to get the profile information" });
  }
});

router.put("/profile/:id", async (req, res) => {
  try {
    const profileId = req.params.id;
    const { school, major, accountType, classification, bio } = req.body;
    const updatedProfile = await userProfile.update(
      { school, major, accountType, classification, bio },
      { where: { id: profileId } }
    );
    if (updatedProfile[0] === 0) {
      res.status(404).json({ error: "Profile not found" });
    } else {
      res.status(200).json({ message: "Profile updated successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile information" });
  }
});

router.delete("/profile/:id", async (req, res) => {
  try {
    const profileId = req.params.id;
    const deletedProfile = await userProfile.destroy({
      where: { id: profileId },
    });
    if (deletedProfile === 0) {
      res.status(404).json({ error: "Profile not found" });
    } else {
      res.status(200).json({ message: "Profile deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete profile" });
  }
});

export default router;
