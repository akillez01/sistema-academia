import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { theme } from '@/constants/theme';
import { addBeneficio, getBeneficios } from '@/services/firestoreService';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function BeneficiosAdminScreen() {
  const [beneficios, setBeneficios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    tipo: '',
    descricao: '',
    desconto: '',
    status: 'active',
    validade: '',
    icon: '',
  });

  const fetchBeneficios = async () => {
    setLoading(true);
    const data = await getBeneficios();
    setBeneficios(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBeneficios();
  }, []);

  const handleAdd = async () => {
    if (!form.tipo || !form.descricao) {
      Alert.alert('Preencha tipo e descrição');
      return;
    }
    await addBeneficio({
      ...form,
      desconto: Number(form.desconto),
    });
    setForm({ tipo: '', descricao: '', desconto: '', status: 'active', validade: '', icon: '' });
    setShowForm(false);
    fetchBeneficios();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Gerenciar Benefícios</Text>
      <Button title={showForm ? "Cancelar" : "Adicionar Benefício"} onPress={() => setShowForm((v) => !v)} style={styles.addButton} />
      {showForm && (
        <View style={styles.form}>
          <Input label="Tipo" value={form.tipo} onChangeText={t => setForm(f => ({ ...f, tipo: t }))} />
          <Input label="Descrição" value={form.descricao} onChangeText={t => setForm(f => ({ ...f, descricao: t }))} />
          <Input label="Desconto (%)" value={form.desconto} onChangeText={t => setForm(f => ({ ...f, desconto: t }))} keyboardType="numeric" />
          <Input label="Status" value={form.status} onChangeText={t => setForm(f => ({ ...f, status: t }))} />
          <Input label="Validade (AAAA-MM-DD)" value={form.validade} onChangeText={t => setForm(f => ({ ...f, validade: t }))} />
          <Input label="Ícone" value={form.icon} onChangeText={t => setForm(f => ({ ...f, icon: t }))} />
          <Button title="Salvar" onPress={handleAdd} style={styles.saveButton} />
        </View>
      )}
      <Text style={styles.subtitle}>Lista de Benefícios</Text>
      {loading ? <Text>Carregando...</Text> : (
        <FlatList
          data={beneficios}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Text style={styles.cardTitle}>{item.tipo}</Text>
              <Text style={styles.cardText}>{item.descricao}</Text>
              <Text style={styles.cardText}>Desconto: {item.desconto}%</Text>
              <Text style={styles.cardText}>Status: {item.status}</Text>
              <Text style={styles.cardText}>Validade: {item.validade}</Text>
              <Text style={styles.cardText}>Ícone: {item.icon}</Text>
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
