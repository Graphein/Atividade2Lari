import { Router } from "express";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import { roleMiddleware } from "../middlewares/role-middleware.js";
import {
  postVinculo,
  deleteVinculo,
  getMeusAnimais,
  getAdotantes,
  putMeuVinculo,
  patchStatus,
} from "../controllers/adocao.controller.js";

const router = Router();

router.use(authMiddleware);
router.post("/adocoes", postVinculo);
router.delete("/adocoes/:animalId", deleteVinculo);
router.get("/adocoes/me", getMeusAnimais);
router.get("/adocoes/animal/:animalId", getAdotantes);
router.put("/adocoes", putMeuVinculo);
router.patch("/adocoes/status", roleMiddleware(["ADMIN"]), patchStatus);

export default router;
