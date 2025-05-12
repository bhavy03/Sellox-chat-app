const router = express.Router();
import express from "express";
import { login, register, logout, getUser } from "../controllers/authDetail.js";
import {
  checkoutCart,
  addToCart,
  getCartItems,
  getSellerNotifications
} from "../controllers/cartItems.js";
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

router.post("/cart/add", async (req, res) => {
  const { buyerId, productId, quantity } = req.body;

  const result = await addToCart(buyerId, productId, quantity || 1);
  res.status(result.success ? 200 : 500).json(result);
});

router.get("/cart/:buyerId", getCartItems);

router.get("/cart/checkout/:buyerId", checkoutCart);

router.get('/notifications/:sellerId', getSellerNotifications);

export default router;
