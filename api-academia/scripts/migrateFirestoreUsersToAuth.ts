import admin from "firebase-admin";
import serviceAccount from "../serviceAccountKey.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const db = admin.firestore();

async function migrateUsers() {
  const snapshot = await db.collection("users").get();
  for (const doc of snapshot.docs) {
    const data = doc.data();
    if (!data.email) continue;
    try {
      // Tenta criar usuário no Auth, se não existir
      await admin.auth().getUserByEmail(data.email);
      console.log(`Usuário já existe no Auth: ${data.email}`);
    } catch {
      const senhaPadrao = "academia123";
      const userRecord = await admin.auth().createUser({
        email: data.email,
        password: senhaPadrao,
        displayName: data.nome || data.name || "Usuário",
      });
      // Atualiza Firestore com o uid
      await db.collection("users").doc(doc.id).set({
        ...data,
        uid: userRecord.uid,
      }, { merge: true });
      console.log(`Usuário migrado: ${data.email}`);
    }
  }
  console.log("Migração concluída!");
  process.exit(0);
}

migrateUsers();
