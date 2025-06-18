import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { QrCode, Calendar, Clock, CircleCheck as CheckCircle, CircleAlert as AlertCircle, Gift, Zap } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';

export default function CardScreen() {
  const studentData = {
    name: 'LUCAS OLIVEIRA SANTOS',
    gym: 'ACADEMIA FIT MANAUS',
    age: 20,
    cpf: '1.22.456.789-00',
    photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
  };

  const benefits = [
    {
      id: 1,
      type: 'Desconto Estudantil',
      description: '50% off em mensalidades',
      status: 'active',
      validUntil: new Date('2025-12-10'),
      icon: 'gift',
    },
    {
      id: 2,
      type: 'Treinos Ilimitados',
      description: 'Acesso a todas as unidades parceiras',
      status: 'active',
      validUntil: new Date('2025-12-10'),
      icon: 'zap',
    },
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return theme.colors.success;
      case 'expired':
        return theme.colors.error;
      default:
        return theme.colors.warning;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Ativo';
      case 'expired':
        return 'Expirado';
      default:
        return 'Pendente';
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Minha Carteira</Text>
        <Text style={styles.subtitle}>Carteira estudantil digital</Text>
      </View>

      {/* Digital Card */}
      <Card style={styles.digitalCard}>
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.primaryDark]}
          style={styles.cardGradient}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>AcadMeia</Text>
            <Text style={styles.cardSubtitle}>CARTEIRA ESTUDANTIL</Text>
          </View>

          <View style={styles.cardContent}>
            <Image source={{ uri: studentData.photo }} style={styles.cardPhoto} />
            
            <View style={styles.cardInfo}>
              <Text style={styles.studentName}>{studentData.name}</Text>
              <Text style={styles.gymName}>{studentData.gym}</Text>
              <View style={styles.cardDetails}>
                <Text style={styles.detailText}>{studentData.age} anos</Text>
                <Text style={styles.detailText}>{studentData.cpf}</Text>
              </View>
            </View>
          </View>

          <View style={styles.cardFooter}>
            <TouchableOpacity style={styles.qrButton}>
              <QrCode size={20} color={theme.colors.white} />
              <Text style={styles.qrButtonText}>QR Code</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Card>

      {/* Benefits Section */}
      <View style={styles.benefitsSection}>
        <Text style={styles.sectionTitle}>Seus Benefícios</Text>
        
        {benefits.map((benefit) => (
          <Card key={benefit.id} style={styles.benefitCard}>
            <View style={styles.benefitHeader}>
              <View style={styles.benefitIcon}>
                {benefit.icon === 'gift' ? (
                  <Gift size={24} color={theme.colors.primary} />
                ) : (
                  <Zap size={24} color={theme.colors.primary} />
                )}
              </View>
              <View style={styles.benefitInfo}>
                <Text style={styles.benefitType}>{benefit.type}</Text>
                <Text style={styles.benefitDescription}>{benefit.description}</Text>
              </View>
              <View style={styles.benefitStatus}>
                <CheckCircle
                  size={20}
                  color={getStatusColor(benefit.status)}
                />
              </View>
            </View>
            
            <View style={styles.benefitFooter}>
              <View style={styles.statusContainer}>
                <Text style={[
                  styles.statusText,
                  { color: getStatusColor(benefit.status) }
                ]}>
                  {getStatusText(benefit.status)} até {formatDate(benefit.validUntil)}
                </Text>
              </View>
            </View>
          </Card>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsSection}>
        <Text style={styles.sectionTitle}>Ações Rápidas</Text>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Calendar size={20} color={theme.colors.primary} />
            <Text style={styles.actionButtonText}>Renovar Desconto</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Clock size={20} color={theme.colors.primary} />
            <Text style={styles.actionButtonText}>Histórico de Uso</Text>
          </TouchableOpacity>
        </View>

        <Button
          title="Gerar QR Code para Check-in"
          onPress={() => {}}
          style={styles.qrGenerateButton}
          icon={<QrCode size={20} color={theme.colors.white} />}
        />
      </View>

      {/* Validation Info */}
      <Card style={styles.validationCard}>
        <View style={styles.validationHeader}>
          <AlertCircle size={20} color={theme.colors.info} />
          <Text style={styles.validationTitle}>Informações de Validação</Text>
        </View>
        <Text style={styles.validationText}>
          Esta carteira é válida apenas com apresentação de documento oficial com foto.
          QR Code deve ser escaneado na recepção da academia.
        </Text>
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
  digitalCard: {
    margin: theme.spacing.xl,
    padding: 0,
    overflow: 'hidden',
  },
  cardGradient: {
    padding: theme.spacing.lg,
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  cardTitle: {
    fontSize: 24,
    fontFamily: theme.fonts.display.bold,
    color: theme.colors.white,
  },
  cardSubtitle: {
    fontSize: 12,
    fontFamily: theme.fonts.medium,
    color: theme.colors.white,
    opacity: 0.9,
    letterSpacing: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  cardPhoto: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.md,
    borderWidth: 3,
    borderColor: theme.colors.white,
  },
  cardInfo: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  studentName: {
    fontSize: 16,
    fontFamily: theme.fonts.display.bold,
    color: theme.colors.white,
    marginBottom: theme.spacing.xs,
  },
  gymName: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: theme.colors.white,
    opacity: 0.9,
    marginBottom: theme.spacing.sm,
  },
  cardDetails: {
    gap: theme.spacing.xs,
  },
  detailText: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: theme.colors.white,
    opacity: 0.8,
  },
  cardFooter: {
    alignItems: 'center',
  },
  qrButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing.sm,
  },
  qrButtonText: {
    fontSize: 14,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.white,
  },
  benefitsSection: {
    paddingHorizontal: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: theme.fonts.display.semiBold,
    color: theme.colors.black,
    marginBottom: theme.spacing.md,
  },
  benefitCard: {
    marginBottom: theme.spacing.md,
  },
  benefitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  benefitIcon: {
    width: 40,
    height: 40,
    backgroundColor: theme.colors.primary + '20',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  benefitInfo: {
    flex: 1,
  },
  benefitType: {
    fontSize: 16,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.black,
  },
  benefitDescription: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray[600],
    marginTop: theme.spacing.xs,
  },
  benefitStatus: {
    marginLeft: theme.spacing.md,
  },
  benefitFooter: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[100],
    paddingTop: theme.spacing.sm,
  },
  statusContainer: {
    alignItems: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontFamily: theme.fonts.medium,
  },
  actionsSection: {
    paddingHorizontal: theme.spacing.xl,
    marginTop: theme.spacing.lg,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  actionButton: {
    flex: 1,
    backgroundColor: theme.colors.white,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    gap: theme.spacing.sm,
    ...theme.shadows.sm,
  },
  actionButtonText: {
    fontSize: 12,
    fontFamily: theme.fonts.medium,
    color: theme.colors.gray[700],
    textAlign: 'center',
  },
  qrGenerateButton: {
    marginTop: theme.spacing.md,
  },
  validationCard: {
    margin: theme.spacing.xl,
    backgroundColor: theme.colors.info + '10',
  },
  validationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  validationTitle: {
    fontSize: 14,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.info,
    marginLeft: theme.spacing.sm,
  },
  validationText: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray[700],
    lineHeight: 18,
  },
});