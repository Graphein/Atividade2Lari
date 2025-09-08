import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import adotanteRoutes from "./routes/adotante.routes.js";
import animalRoutes from "./routes/animal.routes.js";

dotenv.config();
const app = express();
app.use(express.json());

// Rotas públicas de auth
app.use(authRoutes);

// Suas rotas de domínio
app.use(adotanteRoutes);
app.use(animalRoutes);

export default app;
