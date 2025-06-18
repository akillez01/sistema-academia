export interface User {
  id: number;
  nome: string;
  email: string;
  senha: string; // senha criptografada
}

export const users: User[] = [
  {
    id: 1,
    nome: "João",
    email: "joao@email.com",
    senha: "$2a$10$wQwQwQwQwQwQwQwQwQwQwOeQwQwQwQwQwQwQwQwQwQwQwQwQwQwQW", // senha: 123456
  },
];
Configurações do projeto
Geral
Cloud Messaging
Integrações
Contas de serviço
Privacidade dos dados
Usuários e permissões
Gerenciar permissões da conta de serviço
SDK Admin do Firebase
Credenciais legadas
Secrets do Database
Todas as contas de serviço
4 contas de serviço
SDK Admin do Firebase
Sua conta de serviço do Firebase pode ser usada para autenticar vários recursos dessa plataforma, como Database, Storage e Auth programaticamente usando o SDK Admin unificado. Saiba mais

Conta de serviço do Firebase
firebase-adminsdk-fbsvc@academia-pro-b0a4b.iam.gserviceaccount.com
Snippet de configuração do SDK Admin

Node.js

Java

Python

Go
var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
