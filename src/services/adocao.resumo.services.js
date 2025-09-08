import { findResumoAdocao } from "../repositories/adocao.resumo.repo.js";

export async function getResumoAdocao(adotanteId) {
  const rows = await findResumoAdocao(adotanteId);
  if (rows.length === 0) return null;

  return {
    adotante: {
      nome: rows[0].adotante_nome,
    },
    cachorros: rows.map((r) => ({
      id: r.animal_id,
      descricao: `${r.especie} - ${r.raca} - ${r.animal_nome}`,
    })),
  };
}