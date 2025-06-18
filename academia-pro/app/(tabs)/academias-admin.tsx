import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { theme } from '@/constants/theme';
import { addAcademia, getAcademias } from '@/services/firestoreService';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function AcademiasAdminScreen() {
  const [academias, setAcademias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    nome: '',
    endereco: '',
    modalidades: '',
    nota: '',
    distancia: '',
    horarioFuncionamento: '',
    fotos: '',
    faixaPreco: '',
    parceira: true,
  });

  const fetchAcademias = async () => {
    setLoading(true);
    const data = await getAcademias();
    setAcademias(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAcademias();
  }, []);

  const handleAdd = async () => {
    if (!form.nome || !form.endereco) {
      Alert.alert('Preencha nome e endereço');
      return;
    }
    await addAcademia({
      ...form,
      modalidades: form.modalidades.split(',').map((m) => m.trim()),
      nota: Number(form.nota),
      distancia: Number(form.distancia),
      fotos: form.fotos ? form.fotos.split(',').map((f) => f.trim()) : [],
    });
    setForm({ nome: '', endereco: '', modalidades: '', nota: '', distancia: '', horarioFuncionamento: '', fotos: '', faixaPreco: '', parceira: true });
    setShowForm(false);
    fetchAcademias();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Gerenciar Academias</Text>
      <Button title={showForm ? "Cancelar" : "Adicionar Academia"} onPress={() => setShowForm((v) => !v)} style={styles.addButton} />
      {showForm && (
        <View style={styles.form}>
          <Input label="Nome" value={form.nome} onChangeText={t => setForm(f => ({ ...f, nome: t }))} />
          <Input label="Endereço" value={form.endereco} onChangeText={t => setForm(f => ({ ...f, endereco: t }))} />
          <Input label="Modalidades (separadas por vírgula)" value={form.modalidades} onChangeText={t => setForm(f => ({ ...f, modalidades: t }))} />
          <Input label="Nota" value={form.nota} onChangeText={t => setForm(f => ({ ...f, nota: t }))} keyboardType="numeric" />
          <Input label="Distância (km)" value={form.distancia} onChangeText={t => setForm(f => ({ ...f, distancia: t }))} keyboardType="numeric" />
          <Input label="Horário de Funcionamento" value={form.horarioFuncionamento} onChangeText={t => setForm(f => ({ ...f, horarioFuncionamento: t }))} />
          <Input label="Fotos (URLs separadas por vírgula)" value={form.fotos} onChangeText={t => setForm(f => ({ ...f, fotos: t }))} />
          <Input label="Faixa de Preço" value={form.faixaPreco} onChangeText={t => setForm(f => ({ ...f, faixaPreco: t }))} />
          <Button title="Salvar" onPress={handleAdd} style={styles.saveButton} />
        </View>
      )}
      <Text style={styles.subtitle}>Lista de Academias</Text>
      {loading ? <Text>Carregando...</Text> : (
        <FlatList
          data={academias}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Text style={styles.cardTitle}>{item.nome}</Text>
              <Text style={styles.cardText}>{item.endereco}</Text>
              <Text style={styles.cardText}>Modalidades: {item.modalidades?.join(', ')}</Text>
              <Text style={styles.cardText}>Nota: {item.nota}</Text>
              <Text style={styles.cardText}>Distância: {item.distancia} km</Text>
              <Text style={styles.cardText}>Faixa de Preço: {item.faixaPreco}</Text>
              <Text style={styles.cardText}>Parceira: {item.parceira ? 'Sim' : 'Não'}</Text>
            </Card>
          )}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.gray[50] },
  content: { padding: theme.spacing.xl },
  title: { fontSize: 24, fontFamily: theme.fonts.display.bold, marginBottom: theme.spacing.lg },
  subtitle: { fontSize: 18, fontFamily: theme.fonts.display.bold, marginTop: theme.spacing.xl, marginBottom: theme.spacing.md },
  addButton: { marginBottom: theme.spacing.md },
  form: { backgroundColor: theme.colors.white, borderRadius: 8, padding: theme.spacing.lg, marginBottom: theme.spacing.lg },
  saveButton: { marginTop: theme.spacing.md },
  card: { marginBottom: theme.spacing.md, padding: theme.spacing.md },
  cardTitle: { fontSize: 18, fontFamily: theme.fonts.display.bold },
  cardText: { fontSize: 14, color: theme.colors.gray[700] },
});
