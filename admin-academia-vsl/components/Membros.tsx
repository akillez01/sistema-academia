"use client";
import { useState } from "react";
import { MembersTable } from "./members-table";

export default function Membros() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [status, setStatus] = useState("Ativo");
  const [mensagem, setMensagem] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [reload, setReload] = useState(0);

  async function adicionarMembro(e: React.FormEvent) {
    e.preventDefault();
    setMensagem("");
    const res = await fetch("http://localhost:3001/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, status, senha }),
    });
    if (res.ok) {
      setMensagem("Membro adicionado com sucesso!");
      setNome("");
      setEmail("");
      setSenha("");
      setStatus("Ativo");
      setShowForm(false);
      setReload((r) => r + 1); // força recarregar tabela
    } else {
      setMensagem("Erro ao adicionar membro");
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Membros</h2>
      <button
        className="bg-primary text-white px-4 py-2 rounded mb-4"
        onClick={() => setShowForm((v) => !v)}
      >
        Novo Membro
      </button>
      {showForm && (
        <form onSubmit={adicionarMembro} className="flex gap-2 mb-6 flex-wrap bg-white p-4 rounded shadow">
          <input
            className="border rounded px-3 py-2"
            placeholder="Nome"
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="Senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            required
            type="password"
          />
          <select
            className="border rounded px-3 py-2"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </select>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Salvar</button>
        </form>
      )}
      {mensagem && <div className="mb-4 text-green-600">{mensagem}</div>}
      <MembersTable reload={reload} />
    </div>
  );
}
