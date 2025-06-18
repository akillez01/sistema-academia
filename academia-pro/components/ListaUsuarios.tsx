import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { getUsers } from "../services/api";

export default function ListaUsuarios({ token }: { token: string }) {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    getUsers(token).then(setUsuarios);
  }, [token]);

  return (
    <View>
      <Text>Usuários:</Text>
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.nome}</Text>}
      />
    </View>
  );
}
