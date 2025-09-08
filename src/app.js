import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import adotanteRoutes from "./routes/adotante.routes.js";
import animalRoutes from "./routes/animal.routes.js";

dotenv.config();
const app = express();
app.use(express.json());


app.use(authRoutes);


app.use(adotanteRoutes);
app.use(animalRoutes);

export default app;
