import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
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
import mentorshipRequestRoutes from "./routes/mentorshipRequestRoute.js";
import mentorshipResponseRoutes, {
  connections,
} from "./routes/mentorshipResponseRoute.js";
import fs from "fs";
import { notifications } from "./models/notifications.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let onlineUsers = {};

io.on("connection", (socket) => {
  socket.on("user_connected", (userID) => {
    socket.data.userid = userID.userID;
    for (const [key, value] of io.sockets.sockets.entries()) {
      const connectedUserId = value.data.userid;
      if (connectedUserId) {
        onlineUsers[connectedUserId] = key;
      }
    }

    connections.forEach((connection) => {
      if (
        connection.menteeID === userID.userID &&
        connection.mentorID in onlineUsers
      ) {
        io.to(onlineUsers[connection.mentorID]).emit("mentee_online", {
          menteeID: userID.userID,
        });
      } else if (
        connection.mentorID === userID.userID &&
        connection.menteeID in onlineUsers
      ) {
        io.to(onlineUsers[connection.menteeID]).emit("mentor_online", {
          mentorID: userID.userID,
        });
      }
    });
  });

  socket.on("disconnect", () => {
    delete onlineUsers[
      Object.keys(onlineUsers).find((key) => onlineUsers[key] === socket.id)
    ];
    console.log("Client disconnected");
  });
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan());

const SequelizeStore = SequelizeStoreInit(session.Store);
const sessionStore = new SequelizeStore({
  db: sequelize,
});

app.get("/", (req, res) => {
  res.send("I am here!!!");
});

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      sameSite: false,
      secure: false,
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
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

app.post("/update-words", (req, res) => {
  const { field, word } = req.body;

  if (!field || !word) {
    return res.status(400).json({ message: "Field and word are required." });
  }
  const jsonDataPath =
    "/Users/prosperbanda/Desktop/mentor_me_project/mentor_me-ui/src/FormData.json";
  fs.readFile(jsonDataPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return res.status(500).json({ message: "Internal server error." });
    }

    try {
      const jsonData = JSON.parse(data);
      if (!(field in jsonData)) {
        return res.status(400).json({ message: "Invalid field." });
      }
      if (!jsonData[field].includes(word)) {
        jsonData[field].push(word);
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

app.get("/notifications/:userID", async (req, res) => {
  try {
    const userID = req.params.userID;
    const userNotifications = await notifications.findAll({
      where: {
        receivingUserID: userID,
      },
      include: [
        {
          model: User,
          as: "sender",
          attributes: ["username"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(userNotifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

sequelize
  .sync({ alter: true })
  .then(() => {
    const port = 3000;
    server.listen(port, () => {
      console.log(`Socket.io and HTTP server is listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

export { onlineUsers, io };
