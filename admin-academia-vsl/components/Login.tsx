"use client";
import { useState } from "react";
import { login } from "../lib/api";

export default function Login({ onLogin }: { onLogin: (token: string) => void }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = async () => {
    try {
      const data = await login(email, senha);
      onLogin(data.token);
    } catch {
      setErro("Login inválido");
    }
  };

  return (
    <div>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} type="password" />
      <button onClick={handleLogin}>Entrar</button>
      {erro && <div>{erro}</div>}
    </div>
  );
}
