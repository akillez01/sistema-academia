import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { users } from "../models/user";

const SECRET = "segredo123"; // Em produção, use variável de ambiente

export function login(req: Request, res: Response) {
  const { email, senha } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(401).json({ error: "Usuário não encontrado" });

  if (!bcrypt.compareSync(senha, user.senha))
    return res.status(401).json({ error: "Senha inválida" });

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
    expiresIn: "1h",
  });
  res.json({ token, user: { id: user.id, nome: user.nome, email: user.email } });
}
