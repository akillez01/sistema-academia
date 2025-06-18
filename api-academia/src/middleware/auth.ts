import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const SECRET = "segredo123";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Token não enviado" });

  const [, token] = authHeader.split(" ");
  try {
    const decoded = jwt.verify(token, SECRET);
    (req as any).user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido" });
  }
}
