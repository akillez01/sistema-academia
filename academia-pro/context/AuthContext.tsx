import { auth, db } from '@/constants/firebaseConfig';
import { User } from '@/types/user';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'benefits'> & { password: string }) => Promise<void>;
  logout: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          setUser({ id: firebaseUser.uid, ...userDoc.data() } as User);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password);
    setLoading(false);
  };

  const register = async (data: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'benefits'> & { password: string }) => {
    setLoading(true);
    const { email, password, name, cpf, age, type, registrationNumber, cnpj } = data as any;
    const response = await fetch("http://localhost:3001/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: name,
        email,
        senha: password,
        cpf,
        age,
        type,
        registrationNumber,
        cnpj,
        status: "Ativo"
      })
    });
    if (!response.ok) {
      setLoading(false);
      throw new Error("Erro ao cadastrar usuário");
    }
    // Faz login automático após cadastro
    await signInWithEmailAndPassword(auth, email, password);
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    await signOut(auth);
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
