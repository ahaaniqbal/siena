import express from "express";
import {
  addSubscriber,
  getSubscribers,
  contactFontaine,
  locateDealer,
  buildTrailer,
  literature,
  enquire,
} from "./controller.js";
import { addToCart } from "./webflow.js";

const router = express.Router();

// subscribe
router.post("/subscribe", addSubscriber);

// contact fontaine
router.post("/contact", contactFontaine);

// contact fontaine
router.post("/dealer", locateDealer);

// build trailer
router.post("/build-trailer", buildTrailer);

// literature
router.post("/literature", literature);

// enquire
router.post("/enquire", enquire);

// test
router.get("/subscribers", getSubscribers);

router.post("/add-to-cart", addToCart);

export default router;
