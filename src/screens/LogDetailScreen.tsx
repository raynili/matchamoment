import React from 'react';
import { View, Text, ScrollView, Alert, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMatcha } from '../context/MatchaContext';
import { FlavorRating } from '../components/FlavourRating';
import { BrewingRatio } from '../components/BrewingRatio';
import { Card } from '../components/ui/Card';
import { PencilIcon, TrashIcon } from 'phosphor-react-native';
import { format } from 'date-fns';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';

type RootStackParamList = {
  Home: undefined;
  AddLog: { logId?: string };
  LogDetail: { logId: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'LogDetail'>;

export const LogDetailScreen = ({ navigation, route }: Props) => {
  const { logs, deleteLog } = useMatcha();
  const { logId } = route.params;

  const log = logs.find(l => l.id === logId);

  if (!log) {
    return (
      <SafeAreaView style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Log not found</Text>
      </SafeAreaView>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      'Delete Log',
      'Are you sure you want to delete this matcha log?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteLog(logId);
            navigation.goBack();
          },
        },
      ]
    );
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMMM d, yyyy • h:mm a');
    } catch {
      return 'Unknown date';
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Card */}
        <Card variant="elevated" style={styles.headerCard}>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <Text style={styles.name}>{log.name}</Text>
              {log.brand && (
                <Text style={styles.brand}>{log.brand}</Text>
              )}
              {log.origin && (
                <View style={styles.originBadge}>
                  <Text style={styles.originText}>{log.origin}</Text>
                </View>
              )}
            </View>

            {/* Action Buttons */}
            <View style={styles.actions}>
              <Pressable
                onPress={() => navigation.navigate('AddLog', { logId: log.id })}
                style={styles.editButton}
              >
                <PencilIcon size={20} color={colors.matcha[700]} weight="bold" />
              </Pressable>
              <Pressable
                onPress={handleDelete}
                style={styles.deleteButton}
              >
                <TrashIcon size={20} color={colors.red[600]} weight="bold" />
              </Pressable>
            </View>
          </View>

          <Text style={styles.date}>{formatDate(log.createdAt)}</Text>
        </Card>

        {/* Flavor Rating */}
        <View style={styles.section}>
          <FlavorRating
            umami={log.umami}
            sweetness={log.sweetness}
            bitterness={log.bitterness}
          />
        </View>

        {/* Tasting Notes */}
        {log.notes.length > 0 && (
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>Tasting Notes</Text>
            <View style={styles.notesContainer}>
              {log.notes.map((note, index) => (
                <View key={index} style={styles.noteChip}>
                  <Text style={styles.noteText}>{note}</Text>
                </View>
              ))}
            </View>
          </Card>
        )}

        {/* Brewing Ratio */}
        <View style={styles.section}>
          <BrewingRatio
            powderGrams={log.powderGrams}
            waterMl={log.waterMl}
            milkMl={log.milkMl}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.matcha[50],
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  notFoundContainer: {
    flex: 1,
    backgroundColor: colors.matcha[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundText: {
    color: colors.gray[600],
  },
  headerCard: {
    marginBottom: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  headerLeft: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.gray[900],
    marginBottom: 4,
  },
  brand: {
    fontSize: 16,
    color: colors.gray[600],
    marginBottom: 4,
  },
  originBadge: {
    backgroundColor: colors.matcha[100],
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  originText: {
    fontSize: 14,
    color: colors.matcha[700],
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    width: 40,
    height: 40,
    backgroundColor: colors.matcha[100],
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    width: 40,
    height: 40,
    backgroundColor: colors.red[100],
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  date: {
    fontSize: 12,
    color: colors.gray[400],
    marginTop: 8,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.gray[900],
    marginBottom: 12,
  },
  notesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  noteChip: {
    backgroundColor: colors.matcha[50],
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.matcha[300],
  },
  noteText: {
    fontSize: 14,
    color: colors.matcha[700],
  },
});