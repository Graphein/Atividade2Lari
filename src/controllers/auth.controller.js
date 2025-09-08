import { loginService, registerService, meService } from "../services/auth.services.js";

export async function register(req, res) {
  try {
    const user = await registerService(req.body || {});
    res.status(201).json(user);
  } catch (e) {
    res.status(e.status || 400).json({ message: e.message || "Erro ao registrar" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body || {};
    const token = await loginService(email, password);
    res.json({ token });
  } catch (e) {
    res.status(e.status || 401).json({ message: e.message || "Credenciais inválidas" });
  }
}

export async function me(req, res) {
  try {
    const data = await meService(req.user.id);
    res.json(data);
  } catch (e) {
    res.status(e.status || 500).json({ message: e.message || "Erro" });
  }
}
