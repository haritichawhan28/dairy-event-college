import express from "express"
import { getAllUser, login, signup } from "../controllers/user-controller.js";

const router = express.Router();

// GET ALL USERS
router.get("/", getAllUser);

// POST CREATE USER
router.post("/signup", signup);

// POST LOGIN USER
router.post('/login', login)

export default router;