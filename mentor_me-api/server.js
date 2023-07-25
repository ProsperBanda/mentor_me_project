import express from "express";
import session from "express-session";
import cors from "cors";
import morgan from "morgan";
import { sequelize } from "./database.js";
import userRoutes from "./routes/users.js";
import profileRoutes from "./routes/profile.js";
import SequelizeStoreInit from "connect-session-sequelize";
import { User, userProfile } from "./models/index.js";
import mentorsRoute from "./routes/mentors.js";
import requestsRoute from "./routes/requests.js";
import mentorshipResponse from "./models/mentorshipResponse.js";
import mentorshipRequest from "./models/mentorshipRequest.js";
import mentorshipRequestRoutes from "./routes/mentorshipRequestRoute.js";
import mentorshipResponseRoutes from "./routes/mentorshipResponseRoute.js";
import fs from "fs";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json()); // Middleware for parsing JSON bodies from HTTP requests
app.use(morgan());

const SequelizeStore = SequelizeStoreInit(session.Store);
const sessionStore = new SequelizeStore({
  db: sequelize,
});

app.get("/", (req, res) => {
  res.send("I am here!!!");
});

// Session middleware
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      sameSite: false,
      secure: false,
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year in milliseconds
    },
  })
);
sessionStore.sync();

app.use(userRoutes);
app.use(profileRoutes);
app.use(mentorsRoute);
app.use(mentorshipRequestRoutes);
app.use(mentorshipResponseRoutes);
app.use(requestsRoute);

//Route to get all users with associated profiles
app.get("/userprofile", async (req, res) => {
  try {
    const profiles = await userProfile.findAll({
      include: [{ model: User, as: "user" }],
      order: [["createdAt", "DESC"]],
    });
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Route to update the JSON file with new words
app.post("/update-words", (req, res) => {
  const { field, word } = req.body;

  //Making sure that the field and word are provided in the request body
  if (!field || !word) {
    return res.status(400).json({ message: "Field and word are required." });
  }
  //Load the JSON file
  const jsonDataPath =
    "/Users/prosperbanda/Desktop/mentor_me_project/mentor_me-ui/src/FormData.json";
  fs.readFile(jsonDataPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return res.status(500).json({ message: "Internal server error." });
    }

    try {
      const jsonData = JSON.parse(data);

      //Ensure that the field exist in the JSON data
      if (!(field in jsonData)) {
        return res.status(400).json({ message: "Invalid field." });
      }
      // Check if the word already exists in the field
      if (!jsonData[field].includes(word)) {
        jsonData[field].push(word);

        // Save the updated JSON data to the file
        fs.writeFile(jsonDataPath, JSON.stringify(jsonData, null, 2), (err) => {
          if (err) {
            console.error("Error writing to JSON file:", err);
            return res.status(500).json({ message: "Internal server error." });
          }

          return res.status(200).json({ message: "Word added successfully." });
        });
      } else {
        return res.status(200).json({ message: "Word already exists." });
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  });
});

sequelize
  .sync({ alter: true })
  .then(() => {
    const port = 3000;
    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
