import React, { useState } from "react";
import { View } from "react-native";
import ListaUsuarios from "../components/ListaUsuarios";
import Login from "../components/Login";

export default function HomeScreen() {
  const [token, setToken] = useState<string | null>(null);

  return (
    <View>
      {!token ? <Login onLogin={setToken} /> : <ListaUsuarios token={token} />}
    </View>
  );
}
