import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors } from "../../theme/colors";

interface CurrencyPickerProps {
  value: "USD" | "JPY";
  onChange: (currency: "USD" | "JPY") => void;
}

export const CurrencyPicker = ({ value, onChange }: CurrencyPickerProps) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => onChange("USD")}
        style={[styles.option, value === "USD" && styles.optionSelected]}
      >
        <Text
          style={[
            styles.optionText,
            value === "USD" && styles.optionTextSelected,
          ]}
        >
          USD ($)
        </Text>
      </Pressable>
      <Pressable
        onPress={() => onChange("JPY")}
        style={[styles.option, value === "JPY" && styles.optionSelected]}
      >
        <Text
          style={[
            styles.optionText,
            value === "JPY" && styles.optionTextSelected,
          ]}
        >
          JPY (¥)
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  option: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.gray[400],
    backgroundColor: colors.white,
    alignItems: "center",
  },
  optionSelected: {
    borderColor: colors.matcha[500],
    backgroundColor: colors.matcha[50],
  },
  optionText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.gray[700],
  },
  optionTextSelected: {
    color: colors.matcha[700],
    fontWeight: "700",
  },
});
