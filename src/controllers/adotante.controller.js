import {
  createAdotanteService,
  getAdotanteWithAnimaisService,
} from "../services/adotante.services.js";

export async function postAdotante(req, res) {
  try {
    const { nome, email = null, telefone = null } = req.body || {};
    const novo = await createAdotanteService({ nome, email, telefone });
    res.status(201).json(novo);
  } catch (err) {
    res.status(err.status || 400).json({ message: err.message || "Erro interno" });
  }
}

export async function getAdotanteWithAnimais(req, res) {
  try {
    const { id } = req.params;
    const adotante = await getAdotanteWithAnimaisService(id);
    if (!adotante) return res.status(404).json({ message: "Adotante não encontrado" });
    res.json(adotante);
  } catch (err) {
    res.status(500).json({ message: err.message || "Erro interno" });
  }
}
