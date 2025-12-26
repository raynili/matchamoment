import React, { ReactNode } from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface CardProps extends ViewProps {
  children: ReactNode;
  variant?: 'default' | 'elevated';
}

export const Card = ({ 
  children, 
  variant = 'default',
  style,
  ...props 
}: CardProps) => {
  return (
    <View
      {...props}
      style={[
        styles.card,
        variant === 'elevated' ? styles.elevated : styles.default,
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
  },
  default: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  elevated: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
});