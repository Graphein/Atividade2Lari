import { Router } from "express";
import { postAdotante, getAdotanteWithAnimais } from "../controllers/adotante.controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

const router = Router();

router.get("/adotantes/:id", getAdotanteWithAnimais);     
router.post("/adotantes", authMiddleware, postAdotante);    

export default router;
