import admin from "firebase-admin";
import serviceAccount from "../serviceAccountKey.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

async function listAndDeleteUser() {
  try {
    // Lista todos os usuários
    console.log("Listando usuários...");
    const listUsers = await admin.auth().listUsers();
    listUsers.users.forEach((user) => {
      console.log(`- ${user.uid}: ${user.email} (${user.displayName || 'Sem nome'})`);
    });

    // Pede o email a ser excluído
    const emailToDelete = process.argv[2]; // Pega o email da linha de comando
    
    if (!emailToDelete) {
      console.log("\nPara deletar um usuário, execute o script com o email como parâmetro:");
      console.log("npx ts-node scripts/deleteUser.ts email@example.com");
      process.exit(0);
    }
    
    try {
      // Procura o usuário pelo email
      const userRecord = await admin.auth().getUserByEmail(emailToDelete);
      
      // Deleta o usuário
      await admin.auth().deleteUser(userRecord.uid);
      console.log(`\nUsuário ${emailToDelete} (${userRecord.uid}) deletado com sucesso!`);
      
      // Opcional: deletar também do Firestore
      try {
        const db = admin.firestore();
        await db.collection("users").doc(userRecord.uid).delete();
        console.log(`Dados do usuário removidos do Firestore.`);
      } catch (error) {
        const firestoreError = error as Error;
        console.log(`Nota: Não foi possível remover dados do Firestore: ${firestoreError.message || 'erro desconhecido'}`);
      }
      
    } catch (error) {
      const authError = error as Error;
      console.error(`\nErro ao deletar usuário: ${authError.message || 'erro desconhecido'}`);
    }
    
    process.exit(0);
  } catch (error) {
    const generalError = error as Error;
    console.error("Erro:", generalError.message || 'erro desconhecido');
    process.exit(1);
  }
}

listAndDeleteUser();
