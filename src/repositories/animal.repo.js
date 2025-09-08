import { db, query } from "../config/db.js";

export async function findAllAnimais({ page = 1, limit = 50 } = {}) {
  const offset = (page - 1) * limit;
  const { rows } = await query(
    `SELECT a.id, a.nome, a.especie, a.raca, a.sexo, a.status,
            ad.id AS adotante_id, ad.nome AS adotante_nome
       FROM animal a
  LEFT JOIN adotante ad ON ad.id = a.adotante_id
      ORDER BY a.id
      LIMIT $1 OFFSET $2`,
    [limit, offset]
  );
  return rows;
}

export async function findAnimalWithAdotante(id) {
  const { rows } = await query(
    `SELECT a.id, a.nome AS animal_nome, a.especie, a.raca, a.sexo, a.status,
            ad.id AS adotante_id, ad.nome AS adotante_nome
       FROM animal a
  LEFT JOIN adotante ad ON ad.id = a.adotante_id
      WHERE a.id = $1`,
    [id]
  );
  if (!rows.length) return null;

  const r = rows[0];
  return {
    id: r.id,
    nome: r.animal_nome,
    especie: r.especie,
    raca: r.raca,
    sexo: r.sexo,
    status: r.status,
    adotante: r.adotante_id ? { id: r.adotante_id, nome: r.adotante_nome } : null,
  };
}

export async function createAnimalParaAdotante({
  adotante_id,
  nome,
  especie,
  raca = null,
  sexo = "M",
  status = "adotado",
}) {
  const client = await db.connect();
  try {
    await client.query("BEGIN");

    if (!adotante_id) {
      const e = new Error("Campo 'adotante_id' é obrigatório");
      e.status = 400;
      throw e;
    }
    if (!nome?.trim()) {
      const e = new Error("Campo 'nome' é obrigatório");
      e.status = 400;
      throw e;
    }
    if (!especie?.trim()) {
      const e = new Error("Campo 'especie' é obrigatório");
      e.status = 400;
      throw e;
    }
    if (!["M", "F"].includes(sexo)) {
      const e = new Error("Campo 'sexo' inválido (use 'M' ou 'F')");
      e.status = 400;
      throw e;
    }

    const validStatus = ["disponível", "adotado", "indisponível"];
    if (!validStatus.includes(status)) {
      const e = new Error(`Campo 'status' inválido (use: ${validStatus.join(", ")})`);
      e.status = 400;
      throw e;
    }

    const exists = await client.query("SELECT id FROM adotante WHERE id = $1", [adotante_id]);
    if (!exists.rowCount) {
      const e = new Error("Adotante não encontrado");
      e.status = 400;
      throw e;
    }

    const ins = await client.query(
      `INSERT INTO animal (nome, especie, raca, sexo, status, adotante_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id`,
      [nome, especie, raca, sexo, status, adotante_id]
    );

    const animalId = ins.rows[0].id;

    const result = await client.query(
      `SELECT a.id, a.nome, a.especie, a.raca, a.sexo, a.status,
              ad.id AS adotante_id, ad.nome AS adotante_nome
         FROM animal a
         JOIN adotante ad ON ad.id = a.adotante_id
        WHERE a.id = $1`,
      [animalId]
    );

    await client.query("COMMIT");
    return result.rows[0];
  } catch (err) {
    await client.query("ROLLBACK");
    if (err.code === "23503") {
      err.status = 400;
      err.message = "FK inválida: adotante_id não existe";
    }
    throw err;
  } finally {
    client.release();
  }
}
