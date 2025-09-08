import {
  vincularService,
  desvincularService,
  meusAnimaisService,
  adotantesDoAnimalService,
  mudarStatusService,
} from "../services/adocao.services.js";

export async function postVinculo(req, res) {
  try {
    await vincularService(req.user.id, req.body.animalId, req.body.status);
    res.status(201).json({ message: "Vinculado" });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Erro interno" });
  }
}

export async function deleteVinculo(req, res) {
  try {
    await desvincularService(req.user.id, Number(req.params.animalId));
    res.status(204).send();
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Erro interno" });
  }
}

export async function getMeusAnimais(req, res) {
  try {
    const data = await meusAnimaisService(req.user.id);
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Erro interno" });
  }
}

export async function getAdotantes(req, res) {
  try {
    const data = await adotantesDoAnimalService(Number(req.params.animalId));
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Erro interno" });
  }
}

export async function putMeuVinculo(req, res) {
  try {
    const adotanteId = req.user.id;
    const { animalId, status } = req.body || {};
    await mudarStatusService(adotanteId, animalId, status);
    res.status(200).json({ message: "Vínculo atualizado" });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Erro interno" });
  }
}

export async function patchStatus(req, res) {
  try {
    const { adotanteId, animalId, status } = req.body;
    await mudarStatusService(adotanteId, animalId, status);
    res.status(204).send();
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Erro interno" });
  }
}
