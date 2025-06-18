import { Response } from 'express';
import { db } from '../config/firebase';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

/**
 * Busca o perfil do usuário autenticado no Firestore.
 */
export async function getMyProfile(req: AuthenticatedRequest, res: Response) {
  // O middleware já verificou o token, então 'req.user' deve existir.
  const uid = req.user?.uid;

  if (!uid) {
    return res.status(401).json({ error: 'ID do usuário não encontrado no token.' });
  }

  try {
    const userDoc = await db.collection('users').doc(uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'Usuário não encontrado no banco de dados.' });
    }

    res.status(200).json(userDoc.data());
  } catch (error) {
    console.error("Erro ao buscar perfil do usuário:", error);
    res.status(500).json({ error: 'Erro interno ao buscar dados do usuário.' });
  }
}