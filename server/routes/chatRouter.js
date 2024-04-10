const router = express.Router();
import express from "express";
import {
  sendMessage,
  getMessage,
  allConvos,
  getConversations,
} from "../controllers/allChats.js";

router.post("/", allConvos);

router.post("/send/:chatId", sendMessage);

router.post("/:chatId", getConversations);

router.post("/other/:chatId", getMessage);


export default router;
