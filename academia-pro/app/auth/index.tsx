import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { theme } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { CreditCard, Mail, Shield, User } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

export default function AuthScreen() {
  const { width } = useWindowDimensions();
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, user } = useAuth();
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  // Novo: login por email OU CPF
  const handleLogin = async () => {
    try {
      const loginId = email || cpf;
      await login(loginId, password);
      router.replace('/(tabs)');
    } catch (e) {
      alert('Erro ao fazer login. Verifique seus dados.');
    }
  };

  // Função para solicitar troca de senha
  async function handleResetPassword() {
    if (!resetEmail) {
      Alert.alert("Informe o email para redefinir a senha.");
      return;
    }
    setResetLoading(true);
    try {
      // Chame sua API ou o Firebase Auth REST para enviar email de redefinição
      const res = await fetch("http://localhost:3001/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail })
      });
      if (!res.ok) throw new Error("Falha ao enviar email de redefinição");
      Alert.alert("Verifique seu email para redefinir a senha.");
      setShowReset(false);
      setResetEmail("");
    } catch (e) {
      Alert.alert("Erro ao solicitar redefinição de senha.");
    } finally {
      setResetLoading(false);
    }
  }

  const formatCPF = (text: string) => {
    const numbers = text.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, { minHeight: width < 400 ? 600 : 0 }]}> 
      <LinearGradient
        colors={[theme.colors.black, theme.colors.blackLight]}
        style={[styles.header, { paddingTop: width < 400 ? 40 : 60 }]}
      >
        <View style={styles.logoContainer}>
          <Text style={[styles.logo, { fontSize: width < 400 ? 28 : 36 } ]}>AcadMeia</Text>
          <Text style={[styles.tagline, { fontSize: width < 400 ? 13 : 16 } ]}>Sua carteira estudantil digital</Text>
        </View>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=800' }}
          style={[styles.heroImage, { width: width * 0.8, height: width * 0.4, maxWidth: 350, maxHeight: 180 }]}
          resizeMode="cover"
        />
      </LinearGradient>
      <View style={[styles.formContainer, { paddingHorizontal: width < 400 ? 16 : theme.spacing.xl }] }>
        <Text style={styles.title}>Entre na sua conta</Text>
        <Text style={styles.subtitle}>
          Acesse sua carteira digital e desfrute dos benefícios
        </Text>

        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu email"
          keyboardType="email-address"
          icon={<Mail size={20} color={theme.colors.gray[400]} />}
        />
        <Text style={{textAlign: 'center', color: theme.colors.gray[500], marginVertical: 4}}>ou</Text>
        <Input
          label="CPF ou Matrícula"
          value={cpf}
          onChangeText={(text) => setCpf(formatCPF(text))}
          placeholder="000.000.000-00"
          keyboardType="numeric"
          maxLength={14}
          icon={<User size={20} color={theme.colors.gray[400]} />}
        />
        <Input
          label="Senha"
          value={password}
          onChangeText={setPassword}
          placeholder="Digite sua senha"
          secureTextEntry
          icon={<Shield size={20} color={theme.colors.gray[400]} />}
        />

        <Button
          title="Entrar"
          onPress={handleLogin}
          loading={loading}
          style={styles.loginButton}
        />
        <TouchableOpacity onPress={() => setShowReset(true)} style={{ marginTop: 12, alignSelf: 'center' }}>
          <Text style={{ color: theme.colors.primary, fontSize: 14 }}>Esqueci minha senha</Text>
        </TouchableOpacity>
        {showReset && (
          <View style={{ marginTop: 16, backgroundColor: '#f8f8f8', padding: 16, borderRadius: 8 }}>
            <Text style={{ fontSize: 16, marginBottom: 8 }}>Redefinir senha</Text>
            <Input
              label="Email"
              value={resetEmail}
              onChangeText={setResetEmail}
              placeholder="Digite seu email"
              keyboardType="email-address"
            />
            <Button
              title={resetLoading ? "Enviando..." : "Enviar link de redefinição"}
              onPress={handleResetPassword}
              loading={resetLoading}
              style={{ marginTop: 8 }}
            />
            <TouchableOpacity onPress={() => setShowReset(false)} style={{ marginTop: 8 }}>
              <Text style={{ color: theme.colors.primary, textAlign: 'center' }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>ou</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => router.push('/auth/register')}
        >
          <Text style={styles.registerText}>Criar nova conta</Text>
        </TouchableOpacity>

        <View style={styles.benefits}>
          <Text style={styles.benefitsTitle}>Benefícios disponíveis:</Text>
          <View style={styles.benefitItem}>
            <CreditCard size={20} color={theme.colors.primary} />
            <Text style={styles.benefitText}>50% de desconto em mensalidades</Text>
          </View>
          <View style={styles.benefitItem}>
            <Shield size={20} color={theme.colors.primary} />
            <Text style={styles.benefitText}>Acesso a todas as unidades parceiras</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  content: {
    flexGrow: 1,
  },
  header: {
    padding: theme.spacing.xl,
    paddingTop: 60,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  logo: {
    fontSize: 36,
    fontFamily: theme.fonts.display.bold,
    color: theme.colors.primary,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.white,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
  },
  heroImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: theme.colors.primary,
  },
  formContainer: {
    flex: 1,
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
    marginTop: -theme.spacing.lg,
  },
  title: {
    fontSize: 28,
    fontFamily: theme.fonts.display.bold,
    color: theme.colors.black,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray[600],
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  loginButton: {
    marginTop: theme.spacing.lg,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.gray[200],
  },
  dividerText: {
    paddingHorizontal: theme.spacing.md,
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray[500],
  },
  registerButton: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    alignItems: 'center',
  },
  registerText: {
    fontSize: 16,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.primary,
  },
  benefits: {
    marginTop: theme.spacing.xl,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.gray[50],
    borderRadius: theme.borderRadius.lg,
  },
  benefitsTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.black,
    marginBottom: theme.spacing.md,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  benefitText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray[700],
    marginLeft: theme.spacing.sm,
    flex: 1,
  },
});