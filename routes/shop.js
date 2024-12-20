import express from "express";
import loadHomePage from "../controllers/shop.js";

const router = express.Router();

router.get("/", loadHomePage);

export default router;