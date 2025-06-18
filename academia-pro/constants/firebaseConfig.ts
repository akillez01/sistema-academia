import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBGPeXPmNBLqzrSGFOpJP5vFE3ooL_dxRg",
  authDomain: "academia-pro-b0a4b.firebaseapp.com",
  projectId: "academia-pro-b0a4b",
  storageBucket: "academia-pro-b0a4b.appspot.com", // Corrigido: .appspot.com
  messagingSenderId: "294492141667",
  appId: "1:294492141667:web:a3471997d2fcd9406fa056"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);