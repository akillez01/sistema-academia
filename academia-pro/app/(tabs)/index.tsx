import { Card } from '@/components/ui/Card';
import { theme } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import {
    Calendar,
    Clock,
    CreditCard,
    MapPin,
    Star,
    TrendingUp,
    Zap,
} from 'lucide-react-native';
import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function HomeScreen() {
  const { user, logout } = useAuth();

  const stats = {
    workoutsThisMonth: 12,
    totalPartnerGyms: 47,
    savingsThisYear: 540,
  };

  const recentActivities = [
    {
      id: 1,
      gym: 'Academia Fit Manaus',
      date: 'Hoje, 14:30',
      duration: '1h 15min',
      type: 'Musculação',
    },
    {
      id: 2,
      gym: 'Gym Premium',
      date: 'Ontem, 18:00',
      duration: '45min',
      type: 'Funcional',
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.primaryDark]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Olá, {user?.name || 'Visitante'}! 👋</Text>
            <Text style={styles.subtitle}>
              Pronto para o treino de hoje?
            </Text>
          </View>
          <TouchableOpacity style={styles.profileImage} onPress={logout}>
            <Image
              source={{ uri: user?.profilePhoto || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100' }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionCard}>
          <CreditCard size={24} color={theme.colors.primary} />
          <Text style={styles.actionText}>Minha Carteira</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionCard}>
          <MapPin size={24} color={theme.colors.primary} />
          <Text style={styles.actionText}>Encontrar Academia</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionCard}>
          <Calendar size={24} color={theme.colors.primary} />
          <Text style={styles.actionText}>Agendar Treino</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <View style={styles.statHeader}>
            <TrendingUp size={20} color={theme.colors.primary} />
            <Text style={styles.statValue}>{stats.workoutsThisMonth}</Text>
          </View>
          <Text style={styles.statLabel}>Treinos este mês</Text>
        </Card>

        <Card style={styles.statCard}>
          <View style={styles.statHeader}>
            <MapPin size={20} color={theme.colors.primary} />
            <Text style={styles.statValue}>{stats.totalPartnerGyms}</Text>
          </View>
          <Text style={styles.statLabel}>Academias parceiras</Text>
        </Card>

        <Card style={styles.statCard}>
          <View style={styles.statHeader}>
            <Star size={20} color={theme.colors.primary} />
            <Text style={styles.statValue}>R$ {stats.savingsThisYear}</Text>
          </View>
          <Text style={styles.statLabel}>Economia este ano</Text>
        </Card>
      </View>

      {/* Banner Promocional */}
      <Card style={styles.promoBanner}>
        <LinearGradient
          colors={[theme.colors.primary + '20', theme.colors.primary + '05']}
          style={styles.promoContent}
        >
          <View style={styles.promoText}>
            <Text style={styles.promoTitle}>🔥 TREINE EM QUALQUER LUGAR!</Text>
            <Text style={styles.promoSubtitle}>
              Mais de 47 academias parceiras esperando por você
            </Text>
          </View>
          <Zap size={32} color={theme.colors.primary} />
        </LinearGradient>
      </Card>

      {/* Recent Activities */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Atividades Recentes</Text>
        
        {recentActivities.map((activity) => (
          <Card key={activity.id} style={styles.activityCard}>
            <View style={styles.activityHeader}>
              <View>
                <Text style={styles.activityGym}>{activity.gym}</Text>
                <Text style={styles.activityDate}>{activity.date}</Text>
              </View>
              <View style={styles.activityStats}>
                <Clock size={16} color={theme.colors.gray[500]} />
                <Text style={styles.activityDuration}>{activity.duration}</Text>
              </View>
            </View>
            <View style={styles.activityType}>
              <Text style={styles.activityTypeText}>{activity.type}</Text>
            </View>
          </Card>
        ))}
      </View>

      {/* Support Contact */}
      <Card style={styles.supportCard}>
        <Text style={styles.supportTitle}>Precisa de ajuda?</Text>
        <Text style={styles.supportText}>
          Entre em contato conosco pelo WhatsApp
        </Text>
        <TouchableOpacity style={styles.supportButton}>
          <Text style={styles.supportButtonText}>(92) 98765-4321</Text>
        </TouchableOpacity>
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
    paddingBottom: theme.spacing.xl,
  },
  header: {
    paddingTop: 60,
    paddingBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.xl,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontFamily: theme.fonts.display.bold,
    color: theme.colors.white,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.white,
    opacity: 0.9,
    marginTop: theme.spacing.xs,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: theme.colors.white,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 22,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.xl,
    marginTop: -theme.spacing.lg,
    gap: theme.spacing.md,
  },
  actionCard: {
    flex: 1,
    backgroundColor: theme.colors.white,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  actionText: {
    fontSize: 12,
    fontFamily: theme.fonts.medium,
    color: theme.colors.gray[700],
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.xl,
    marginTop: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  statValue: {
    fontSize: 20,
    fontFamily: theme.fonts.display.bold,
    color: theme.colors.black,
    marginLeft: theme.spacing.sm,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray[600],
    textAlign: 'center',
  },
  promoBanner: {
    margin: theme.spacing.xl,
    padding: 0,
    overflow: 'hidden',
  },
  promoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.lg,
  },
  promoText: {
    flex: 1,
  },
  promoTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.display.bold,
    color: theme.colors.black,
  },
  promoSubtitle: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray[700],
    marginTop: theme.spacing.xs,
  },
  section: {
    paddingHorizontal: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.display.semiBold,
    color: theme.colors.black,
    marginBottom: theme.spacing.md,
  },
  activityCard: {
    marginBottom: theme.spacing.md,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  activityGym: {
    fontSize: 16,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.black,
  },
  activityDate: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray[600],
    marginTop: theme.spacing.xs,
  },
  activityStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityDuration: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: theme.colors.gray[600],
    marginLeft: theme.spacing.xs,
  },
  activityType: {
    alignSelf: 'flex-start',
  },
  activityTypeText: {
    fontSize: 12,
    fontFamily: theme.fonts.medium,
    color: theme.colors.primary,
    backgroundColor: theme.colors.primary + '20',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
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
    marginBottom: theme.spacing.md,
  },
  supportButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  supportButtonText: {
    fontSize: 14,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.white,
  },
});