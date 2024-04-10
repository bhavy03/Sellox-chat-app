import express from "express";
import mongoose from "mongoose";
import { Message } from "./Models/messageModel.js";
import cors from "cors";
import User from "./Models/authModel.js";
import jwt from "jsonwebtoken";
import { Server } from "socket.io";
import { createServer } from "http";
import { config } from "dotenv";
import userRouter from "./routes/userRouter.js";
import cardRouter from "./routes/cardRouter.js";
import chatRouter from "./routes/chatRouter.js";
import cookieParser from "cookie-parser";
import { Chats } from "./Models/chatsModel.js";

const app = express();
// const userSocketIDs = new Map();

config({
  path: "./features/config.env",
});

const corsOptions = {
  origin: `${process.env.FRONTEND_URI}`,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

const server = createServer(app);
export const io = new Server(server, {
  cors: corsOptions,
});

app.use(cors(corsOptions));

mongoose
  .connect(
    "mongodb+srv://bhavya0360:ku2vycg2Ruz6k4mo@cluster0.ywvevuv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      dbName: "test",
    }
  )
  .then((c) => {
    console.log(`connected to ${c.connection.host}`);
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use("/user", userRouter);
app.use("/card", cardRouter);
app.use("/chat", chatRouter);

app.get("/", async (req, res) => {
  res.send("SERVER");
});

const userSocketMap = {}; // {userId:socketId}

export const getReceiverSocketId = (recieverId) => {
  return userSocketMap[recieverId];
};

io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId != "undefined") userSocketMap[userId] = socket.id;
  // console.log(userSocketMap);
  // socket.on("message", async () => {});

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

server.listen(process.env.PORT, () => {
  console.log(
    `server is working on port: ${process.env.PORT} in ${process.env.Node_ENV} mode`
  );
});
