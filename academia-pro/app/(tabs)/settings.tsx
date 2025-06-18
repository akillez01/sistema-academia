import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { theme } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import { Bell, Camera, ChevronRight, CreditCard, CreditCard as Edit3, CircleHelp as HelpCircle, LogOut, Shield } from 'lucide-react-native';
import React from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function SettingsScreen() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Sair da conta',
      'Tem certeza que deseja sair da sua conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: logout,
        },
      ]
    );
  };

  const menuItems = [
    {
      id: 1,
      title: 'Editar Perfil',
      subtitle: 'Altere suas informações pessoais',
      icon: Edit3,
      onPress: () => router.push('/(tabs)/edit-profile'),
    },
    {
      id: 2,
      title: 'Carteira Digital',
      subtitle: 'Gerencie sua carteira estudantil',
      icon: CreditCard,
      onPress: () => router.push('/(tabs)/card'),
    },
    {
      id: 3,
      title: 'Notificações',
      subtitle: 'Configure suas preferências',
      icon: Bell,
      onPress: () => {},
    },
    {
      id: 4,
      title: 'Privacidade e Segurança',
      subtitle: 'Controle seus dados e privacidade',
      icon: Shield,
      onPress: () => {},
    },
    {
      id: 5,
      title: 'Ajuda e Suporte',
      subtitle: 'FAQ e contato com suporte',
      icon: HelpCircle,
      onPress: () => {},
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Perfil</Text>
        <Text style={styles.subtitle}>Gerencie sua conta AcadMeia</Text>
      </View>
      {/* Profile Card */}
      <Card style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: user?.profilePhoto || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200' }} style={styles.profileImage} />
            <TouchableOpacity style={styles.cameraButton}>
              <Camera size={16} color={theme.colors.white} />
            </TouchableOpacity>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{user?.name || '-'}</Text>
            <Text style={styles.userEmail}>{user?.email || '-'}</Text>
            <Text style={styles.memberSince}>Membro desde {user?.createdAt ? new Date(user.createdAt).getFullYear() : '-'}</Text>
          </View>
        </View>
        <View style={styles.profileDetails}>
          <View className="detailRow">
            <Text style={styles.detailLabel}>CPF:</Text>
            <Text style={styles.detailValue}>{user?.cpf || '-'}</Text>
          </View>
          <View className="detailRow">
            <Text style={styles.detailLabel}>Telefone:</Text>
            <Text style={styles.detailValue}>{user?.phone || '-'}</Text>
          </View>
        </View>
      </Card>

      {/* Menu Items */}
      <View style={styles.menuSection}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={item.onPress}
          >
            <View style={styles.menuIconContainer}>
              <item.icon size={20} color={theme.colors.primary} />
            </View>
            
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
            </View>
            
            <ChevronRight size={20} color={theme.colors.gray[400]} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Statistics Card */}
      <Card style={styles.statsCard}>
        <Text style={styles.statsTitle}>Suas Estatísticas</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>47</Text>
            <Text style={styles.statLabel}>Academias Parceiras</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>124</Text>
            <Text style={styles.statLabel}>Treinos Realizados</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>R$ 1.240</Text>
            <Text style={styles.statLabel}>Economia Total</Text>
          </View>
        </View>
      </Card>

      {/* Support Section */}
      <Card style={styles.supportCard}>
        <Text style={styles.supportTitle}>Precisa de ajuda?</Text>
        <Text style={styles.supportText}>
          Nossa equipe está pronta para ajudar você com qualquer dúvida sobre o AcadMeia.
        </Text>
        <Button
          title="Entrar em Contato"
          onPress={() => {}}
          variant="outline"
          style={styles.supportButton}
        />
      </Card>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <LogOut size={20} color={theme.colors.error} />
        <Text style={styles.logoutText}>Sair da Conta</Text>
      </TouchableOpacity>

      {/* App Version */}
      <Text style={styles.versionText}>AcadMeia v1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[50],
  },
  content: {
    paddingBottom: theme.spacing.xl,
  },
  header: {
    padding: theme.spacing.xl,
    paddingTop: 60,
    backgroundColor: theme.colors.white,
  },
  title: {
    fontSize: 28,
    fontFamily: theme.fonts.display.bold,
    color: theme.colors.black,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray[600],
    marginTop: theme.spacing.xs,
  },
  profileCard: {
    margin: theme.spacing.xl,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  profileImageContainer: {
    position: 'relative',
    marginRight: theme.spacing.md,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    backgroundColor: theme.colors.primary,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: theme.colors.white,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontFamily: theme.fonts.display.semiBold,
    color: theme.colors.black,
  },
  userEmail: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray[600],
    marginTop: theme.spacing.xs,
  },
  memberSince: {
    fontSize: 12,
    fontFamily: theme.fonts.medium,
    color: theme.colors.primary,
    marginTop: theme.spacing.xs,
  },
  profileDetails: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[100],
    paddingTop: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: theme.colors.gray[600],
  },
  detailValue: {
    fontSize: 14,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.black,
  },
  menuSection: {
    paddingHorizontal: theme.spacing.xl,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: theme.colors.primary + '20',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.black,
  },
  menuSubtitle: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray[600],
    marginTop: theme.spacing.xs,
  },
  statsCard: {
    margin: theme.spacing.xl,
  },
  statsTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.display.semiBold,
    color: theme.colors.black,
    marginBottom: theme.spacing.md,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontFamily: theme.fonts.display.bold,
    color: theme.colors.primary,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray[600],
    textAlign: 'center',
    marginTop: theme.spacing.xs,
  },
  supportCard: {
    margin: theme.spacing.xl,
    alignItems: 'center',
    backgroundColor: theme.colors.gray[100],
  },
  supportTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.display.semiBold,
    color: theme.colors.black,
    marginBottom: theme.spacing.xs,
  },
  supportText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray[600],
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  supportButton: {
    alignSelf: 'stretch',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: theme.spacing.xl,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing.sm,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.error,
  },
  versionText: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray[500],
    textAlign: 'center',
    marginTop: theme.spacing.lg,
  },
});