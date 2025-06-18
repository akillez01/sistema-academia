import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { theme } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import { ArrowLeft, Building2, CreditCard, User } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

type UserType = 'student' | 'gym_partner' | 'guardian';

export default function RegisterScreen() {
  const [userType, setUserType] = useState<UserType>('student');
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    age: '',
    registrationNumber: '',
    cnpj: '',
    email: '',
    password: '',
  });
  const { register, loading } = useAuth();

  const handleRegister = async () => {
    // Validação dinâmica por tipo
    if (!formData.name || !formData.email || !formData.password) {
      Alert.alert('Erro', 'Preencha nome, e-mail e senha.');
      return;
    }
    if (userType === 'student' && (!formData.cpf || !formData.age)) {
      Alert.alert('Erro', 'Preencha CPF e idade para aluno.');
      return;
    }
    if (userType === 'gym_partner' && !formData.cnpj) {
      Alert.alert('Erro', 'Preencha o CNPJ para academia.');
      return;
    }
    try {
      await register({
        name: formData.name,
        cpf: userType !== 'gym_partner' ? formData.cpf : undefined,
        cnpj: userType === 'gym_partner' ? formData.cnpj : undefined,
        age: userType === 'student' ? Number(formData.age) : undefined,
        type: userType,
        registrationNumber: userType === 'student' ? formData.registrationNumber : undefined,
        email: formData.email,
        password: formData.password,
      });
      router.replace('/(tabs)');
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível criar a conta. Verifique os dados.');
    }
  };

  const formatCPF = (text: string) => {
    const numbers = text.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={theme.colors.black} />
        </TouchableOpacity>
        <Text style={styles.title}>Criar Conta</Text>
      </View>

      <View style={styles.userTypeSection}>
        <Text style={styles.sectionTitle}>Tipo de usuário</Text>
        
        <View style={styles.userTypeOptions}>
          <TouchableOpacity
            style={[
              styles.userTypeCard,
              userType === 'student' && styles.selectedCard,
            ]}
            onPress={() => setUserType('student')}
          >
            <User
              size={24}
              color={userType === 'student' ? theme.colors.primary : theme.colors.gray[500]}
            />
            <Text style={[
              styles.userTypeText,
              userType === 'student' && styles.selectedText,
            ]}>
              Aluno
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.userTypeCard,
              userType === 'gym_partner' && styles.selectedCard,
            ]}
            onPress={() => setUserType('gym_partner')}
          >
            <Building2
              size={24}
              color={userType === 'gym_partner' ? theme.colors.primary : theme.colors.gray[500]}
            />
            <Text style={[
              styles.userTypeText,
              userType === 'gym_partner' && styles.selectedText,
            ]}>
              Academia
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.userTypeCard,
              userType === 'guardian' && styles.selectedCard,
            ]}
            onPress={() => setUserType('guardian')}
          >
            <CreditCard
              size={24}
              color={userType === 'guardian' ? theme.colors.primary : theme.colors.gray[500]}
            />
            <Text style={[
              styles.userTypeText,
              userType === 'guardian' && styles.selectedText,
            ]}>
              Responsável
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Card style={styles.formCard}>
        <Input
          label="Nome completo *"
          value={formData.name}
          onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
          placeholder="Digite seu nome completo"
        />
        {userType !== 'gym_partner' && (
          <Input
            label="CPF *"
            value={formData.cpf}
            onChangeText={(text) => setFormData(prev => ({ ...prev, cpf: formatCPF(text) }))}
            placeholder="000.000.000-00"
            keyboardType="numeric"
            maxLength={14}
          />
        )}
        {userType === 'gym_partner' && (
          <Input
            label="CNPJ *"
            value={formData.cnpj}
            onChangeText={(text) => setFormData(prev => ({ ...prev, cnpj: text }))}
            placeholder="Digite o CNPJ da academia"
            keyboardType="numeric"
          />
        )}
        {userType === 'student' && (
          <Input
            label="Idade *"
            value={formData.age}
            onChangeText={(text) => setFormData(prev => ({ ...prev, age: text }))}
            placeholder="Digite sua idade"
            keyboardType="numeric"
          />
        )}
        {userType === 'student' && (
          <Input
            label="Número da matrícula"
            value={formData.registrationNumber}
            onChangeText={(text) => setFormData(prev => ({ ...prev, registrationNumber: text }))}
            placeholder="Digite o número da sua matrícula"
          />
        )}
        <Input
          label="E-mail *"
          value={formData.email}
          onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
          placeholder="Digite seu e-mail"
          keyboardType="email-address"
        />
        <Input
          label="Senha *"
          value={formData.password}
          onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))}
          placeholder="Digite sua senha"
          secureTextEntry
        />

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Próximos passos:</Text>
          <Text style={styles.infoText}>
            • Upload do comprovante de matrícula{'\n'}
            • Foto para carteira digital{'\n'}
            • Verificação dos documentos
          </Text>
        </View>

        <Button
          title="Criar Conta"
          onPress={handleRegister}
          style={styles.registerButton}
        />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[50],
  },
  content: {
    flexGrow: 1,
    paddingBottom: theme.spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.xl,
    paddingTop: 60,
    backgroundColor: theme.colors.white,
  },
  backButton: {
    marginRight: theme.spacing.md,
  },
  title: {
    fontSize: 24,
    fontFamily: theme.fonts.display.bold,
    color: theme.colors.black,
  },
  userTypeSection: {
    padding: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.black,
    marginBottom: theme.spacing.md,
  },
  userTypeOptions: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  userTypeCard: {
    flex: 1,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.gray[200],
  },
  selectedCard: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary + '10',
  },
  userTypeText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: theme.colors.gray[600],
    marginTop: theme.spacing.sm,
  },
  selectedText: {
    color: theme.colors.primary,
  },
  formCard: {
    margin: theme.spacing.xl,
    marginTop: 0,
  },
  infoCard: {
    backgroundColor: theme.colors.gray[50],
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.lg,
  },
  infoTitle: {
    fontSize: 14,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.gray[700],
    marginBottom: theme.spacing.xs,
  },
  infoText: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray[600],
    lineHeight: 18,
  },
  registerButton: {
    marginTop: theme.spacing.md,
  },
});