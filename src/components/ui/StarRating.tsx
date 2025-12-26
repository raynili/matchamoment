import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Star } from 'phosphor-react-native';
import { colors } from '../../theme/colors';

interface StarRatingProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  maxStars?: number;
  readonly?: boolean;
}

export const StarRating = ({ 
  label, 
  value, 
  onChange, 
  maxStars = 5,
  readonly = false 
}: StarRatingProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.starsContainer}>
        {Array.from({ length: maxStars }, (_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= value;
          
          return (
            <Pressable
              key={starValue}
              onPress={() => !readonly && onChange(starValue)}
              disabled={readonly}
              style={({ pressed }) => ({
                opacity: pressed ? 0.6 : 1,
              })}
            >
              <Star
                size={32}
                weight={isFilled ? 'fill' : 'regular'}
                color={isFilled ? colors.matcha[500] : colors.gray[200]}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    color: colors.gray[700],
    fontWeight: '500',
    marginBottom: 8,
    fontSize: 14,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});