// src/services/animal.services.js
import {
  findAllAnimais as findAllAnimaisRepo,
  findAnimalWithAdotante as findAnimalWithAdotanteRepo,
  createAnimalParaAdotante as createAnimalParaAdotanteRepo,
} from "../repositories/animal.repo.js";

export async function listAnimaisService({ page = 1, limit = 50 }) {
  const safePage = Number.isFinite(page) && page > 0 ? page : 1;
  const safeLimit = Number.isFinite(limit) && limit > 0 && limit <= 100 ? limit : 50;
  return findAllAnimaisRepo({ page: safePage, limit: safeLimit });
}

export async function getAnimalByIdService(id) {
  return findAnimalWithAdotanteRepo(id);
}

export async function createAnimalParaAdotanteService(data) {
  // validações mínimas de regra de negócio
  if (!data?.nome?.trim()) {
    const e = new Error('Campo "nome" é obrigatório');
    e.status = 400;
    throw e;
  }
  if (!data?.especie?.trim()) {
    const e = new Error('Campo "especie" é obrigatório');
    e.status = 400;
    throw e;
  }
  return createAnimalParaAdotanteRepo(data);
}
