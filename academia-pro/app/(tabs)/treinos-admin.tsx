import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { theme } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { addTreino, getTreinosByUsuario } from '@/services/firestoreService';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function TreinosAdminScreen() {
  const { user } = useAuth();
  const [treinos, setTreinos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    academiaId: '',
    data: '',
    duracao: '',
    checkIn: '',
    checkOut: '',
    qrCodeUsado: false,
  });

  const fetchTreinos = async () => {
    if (!user) return;
    setLoading(true);
    const data = await getTreinosByUsuario(user.id);
    setTreinos(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTreinos();
  }, [user]);

  const handleAdd = async () => {
    if (!form.academiaId || !form.data) {
      Alert.alert('Preencha academia e data');
      return;
    }
    await addTreino({
      ...form,
      usuarioId: user.id,
      duracao: Number(form.duracao),
      checkIn: form.checkIn || form.data,
      checkOut: form.checkOut || '',
      qrCodeUsado: !!form.qrCodeUsado,
    });
    setForm({ academiaId: '', data: '', duracao: '', checkIn: '', checkOut: '', qrCodeUsado: false });
    setShowForm(false);
    fetchTreinos();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Gerenciar Treinos</Text>
      <Button title={showForm ? "Cancelar" : "Adicionar Treino"} onPress={() => setShowForm((v) => !v)} style={styles.addButton} />
      {showForm && (
        <View style={styles.form}>
          <Input label="ID da Academia" value={form.academiaId} onChangeText={t => setForm(f => ({ ...f, academiaId: t }))} />
          <Input label="Data (AAAA-MM-DDTHH:mm:ssZ)" value={form.data} onChangeText={t => setForm(f => ({ ...f, data: t }))} />
          <Input label="Duração (min)" value={form.duracao} onChangeText={t => setForm(f => ({ ...f, duracao: t }))} keyboardType="numeric" />
          <Input label="Check-in (opcional)" value={form.checkIn} onChangeText={t => setForm(f => ({ ...f, checkIn: t }))} />
          <Input label="Check-out (opcional)" value={form.checkOut} onChangeText={t => setForm(f => ({ ...f, checkOut: t }))} />
          <Input label="QR Code Usado (true/false)" value={form.qrCodeUsado ? 'true' : 'false'} onChangeText={t => setForm(f => ({ ...f, qrCodeUsado: t === 'true' }))} />
          <Button title="Salvar" onPress={handleAdd} style={styles.saveButton} />
        </View>
      )}
      <Text style={styles.subtitle}>Lista de Treinos</Text>
      {loading ? <Text>Carregando...</Text> : (
        <FlatList
          data={treinos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Text style={styles.cardTitle}>Academia: {item.academiaId}</Text>
              <Text style={styles.cardText}>Data: {item.data}</Text>
              <Text style={styles.cardText}>Duração: {item.duracao} min</Text>
              <Text style={styles.cardText}>Check-in: {item.checkIn}</Text>
              <Text style={styles.cardText}>Check-out: {item.checkOut}</Text>
              <Text style={styles.cardText}>QR Code Usado: {item.qrCodeUsado ? 'Sim' : 'Não'}</Text>
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
