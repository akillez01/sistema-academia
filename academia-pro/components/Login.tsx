import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { login } from "../services/api";

export default function Login({ onLogin }: { onLogin: (token: string) => void }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = async () => {
    try {
      const data = await login(email, senha);
      onLogin(data.token);
    } catch {
      setErro("Login inválido");
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry />
      <Button title="Entrar" onPress={handleLogin} />
      {erro ? <Text>{erro}</Text> : null}
    </View>
  );
}
