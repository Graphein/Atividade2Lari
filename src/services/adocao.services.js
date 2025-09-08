
import * as Repo from "../repositories/adocao.repo.js";
import { findAnimalWithAdotante as findAnimalById } from "../repositories/animal.repo.js";

const VALID = ["INTERESSE", "EM_AVALIACAO", "APROVADA", "RECUSADA"];

export async function vincularService(adotanteId, animalId, status = "INTERESSE") {
  if (!adotanteId || !animalId) {
    const e = new Error("IDs obrigatórios");
    e.status = 400;
    throw e;
  }
  if (!VALID.includes(status)) {
    const e = new Error("Status inválido");
    e.status = 400;
    throw e;
  }

  const animal = await findAnimalById(animalId);
  if (!animal) {
    const e = new Error("Animal inexistente");
    e.status = 404;
    throw e;
  }

  await Repo.linkAdotanteAnimal(adotanteId, animalId, status);
}

export async function desvincularService(adotanteId, animalId) {
  await Repo.unlinkAdotanteAnimal(adotanteId, animalId);
}

export function meusAnimaisService(adotanteId) {
  return Repo.listAnimaisDoAdotante(adotanteId);
}

export function adotantesDoAnimalService(animalId) {
  return Repo.listAdotantesDoAnimal(animalId);
}

export async function mudarStatusService(adotanteId, animalId, status) {
  if (!VALID.includes(status)) {
    const e = new Error("Status inválido");
    e.status = 400;
    throw e;
  }
  await Repo.updateStatus(adotanteId, animalId, status);
}
