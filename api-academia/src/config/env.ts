import dotenv from 'dotenv';

dotenv.config();

function getEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`A variável de ambiente obrigatória '${key}' não foi definida.`);
  }
  return value;
}

export const env = {
  port: process.env.PORT || '3001',
  firebase: {
    projectId: getEnv('FIREBASE_PROJECT_ID'),
    clientEmail: getEnv('FIREBASE_CLIENT_EMAIL'),
    privateKey: getEnv('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n'),
  },
};