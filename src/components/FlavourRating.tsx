import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

interface FlavorRatingProps {
  umami: number;
  sweetness: number;
  bitterness: number;
  maxValue?: number;
}

export const FlavorRating = ({ 
  umami, 
  sweetness, 
  bitterness, 
  maxValue = 5 
}: FlavorRatingProps) => {
  const FlavorBar = ({ 
    label, 
    value, 
    color 
  }: { 
    label: string; 
    value: number; 
    color: string;
  }) => {
    const percentage = (value / maxValue) * 100;
    
    return (
      <View style={styles.barContainer}>
        <View style={styles.barHeader}>
          <Text style={styles.barLabel}>{label}</Text>
          <Text style={styles.barValue}>{value}/{maxValue}</Text>
        </View>
        <View style={styles.barBackground}>
          <View 
            style={[
              styles.barFill,
              { 
                width: `${percentage}%`,
                backgroundColor: color
              }
            ]}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flavour Profile</Text>
      
      <FlavorBar label="Umami" value={umami} color={colors.matcha[500]} />
      <FlavorBar label="Sweetness" value={sweetness} color={colors.yellow[500]} />
      <FlavorBar label="Bitterness" value={bitterness} color={colors.amber[700]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.matcha[50],
    borderRadius: 12,
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.gray[900],
    marginBottom: 16,
  },
  barContainer: {
    marginBottom: 16,
  },
  barHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  barLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.gray[700],
  },
  barValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.gray[900],
  },
  barBackground: {
    height: 12,
    backgroundColor: colors.gray[200],
    borderRadius: 6,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 6,
  },
});