// src/routes/adocao.resumo.routes.js
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import { getResumo } from "../controllers/adocao.resumo.controller.js";

const router = Router();
// se quiser exigir login:
router.get("/adocoes/resumo/:adotanteId", authMiddleware, getResumo);
// se quiser público, remova o authMiddleware.

export default router;
