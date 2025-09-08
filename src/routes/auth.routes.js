import { Router } from "express";
import { register, login, me } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

const router = Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/me", authMiddleware, me); 

export default router;
