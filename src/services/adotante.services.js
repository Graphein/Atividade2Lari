import {
    findAdotanteWithAnimais as findAdotanteWithAnimaisRepo,
    createAdotante as createAdotanteRepo,
    findByEmail as findByEmailRepo, 
  } from "../repositories/adotante.repo.js";
  
  export async function createAdotanteService({ nome, email = null, telefone = null }) {
    if (!nome || !nome.trim()) throw new Error('Campo "nome" é obrigatório');
  
    if (email) {
      const exists = await (findByEmailRepo?.(email) ?? Promise.resolve(null));
      if (exists) {
        const err = new Error("Email já cadastrado");
        err.status = 409;
        throw err;
      }
    }
  
    const created = await createAdotanteRepo({ nome: nome.trim(), email, telefone });
    return created;
  }
  
  export async function getAdotanteWithAnimaisService(id) {
    const adotante = await findAdotanteWithAnimaisRepo(id);
    return adotante; 
  }
  