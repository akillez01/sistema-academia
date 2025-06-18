import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { db } from '@/constants/firebaseConfig';
import { theme } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text } from 'react-native';

export default function EditProfileScreen() {
  const { user, setUser } = useAuth() as any;
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    profilePhoto: user?.profilePhoto || '',
  });
  const [loading, setLoading] = useState(false);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets[0].uri) {
      setForm(f => ({ ...f, profilePhoto: result.assets[0].uri }));
    }
  };

  const handleSave = async () => {
    if (!form.name || !form.email) {
      Alert.alert('Erro', 'Nome e e-mail são obrigatórios.');
      return;
    }
    setLoading(true);
    let photoUrl = form.profilePhoto;
    if (form.profilePhoto && form.profilePhoto !== user.profilePhoto && form.profilePhoto.startsWith('file')) {
      try {
        const storage = getStorage();
        const response = await fetch(form.profilePhoto);
        const blob = await response.blob();
        const storageRef = ref(storage, `profilePhotos/${user.id}.jpg`);
        await uploadBytes(storageRef, blob);
        photoUrl = await getDownloadURL(storageRef);
      } catch (e) {
        Alert.alert('Erro', 'Não foi possível fazer upload da foto.');
      }
    }
    try {
      await updateDoc(doc(db, 'users', user.id), {
        name: form.name,
        email: form.email,
        phone: form.phone,
        profilePhoto: photoUrl,
        updatedAt: new Date(),
      });
      setUser({ ...user, ...form, profilePhoto: photoUrl, updatedAt: new Date() });
      Alert.alert('Sucesso', 'Perfil atualizado!');
      router.back();
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível atualizar o perfil.');
    }
    setLoading(false);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Editar Perfil</Text>
      <Button title="Alterar Foto" onPress={handlePickImage} style={{ marginBottom: theme.spacing.md }} />
      {form.profilePhoto ? (
        <Image source={{ uri: form.profilePhoto }} style={{ width: 100, height: 100, borderRadius: 50, alignSelf: 'center', marginBottom: theme.spacing.md }} />
      ) : null}
      <Input
        label="Nome"
        value={form.name}
        onChangeText={text => setForm(f => ({ ...f, name: text }))}
        placeholder="Seu nome"
      />
      <Input
        label="E-mail"
        value={form.email}
        onChangeText={text => setForm(f => ({ ...f, email: text }))}
        placeholder="Seu e-mail"
        keyboardType="email-address"
      />
      <Input
        label="Telefone"
        value={form.phone}
        onChangeText={text => setForm(f => ({ ...f, phone: text }))}
        placeholder="Seu telefone"
        keyboardType="phone-pad"
      />
      <Button title="Salvar" onPress={handleSave} loading={loading} style={styles.saveButton} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.gray[50] },
  content: { padding: theme.spacing.xl },
  title: { fontSize: 24, fontFamily: theme.fonts.display.bold, marginBottom: theme.spacing.lg },
  saveButton: { marginTop: theme.spacing.xl },
});
