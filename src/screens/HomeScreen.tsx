import React from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMatcha } from "../context/MatchaContext";
import { MatchaCard } from "../components/MatchaCard";
import { PlusIcon } from "phosphor-react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { colors } from "../theme/colors";

type RootStackParamList = {
  Home: undefined;
  AddLog: { logId?: string };
  LogDetail: { logId: string };
};

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export const HomeScreen = ({ navigation }: Props) => {
  const { logs } = useMatcha();

  const EmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emoji}>🍵</Text>
      <Text style={styles.emptyTitle}>Collect Your Matcha Moments</Text>
      <Text style={styles.emptySubtitle}>
        Start logging your matcha tastings to discover your perfect cup
      </Text>
      <Pressable
        onPress={() => navigation.navigate("AddLog", {})}
        style={styles.emptyButton}
      >
        <Text style={styles.emptyButtonText}>Log Your First Matcha</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>Matcha Moment</Text>
              <Text style={styles.headerSubtitle}>
                {logs.length} {logs.length === 1 ? "entry" : "entries"}
              </Text>
            </View>
            <Image
              source={require("../../assets/matcha-moment-logo-smaller.png")}
              style={styles.logo}
              resizeMode="contain"
            />
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
                onPress={() =>
                  navigation.navigate("LogDetail", { logId: item.id })
                }
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}

        {/* Floating Action Button */}
        <Pressable
          onPress={() => navigation.navigate("AddLog", {})}
          style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
        >
          <PlusIcon size={28} color={colors.white} weight="bold" />
        </Pressable>
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
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.gray[900],
    paddingBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.gray[600],
  },
  logo: {
    width: 80,
    height: 80,
  },
  listContent: {
    padding: 16,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  emoji: {
    fontSize: 60,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.gray[900],
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 16,
    color: colors.gray[600],
    textAlign: "center",
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
    fontWeight: "600",
    fontSize: 16,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 40,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.matcha[500],
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabPressed: {
    transform: [{ scale: 0.95 }],
    opacity: 0.9,
  },
});
