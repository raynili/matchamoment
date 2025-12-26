import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMatcha } from '../context/MatchaContext';
import { MatchaCard } from '../components/MatchaCard';
import { PlusIcon } from 'phosphor-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';

type RootStackParamList = {
  Home: undefined;
  AddLog: { logId?: string };
  LogDetail: { logId: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen = ({ navigation }: Props) => {
  const { logs } = useMatcha();

  const EmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emoji}>🍵</Text>
      <Text style={styles.emptyTitle}>
        Your Matcha Journey Begins
      </Text>
      <Text style={styles.emptySubtitle}>
        Start logging your matcha tastings to discover your perfect cup
      </Text>
      <Pressable
        onPress={() => navigation.navigate('AddLog', {})}
        style={styles.emptyButton}
      >
        <Text style={styles.emptyButtonText}>
          Log Your First Matcha
        </Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View>
              <Text style={styles.headerTitle}>
                My Matcha Journal
              </Text>
              <Text style={styles.headerSubtitle}>
                {logs.length} {logs.length === 1 ? 'entry' : 'entries'}
              </Text>
            </View>
            <Pressable
              onPress={() => navigation.navigate('AddLog', {})}
              style={styles.addButton}
            >
              <PlusIcon size={24} color={colors.white} weight="bold" />
            </Pressable>
          </View>
        </View>

        {/* List */}
        {logs.length === 0 ? (
          <EmptyState />
        ) : (
          <FlatList
            data={logs}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <MatchaCard
                log={item}
                onPress={() => navigation.navigate('LogDetail', { logId: item.id })}
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.matcha[50],
  },
  content: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  headerLeft: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.gray[900],
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.gray[600],
  },
  addButton: {
    width: 48,
    height: 48,
    backgroundColor: colors.matcha[500],
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    padding: 16,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emoji: {
    fontSize: 60,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.gray[900],
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: colors.gray[600],
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: colors.matcha[500],
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  emptyButtonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
});