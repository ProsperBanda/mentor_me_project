import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user.js";
import { Op } from "sequelize";

const router = express.Router();

let newUserObj = { id: null };

// Route for user registration
router.post("/users", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
    });

    req.session.user = newUser;

    res.json({ user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Route for user login
router.post("/users/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    req.session.user = user;

    newUserObj.id = user.id;
    Object.seal(newUserObj);

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
export { newUserObj };
