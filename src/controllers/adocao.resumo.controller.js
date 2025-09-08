// src/controllers/adocao.resumo.controller.js
import { getResumoAdocao } from "../services/adocao.resumo.services.js";

export async function getResumo(req, res) {
  try {
    const { adotanteId } = req.params;
    const { de, ate } = req.query; // opcional: /?de=2025-09-01&ate=2025-09-07
    const data = await getResumoAdocao(Number(adotanteId), { de, ate });
    if (!data) return res.status(404).json({ message: "Nada encontrado para o adotante" });
    return res.json(data);
  } catch (e) {
    return res.status(500).json({ message: e.message || "Erro interno" });
  }
}
