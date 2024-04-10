const router = express.Router();
import express from "express";
import { allCards, cardDetails } from "../controllers/cardDetails.js";

router.get("/all", allCards);

router.get("/:cardId", cardDetails);

export default router;
