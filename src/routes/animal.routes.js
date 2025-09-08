import { Router } from "express";
import { getAnimais, getAnimalById, postAnimal } from "../controllers/animal.controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

const router = Router();

router.get("/animais", getAnimais);                         
router.get("/animais/:id", getAnimalById);                  
router.post("/animais", authMiddleware, postAnimal);        

export default router;
