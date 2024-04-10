const router = express.Router();
import express from "express";
import { login, register, logout, getUser } from "../controllers/authDetail.js";
import newCard from "../controllers/newCard.js";
import upload from "../features/images.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dg8bx1w79",
  api_key: "383555616487936",
  api_secret: "dgHtMKj9KQlskbsymTzxk0FIJJY",
});

router.post("/register", register);

router.post("/login", login);

router.get("/logout", logout);

router.get("/:myId", getUser);

router.post("/sell", upload.single("image"), newCard);

router.post("/rent", upload.single("image"), newCard);

export default router;
