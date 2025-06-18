import admin from "firebase-admin";
import serviceAccount from "../serviceAccountKey.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const db = admin.firestore();

async function syncUsersFromAuthToFirestore() {
  try {
    console.log("Sincronizando usuários do Auth para o Firestore...");
    const listUsers = await admin.auth().listUsers();
    
    console.log(`Total de ${listUsers.users.length} usuários encontrados no Auth.`);
    
    for (const user of listUsers.users) {
      console.log(`\nProcessando ${user.email} (${user.uid})`);
      
      // Verifica se o usuário já existe no Firestore
      const userDoc = await db.collection("users").doc(user.uid).get();
      
      if (userDoc.exists) {
        console.log(`- Usuário já existe no Firestore, atualizando...`);
        // Atualiza dados do usuário no Firestore (mantendo dados existentes)
        await db.collection("users").doc(user.uid).update({
          email: user.email,
          nome: user.displayName || user.email?.split('@')[0] || "Usuário",
          uid: user.uid,
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
      } else {
        console.log(`- Usuário não encontrado no Firestore, criando...`);
        // Cria novo documento para o usuário
        await db.collection("users").doc(user.uid).set({
          email: user.email,
          nome: user.displayName || user.email?.split('@')[0] || "Usuário",
          status: "Ativo",
          uid: user.uid,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
      }
      
      console.log(`✓ Usuário ${user.email} sincronizado com sucesso!`);
    }
    
    console.log("\n✅ Todos os usuários foram sincronizados com sucesso!");
    process.exit(0);
  } catch (error) {
    const err = error as Error;
    console.error("Erro:", err.message);
    process.exit(1);
  }
}

syncUsersFromAuthToFirestore();
