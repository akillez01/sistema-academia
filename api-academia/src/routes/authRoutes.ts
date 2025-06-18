import dotenv from "dotenv";
import { Router } from "express";
import admin from "firebase-admin";
dotenv.config();

const router = Router();

// Login com Firebase Auth
router.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  try {
    // Firebase Auth REST API: signInWithEmailAndPassword
    // O SDK Admin não faz login, mas pode verificar tokens. Para login, use REST API:
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: senha, returnSecureToken: true })
      }
    );
    const data = await response.json();
    if (!response.ok) return res.status(401).json({ error: data.error?.message || "Login inválido" });
    res.json({ token: data.idToken, user: { email: data.email, id: data.localId } });
  } catch (error) {
    res.status(500).json({ error: "Erro ao autenticar" });
  }
});

// Cadastro de usuário no Firebase Auth
router.post("/register", async (req, res) => {
  const { email, senha } = req.body;
  try {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.FIREBASE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: senha, returnSecureToken: true })
      }
    );
    const data = await response.json();
    if (!response.ok) return res.status(400).json({ error: data.error?.message || "Erro ao registrar" });
    res.status(201).json({ token: data.idToken, user: { email: data.email, id: data.localId } });
  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar usuário" });
  }
});

// Reset de senha
router.post("/reset-password", async (req, res) => {
  const { email } = req.body;
  try {
    const link = await admin.auth().generatePasswordResetLink(email);
    // Aqui você pode enviar o link por email, ou só retornar para o app
    res.json({ message: "Link de redefinição enviado", link });
  } catch (error) {
    res.status(400).json({ error: "Erro ao enviar link de redefinição" });
  }
});

export default router;
