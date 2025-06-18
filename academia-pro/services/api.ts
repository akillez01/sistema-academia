const API_URL = "http://localhost:3001/api";

export async function login(email: string, senha: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });
  if (!response.ok) throw new Error("Login inválido");
  return response.json();
}

export async function getUsers(token: string) {
  const response = await fetch(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Não autorizado");
  return response.json();
}
