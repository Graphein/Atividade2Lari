
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import { getResumo } from "../controllers/adocao.resumo.controller.js";

const router = Router();
router.get("/adocoes/resumo/:adotanteId", authMiddleware, getResumo);

export default router;
