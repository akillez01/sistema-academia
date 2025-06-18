import { db } from '@/constants/firebaseConfig';
import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where
} from 'firebase/firestore';

// Academias
export async function addAcademia(data: any) {
  return await addDoc(collection(db, 'academias'), {
    ...data,
    criadoEm: new Date(),
    atualizadoEm: new Date(),
  });
}

export async function getAcademias() {
  const snapshot = await getDocs(collection(db, 'academias'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getAcademiaById(id: string) {
  const ref = doc(db, 'academias', id);
  const snap = await getDoc(ref);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

// Benefícios
export async function addBeneficio(data: any) {
  return await addDoc(collection(db, 'beneficios'), data);
}

export async function getBeneficios() {
  const snapshot = await getDocs(collection(db, 'beneficios'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Treinos
export async function addTreino(data: any) {
  return await addDoc(collection(db, 'treinos'), {
    ...data,
    criadoEm: new Date(),
  });
}

export async function getTreinosByUsuario(usuarioId: string) {
  const q = query(collection(db, 'treinos'), where('usuarioId', '==', usuarioId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
