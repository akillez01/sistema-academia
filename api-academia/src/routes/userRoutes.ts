import { Router } from "express";
import admin from "firebase-admin";
import { db } from "../services/firebase";

const router = Router();

// Listar todos os usuários
router.get("/", async (req, res) => {
  try {
    const snapshot = await db.collection("users").get();
    const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

// Buscar usuário por ID
router.get("/:id", async (req, res) => {
  try {
    const doc = await db.collection("users").doc(req.params.id).get();
    if (!doc.exists)
      return res.status(404).json({ error: "Usuário não encontrado" });
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuário" });
  }
});

// Criar usuário
router.post("/", async (req, res) => {
  try {
    const { nome, email, senha, status, cpf, age, registrationNumber, type } = req.body;
    // Cria usuário no Firebase Auth
    const userRecord = await admin.auth().createUser({
      email,
      password: senha || "academia123",
      displayName: nome,
    });
    // Salva no Firestore
    await db.collection("users").doc(userRecord.uid).set({
      nome,
      email,
      status: status || "Ativo",
      uid: userRecord.uid,
      cpf,
      age,
      registrationNumber,
      type,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.status(201).json({ id: userRecord.uid, nome, email, status });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar usuário", details: error instanceof Error ? error.message : String(error) });
  }
});

// Atualizar usuário
router.put("/:id", async (req, res) => {
  try {
    const { name, email, ...rest } = req.body;
    await db.collection("users").doc(req.params.id).update({
      name,
      email,
      ...rest,
    });
    res.json({ id: req.params.id, name, email, ...rest });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
});

// Deletar usuário
router.delete("/:id", async (req, res) => {
  try {
    await db.collection("users").doc(req.params.id).delete();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar usuário" });
  }
});

// Estatísticas para o dashboard
router.get("/../stats", async (req, res) => {
  try {
    // Exemplo: buscar membros ativos, receita, check-ins, retenção
    const usersSnap = await db.collection("users").get();
    const membersActive = usersSnap.docs.filter(
      (doc) => (doc.data().status || "Ativo") === "Ativo"
    ).length;
    // Simulação de dados
    const stats = [
      {
        title: "Membros Ativos",
        value: membersActive.toString(),
        change: "+12%",
        changeType: "positive",
        icon: "Users",
      },
      {
        title: "Receita Mensal",
        value: "R$ 45.231",
        change: "+8%",
        changeType: "positive",
        icon: "DollarSign",
      },
      {
        title: "Check-ins Hoje",
        value: "89",
        change: "+23%",
        changeType: "positive",
        icon: "Activity",
      },
      {
        title: "Taxa de Retenção",
        value: "94.5%",
        change: "+2%",
        changeType: "positive",
        icon: "TrendingUp",
      },
    ];
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar estatísticas" });
  }
});

// Receita dos últimos 6 meses para o gráfico
router.get("/../revenue", async (req, res) => {
  try {
    // Simulação de dados
    const revenue = [
      { month: "Jul", value: 35000 },
      { month: "Ago", value: 42000 },
      { month: "Set", value: 38000 },
      { month: "Out", value: 45000 },
      { month: "Nov", value: 41000 },
      { month: "Dez", value: 48000 },
    ];
    res.json(revenue);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar receita" });
  }
});

export default router;
