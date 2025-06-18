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

async function createAdmin() {
  const adminEmail = "admin@email.com";
  const adminPassword = "admin123"; // Troque por uma senha forte

  console.log(`Verificando se o usuário ${adminEmail} já existe...`);

  try {
    let userRecord;
    try {
      // Tenta buscar o usuário pelo email
      userRecord = await admin.auth().getUserByEmail(adminEmail);
      console.log("Usuário já existe no Firebase Authentication.");
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        // Se não existir, cria o usuário
        console.log("Usuário não encontrado. Criando novo usuário administrador...");
        userRecord = await admin.auth().createUser({
          email: adminEmail,
          password: adminPassword,
          displayName: "Administrador",
          emailVerified: true,
        });
        console.log("Usuário administrador criado com sucesso no Authentication:", userRecord.uid);
      } else {
        throw error; // Lança outros erros
      }
    }

    // Define as permissões personalizadas (custom claims) de admin
    await admin.auth().setCustomUserClaims(userRecord.uid, { admin: true });
    console.log(`Permissões de 'admin: true' definidas para o usuário ${adminEmail}.`);

    // Cria ou atualiza o documento do usuário no Firestore
    const userDocRef = admin.firestore().collection('users').doc(userRecord.uid);
    await userDocRef.set({
      name: "Administrador",
      email: adminEmail,
      role: "admin", // Usando 'role' em vez de 'type' para clareza
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });

    console.log("Documento do usuário administrador criado/atualizado no Firestore.");
    console.log("✅ Processo de criação do admin concluído com sucesso!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Erro ao executar o script de criação do admin:", error);
    process.exit(1);
  }
}

createAdmin();