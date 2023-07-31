// import express from "express";
// import notifications from "../models/notifications.js";

// const router = express.Router();

// router.post("/notifications", async (req, res) => {
//   try {
//     const { content, status, receivingUserID, sendingUserID } = req.body;
//     console.log(req.body);
//     const notification = await notifications.create({
//       content,
//       status,
//       receivingUserID,
//       sendingUserID,
//     });
//     res.status(201).json(notification);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "An error occurred while creating the notification." });
//   }
// });

// export default router;
