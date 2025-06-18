import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '@/constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'flat' | 'elevated';
}

export function Card({ children, style, variant = 'default' }: CardProps) {
  return (
    <View style={[styles.card, styles[variant], style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
  },
  default: {
    ...theme.shadows.sm,
    borderWidth: 1,
    borderColor: theme.colors.gray[100],
  },
  flat: {
    backgroundColor: theme.colors.gray[50],
  },
  elevated: {
    ...theme.shadows.lg,
  },
});