import express from "express";
import { adminLogin, adminLogout, adminRegistration, loadAdminHomePage, loadAdminLoginPage, loadAdminRegistrationPage } from "../controllers/admin.js";

const router = express.Router();

router.get("/registration", loadAdminRegistrationPage);
router.post("/registration", adminRegistration);
router.get("/home", loadAdminHomePage);
router.get("/login", loadAdminLoginPage);
router.post("/login", adminLogin);
router.get("/logout", adminLogout);

export default router;