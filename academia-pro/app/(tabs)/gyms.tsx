import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {
  MapPin,
  Star,
  Clock,
  Filter,
  Search,
  Navigation,
  Dumbbell,
  Waves,
  Zap,
} from 'lucide-react-native';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';

const gymData = [
  {
    id: '1',
    name: 'Academia Fit Manaus',
    address: 'Av. Djalma Batista, 1200 - Chapada',
    distance: 1.2,
    rating: 4.8,
    modalities: ['Musculação', 'Aeróbico', 'Funcional'],
    workingHours: '05:00 - 23:00',
    photo: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=400',
    isPartner: true,
    priceRange: '$$',
  },
  {
    id: '2',
    name: 'Gym Premium',
    address: 'Rua Recife, 850 - Adrianópolis',
    distance: 2.1,
    rating: 4.6,
    modalities: ['Musculação', 'CrossFit', 'Natação'],
    workingHours: '06:00 - 22:00',
    photo: 'https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=400',
    isPartner: true,
    priceRange: '$$$',
  },
  {
    id: '3',
    name: 'Power Fitness',
    address: 'Av. Constantino Nery, 500 - Centro',
    distance: 0.8,
    rating: 4.5,
    modalities: ['Musculação', 'Pilates', 'Yoga'],
    workingHours: '05:30 - 22:30',
    photo: 'https://images.pexels.com/photos/1552103/pexels-photo-1552103.jpeg?auto=compress&cs=tinysrgb&w=400',
    isPartner: true,
    priceRange: '$$',
  },
  {
    id: '4',
    name: 'CrossFit Box Manaus',
    address: 'Rua Maceió, 300 - Aleixo',
    distance: 3.2,
    rating: 4.9,
    modalities: ['CrossFit', 'Funcional'],
    workingHours: '06:00 - 21:00',
    photo: 'https://images.pexels.com/photos/949129/pexels-photo-949129.jpeg?auto=compress&cs=tinysrgb&w=400',
    isPartner: true,
    priceRange: '$$$',
  },
];

const modalityIcons = {
  'Musculação': Dumbbell,
  'Natação': Waves,
  'CrossFit': Zap,
  'Funcional': Zap,
  'Aeróbico': Zap,
  'Pilates': Zap,
  'Yoga': Zap,
};

export default function GymsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Todas');

  const filters = ['Todas', 'Musculação', 'CrossFit', 'Natação', 'Funcional'];

  const filteredGyms = gymData.filter((gym) => {
    const matchesSearch = gym.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         gym.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'Todas' || 
                         gym.modalities.includes(selectedFilter);
    
    return matchesSearch && matchesFilter;
  });

  const renderGymCard = ({ item: gym }) => (
    <Card style={styles.gymCard}>
      <Image source={{ uri: gym.photo }} style={styles.gymImage} />
      
      <View style={styles.gymContent}>
        <View style={styles.gymHeader}>
          <View style={styles.gymTitleContainer}>
            <Text style={styles.gymName}>{gym.name}</Text>
            {gym.isPartner && (
              <View style={styles.partnerBadge}>
                <Text style={styles.partnerText}>PARCEIRA</Text>
              </View>
            )}
          </View>
          
          <View style={styles.ratingContainer}>
            <Star size={16} color={theme.colors.warning} fill={theme.colors.warning} />
            <Text style={styles.rating}>{gym.rating}</Text>
          </View>
        </View>

        <View style={styles.gymDetails}>
          <View style={styles.detailRow}>
            <MapPin size={14} color={theme.colors.gray[500]} />
            <Text style={styles.address}>{gym.address}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Navigation size={14} color={theme.colors.primary} />
            <Text style={styles.distance}>{gym.distance} km de distância</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Clock size={14} color={theme.colors.gray[500]} />
            <Text style={styles.hours}>{gym.workingHours}</Text>
          </View>
        </View>

        <View style={styles.modalitiesContainer}>
          {gym.modalities.slice(0, 3).map((modality, index) => {
            const IconComponent = modalityIcons[modality] || Dumbbell;
            return (
              <View key={index} style={styles.modalityTag}>
                <IconComponent size={12} color={theme.colors.primary} />
                <Text style={styles.modalityText}>{modality}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.gymActions}>
          <Button
            title="Ver Detalhes"
            onPress={() => {}}
            variant="outline"
            size="sm"
            style={styles.detailsButton}
          />
          <Button
            title="Agendar Treino"
            onPress={() => {}}
            size="sm"
            style={styles.bookButton}
          />
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Academias Parceiras</Text>
        <Text style={styles.subtitle}>{gymData.length} academias encontradas</Text>
      </View>

      {/* Search and Filters */}
      <View style={styles.searchContainer}>
        <Input
          placeholder="Buscar academias..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          icon={<Search size={20} color={theme.colors.gray[400]} />}
          containerStyle={styles.searchInput}
        />
        
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Filter Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterPill,
              selectedFilter === filter && styles.activeFilterPill,
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text style={[
              styles.filterPillText,
              selectedFilter === filter && styles.activeFilterPillText,
            ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Gyms List */}
      <FlatList
        data={filteredGyms}
        renderItem={renderGymCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[50],
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
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  searchInput: {
    flex: 1,
    marginBottom: 0,
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
  },
  filterContainer: {
    marginTop: theme.spacing.md,
  },
  filterContent: {
    paddingHorizontal: theme.spacing.xl,
    gap: theme.spacing.sm,
  },
  filterPill: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.xl,
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
  },
  activeFilterPill: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterPillText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: theme.colors.gray[600],
  },
  activeFilterPillText: {
    color: theme.colors.white,
  },
  listContent: {
    padding: theme.spacing.xl,
    paddingTop: theme.spacing.lg,
  },
  gymCard: {
    marginBottom: theme.spacing.lg,
    padding: 0,
    overflow: 'hidden',
  },
  gymImage: {
    width: '100%',
    height: 150,
  },
  gymContent: {
    padding: theme.spacing.lg,
  },
  gymHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  gymTitleContainer: {
    flex: 1,
  },
  gymName: {
    fontSize: 18,
    fontFamily: theme.fonts.display.semiBold,
    color: theme.colors.black,
    marginBottom: theme.spacing.xs,
  },
  partnerBadge: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  partnerText: {
    fontSize: 10,
    fontFamily: theme.fonts.bold,
    color: theme.colors.white,
    letterSpacing: 0.5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  rating: {
    fontSize: 14,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.gray[700],
  },
  gymDetails: {
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  address: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray[600],
    flex: 1,
  },
  distance: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: theme.colors.primary,
  },
  hours: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray[600],
  },
  modalitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  modalityTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary + '20',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    gap: theme.spacing.xs,
  },
  modalityText: {
    fontSize: 12,
    fontFamily: theme.fonts.medium,
    color: theme.colors.primary,
  },
  gymActions: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  detailsButton: {
    flex: 1,
  },
  bookButton: {
    flex: 1,
  },
});