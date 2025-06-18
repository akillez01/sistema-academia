import admin from 'firebase-admin';
import { env } from '../src/config/env'; // Ajuste o caminho conforme sua estrutura

// Inicialização temporária do Admin SDK apenas para o script
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: env.firebase.projectId,
    clientEmail: env.firebase.clientEmail,
    privateKey: env.firebase.privateKey,
  }),
});

const db = admin.firestore();

async function createUser() {
  try {
    // Cria usuário no Auth
    const userRecord = await admin.auth().createUser({
      email: "teste@email.com",
      password: "teste123",
      displayName: "Usuário Teste",
    });
    
    // Salva no Firestore
    await db.collection("users").doc(userRecord.uid).set({
      nome: "Usuário Teste",
      email: "teste@email.com",
      status: "Ativo",
      uid: userRecord.uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    
    console.log("Usuário criado com sucesso:", userRecord.uid);
    process.exit(0);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    process.exit(1);
  }
}

createUser();