import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createAdotante, findByEmail } from "../repositories/adotante.repo.js";
import { query } from "../config/db.js";

export async function registerService({ nome, email, telefone = null, password, role = "USER" }) {
  if (!nome?.trim())  throw Object.assign(new Error('Campo "nome" é obrigatório'),  { status: 400 });
  if (!email?.trim()) throw Object.assign(new Error('Campo "email" é obrigatório'), { status: 400 });
  if (!password?.trim()) throw Object.assign(new Error('Campo "password" é obrigatório'), { status: 400 });

  const exists = await findByEmail(email);
  if (exists) throw Object.assign(new Error("Email já cadastrado"), { status: 409 });

  const hash = await bcrypt.hash(password, 10);
  const created = await createAdotante({
    nome: nome.trim(),
    email: email.trim(),
    telefone,
    password_hash: hash,
    role,
  });

  return { id: created.id, nome: created.nome, email: created.email, telefone: created.telefone, role: created.role };
}

export async function loginService(email, password) {
  if (!email?.trim() || !password?.trim()) {
    throw Object.assign(new Error("Email e password são obrigatórios"), { status: 400 });
  }
  const user = await findByEmail(email);
  if (!user) throw Object.assign(new Error("Credenciais inválidas"), { status: 401 });

  const ok = await bcrypt.compare(password, user.password_hash || "");
  if (!ok) throw Object.assign(new Error("Credenciais inválidas"), { status: 401 });

  const token = jwt.sign(
    { role: user.role || "USER" },
    process.env.JWT_SECRET,
    { subject: String(user.id), expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );
  return token;
}

export async function meService(id) {
  const { rows } = await query(
    "SELECT id, nome, email, telefone, role FROM adotante WHERE id = $1",
    [id]
  );
  return rows[0] || null;
}
