import React from "react";
import {
  View,
  Text,
  ScrollView,
  Alert,
  Pressable,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMatcha } from "../context/MatchaContext";
import { FlavorRating } from "../components/FlavourRating";
import { BrewingRatio } from "../components/BrewingRatio";
import { Card } from "../components/ui/Card";
import { PencilIcon, TrashIcon } from "phosphor-react-native";
import { Image, ScrollView as RNScrollView } from "react-native";
import { format } from "date-fns";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { colors } from "../theme/colors";

type RootStackParamList = {
  Home: undefined;
  AddLog: { logId?: string };
  LogDetail: { logId: string };
};

type Props = NativeStackScreenProps<RootStackParamList, "LogDetail">;

export const LogDetailScreen = ({ navigation, route }: Props) => {
  const { logs, deleteLog } = useMatcha();
  const { logId } = route.params;

  const log = logs.find((l) => l.id === logId);

  if (!log) {
    return (
      <SafeAreaView style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Log not found</Text>
      </SafeAreaView>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      "Delete Log",
      "Are you sure you want to delete this matcha log?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
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
      return format(new Date(dateString), "MMMM d, yyyy • h:mm a");
    } catch {
      return "Unknown date";
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
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
              {log.brand && <Text style={styles.brand}>{log.brand}</Text>}
              {log.origin && (
                <View style={styles.originBadge}>
                  <Text style={styles.originText}>{log.origin}</Text>
                </View>
              )}
            </View>

            {/* Action Buttons */}
            <View style={styles.actions}>
              <Pressable
                onPress={() => navigation.navigate("AddLog", { logId: log.id })}
                style={styles.editButton}
              >
                <PencilIcon
                  size={20}
                  color={colors.matcha[700]}
                  weight="bold"
                />
              </Pressable>
              <Pressable onPress={handleDelete} style={styles.deleteButton}>
                <TrashIcon size={20} color={colors.red[600]} weight="bold" />
              </Pressable>
            </View>
          </View>

          {/* Price and Quantity */}
          <View style={styles.detailsRow}>
            {log.priceAmount && log.priceCurrency && (
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Price</Text>
                <Text style={styles.detailValue}>
                  {log.priceCurrency === "USD" ? "$" : "¥"}
                  {log.priceAmount.toFixed(2)}
                </Text>
              </View>
            )}
            {log.quantityGrams && (
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Quantity</Text>
                <Text style={styles.detailValue}>{log.quantityGrams}g</Text>
              </View>
            )}
            {log.priceAmount && log.priceCurrency && log.quantityGrams && (
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>
                  {log.priceCurrency === "USD" ? "$" : "¥"}
                  {(log.priceAmount / log.quantityGrams).toFixed(2)} / g
                </Text>
              </View>
            )}
          </View>

          {/* Date Created */}
          <Text style={styles.date}>{formatDate(log.createdAt)}</Text>
        </Card>

        {/* Photos Section */}
        {(log.canPhoto || (log.drinkPhotos && log.drinkPhotos.length > 0)) && (
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>Photos</Text>

            {log.canPhoto && (
              <View style={styles.photoSection}>
                <Text style={styles.photoLabel}>Matcha Package</Text>
                <Image
                  source={{ uri: log.canPhoto }}
                  style={styles.mainPhoto}
                  resizeMode="cover"
                />
              </View>
            )}

            {log.drinkPhotos && log.drinkPhotos.length > 0 && (
              <View style={styles.photoSection}>
                <Text style={styles.photoLabel}>
                  My Drinks ({log.drinkPhotos.length})
                </Text>
                <RNScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.drinkPhotosContainer}>
                    {log.drinkPhotos.map((uri, index) => (
                      <Image
                        key={index}
                        source={{ uri }}
                        style={styles.drinkPhoto}
                        resizeMode="cover"
                      />
                    ))}
                  </View>
                </RNScrollView>
              </View>
            )}
          </Card>
        )}

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
    alignItems: "center",
    justifyContent: "center",
  },
  notFoundText: {
    color: colors.gray[600],
  },
  headerCard: {
    marginBottom: 16,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  headerLeft: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
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
    alignSelf: "flex-start",
    marginTop: 8,
  },
  originText: {
    fontSize: 14,
    color: colors.matcha[700],
    fontWeight: "500",
  },
  detailsRow: {
    flexDirection: "row",
    gap: 16,
    marginTop: 12,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  detailLabel: {
    fontSize: 12,
    color: colors.gray[500],
    fontWeight: "500",
  },
  detailValue: {
    fontSize: 14,
    color: colors.gray[900],
    fontWeight: "600",
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  editButton: {
    width: 40,
    height: 40,
    backgroundColor: colors.matcha[100],
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButton: {
    width: 40,
    height: 40,
    backgroundColor: colors.red[100],
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
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
    fontWeight: "bold",
    color: colors.gray[900],
    marginBottom: 12,
  },
  notesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
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
  photoSection: {
    marginBottom: 16,
  },
  photoLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.gray[700],
    marginBottom: 8,
  },
  mainPhoto: {
    width: "100%",
    height: 250,
    borderRadius: 12,
    backgroundColor: colors.gray[200],
  },
  drinkPhotosContainer: {
    flexDirection: "row",
    gap: 12,
  },
  drinkPhoto: {
    width: 150,
    height: 150,
    borderRadius: 12,
    backgroundColor: colors.gray[200],
  },
});
