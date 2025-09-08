import { query } from "../config/db.js";

export async function findResumoAdocao(adotanteId, { de = null, ate = null } = {}) {
  const params = [adotanteId];
  const filters = ["d.adotante_id = $1"];

  if (de) {
    params.push(de);
    filters.push(`d.created_at >= $${params.length}`);
  }
  if (ate) {
    params.push(ate);
    filters.push(`d.created_at <= $${params.length}`);
  }

  const where = filters.length ? `WHERE ${filters.join(" AND ")}` : "";

  const { rows } = await query(
    `SELECT
       d.created_at,
       ad.cpf             AS adotante_cpf,
       ad.nome            AS adotante_nome,
       an.id              AS animal_id,
       an.nome            AS animal_nome,
       an.especie,
       COALESCE(an.raca,'SRD') AS raca
     FROM adocoes d
     JOIN adotante ad ON ad.id = d.adotante_id
     JOIN animal   an ON an.id = d.animal_id
     ${where}
     ORDER BY d.created_at ASC, an.id ASC`,
    params
  );

  return rows;
}
