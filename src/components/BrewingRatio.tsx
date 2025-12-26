import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DropIcon, CoffeeIcon, PintGlassIcon } from 'phosphor-react-native';
import { colors } from '../theme/colors';

interface BrewingRatioProps {
  powderGrams: number;
  waterMl?: number;
  milkMl?: number;
}

export const BrewingRatio = ({ powderGrams, waterMl, milkMl }: BrewingRatioProps) => {
  const RatioItem = ({ 
    icon, 
    value, 
    unit, 
    label 
  }: { 
    icon: React.ReactNode; 
    value: number; 
    unit: string; 
    label: string;
  }) => (
    <View style={styles.item}>
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <Text style={styles.value}>
        {value}
        <Text style={styles.unit}> {unit}</Text>
      </Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Brewing Ratio</Text>
      
      <View style={styles.itemsContainer}>
        <RatioItem
          icon={<CoffeeIcon size={24} color={colors.matcha[500]} weight="fill" />}
          value={powderGrams}
          unit="g"
          label="Powder"
        />
        
        {waterMl !== undefined && waterMl > 0 && (
          <RatioItem
            icon={<DropIcon size={24} color={colors.blue[500]} weight="fill" />}
            value={waterMl}
            unit="ml"
            label="Water"
          />
        )}
        
        {milkMl !== undefined && milkMl > 0 && (
          <RatioItem
            icon={<PintGlassIcon size={24} color="#a8a29e" weight="fill" />}
            value={milkMl}
            unit="ml"
            label="Milk"
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.gray[900],
    marginBottom: 16,
  },
  itemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  item: {
    flex: 1,
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    backgroundColor: colors.matcha[100],
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.gray[900],
  },
  unit: {
    fontSize: 14,
    fontWeight: 'normal',
    color: colors.gray[600],
  },
  label: {
    fontSize: 12,
    color: colors.gray[500],
    marginTop: 4,
  },
});