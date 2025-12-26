import React from 'react';
import { Text, Pressable, View, StyleSheet } from 'react-native';
import { Card } from './ui/Card';
import { MatchaLog } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { colors } from '../theme/colors';

interface MatchaCardProps {
  log: MatchaLog;
  onPress: () => void;
}

export const MatchaCard = ({ log, onPress }: MatchaCardProps) => {
  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return 'Recently';
    }
  };

  return (
    <Pressable onPress={onPress}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{log.name}</Text>
            {log.brand && (
              <Text style={styles.brand}>{log.brand}</Text>
            )}
          </View>
          {log.origin && (
            <View style={styles.originBadge}>
              <Text style={styles.originText}>{log.origin}</Text>
            </View>
          )}
        </View>

        {/* Flavor dots */}
        <View style={styles.flavorsContainer}>
          <View style={styles.flavorItem}>
            <View 
              style={[
                styles.flavorDot,
                { backgroundColor: colors.matcha[500], opacity: log.umami / 5 }
              ]}
            />
            <Text style={styles.flavorLabel}>Umami</Text>
          </View>
          <View style={styles.flavorItem}>
            <View 
              style={[
                styles.flavorDot,
                { backgroundColor: colors.yellow[500], opacity: log.sweetness / 5 }
              ]}
            />
            <Text style={styles.flavorLabel}>Sweet</Text>
          </View>
          <View style={styles.flavorItem}>
            <View 
              style={[
                styles.flavorDot,
                { backgroundColor: colors.amber[700], opacity: log.bitterness / 5 }
              ]}
            />
            <Text style={styles.flavorLabel}>Bitter</Text>
          </View>
        </View>

        {/* Date */}
        <Text style={styles.date}>{formatDate(log.createdAt)}</Text>
      </Card>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.gray[900],
  },
  brand: {
    fontSize: 14,
    color: colors.gray[600],
  },
  originBadge: {
    backgroundColor: colors.matcha[100],
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  originText: {
    fontSize: 12,
    color: colors.matcha[700],
    fontWeight: '500',
  },
  flavorsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  flavorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  flavorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  flavorLabel: {
    fontSize: 12,
    color: colors.gray[500],
  },
  date: {
    fontSize: 12,
    color: colors.gray[400],
  },
});