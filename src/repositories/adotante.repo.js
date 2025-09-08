import { query } from "../config/db.js";

// cria novo adotante (agora aceita password_hash e role)
export async function createAdotante({ nome, email, telefone, password_hash = null, role = "USER" }) {
  const { rows } = await query(
    `INSERT INTO adotante (nome, email, telefone, password_hash, role)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, nome, email, telefone, role`,
    [nome, email, telefone, password_hash, role]
  );
  return rows[0];
}

// busca adotante por e-mail (para login/registro)
export async function findByEmail(email) {
  const { rows } = await query("SELECT * FROM adotante WHERE email = $1", [email]);
  return rows[0] || null;
}

// busca adotante + seus animais (inalterado, só mantendo Postgres)
export async function findAdotanteWithAnimais(id) {
  const { rows } = await query(
    `SELECT 
       ad.id        AS adotante_id,
       ad.nome      AS adotante_nome,
       ad.email     AS adotante_email,
       ad.telefone  AS adotante_telefone,
       an.id        AS animal_id,
       an.nome      AS animal_nome,
       an.especie   AS animal_especie,
       an.raca      AS animal_raca,
       an.sexo      AS animal_sexo,
       an.status    AS animal_status
     FROM adotante ad
     LEFT JOIN animal an ON ad.id = an.adotante_id
     WHERE ad.id = $1`,
    [id]
  );

  if (rows.length === 0) return null;

  return {
    adotante_id: rows[0].adotante_id,
    nome: rows[0].adotante_nome,
    email: rows[0].adotante_email,
    telefone: rows[0].adotante_telefone,
    animais: rows
      .filter((r) => r.animal_id !== null)
      .map((r) => ({
        id: r.animal_id,
        nome: r.animal_nome,
        especie: r.animal_especie,
        raca: r.animal_raca,
        sexo: r.animal_sexo,
        status: r.animal_status,
      })),
  };
}
