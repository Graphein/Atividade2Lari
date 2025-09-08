import "dotenv/config";
import express from "express";
import adotanteRoutes from "./routes/adotante.routes.js";
import animalRoutes from "./routes/animal.routes.js";
import authRoutes from "./routes/auth.routes.js"; // <--- novo
import adocaoRoutes from "./routes/adocao.routes.js";
import adocaoResumoRoutes from "./routes/adocao.resumo.routes.js";

const app = express();
app.use(express.json());

// rota de healthcheck
app.get("/health", (_req, res) => res.send("ok"));

// rota raiz
app.get("/", (_req, res) => {
  res.send("API no ar! Use /api/... ");
});

// rotas da aplicação
app.use("/api", authRoutes);     // <--- login/register
app.use("/api", adotanteRoutes);
app.use("/api", animalRoutes);
app.use("/api", adocaoRoutes);
app.use("/api", adocaoResumoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
