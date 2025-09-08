import { query } from "../config/db.js";

export async function linkAdotanteAnimal(adotanteId, animalId, status = "INTERESSE") {
  await query(
    `INSERT INTO adocoes (adotante_id, animal_id, status)
     VALUES ($1,$2,$3)
     ON CONFLICT (adotante_id, animal_id)
     DO UPDATE SET status = EXCLUDED.status`,
    [adotanteId, animalId, status]
  );
}

export async function unlinkAdotanteAnimal(adotanteId, animalId) {
  await query(`DELETE FROM adocoes WHERE adotante_id = $1 AND animal_id = $2`, [
    adotanteId,
    animalId,
  ]);
}

export async function listAnimaisDoAdotante(adotanteId) {
  const { rows } = await query(
    `SELECT a.*, d.status, d.created_at
       FROM animal a
       JOIN adocoes d ON d.animal_id = a.id
      WHERE d.adotante_id = $1
      ORDER BY d.created_at DESC`,
    [adotanteId]
  );
  return rows;
}

export async function listAdotantesDoAnimal(animalId) {
  const { rows } = await query(
    `SELECT ad.id, ad.nome, ad.email, d.status, d.created_at
       FROM adotante ad
       JOIN adocoes d ON d.adotante_id = ad.id
      WHERE d.animal_id = $1
      ORDER BY d.created_at DESC`,
    [animalId]
  );
  return rows;
}

export async function updateStatus(adotanteId, animalId, status) {
  await query(
    `UPDATE adocoes SET status = $1
      WHERE adotante_id = $2 AND animal_id = $3`,
    [status, adotanteId, animalId]
  );
}
