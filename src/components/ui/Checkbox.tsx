import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { CheckSquareIcon, SquareIcon } from "phosphor-react-native";
import { colors } from "../../theme/colors";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Checkbox = ({ label, checked, onChange }: CheckboxProps) => {
  return (
    <Pressable onPress={() => onChange(!checked)} style={styles.container}>
      {checked ? (
        <CheckSquareIcon size={24} color={colors.matcha[500]} weight="fill" />
      ) : (
        <SquareIcon size={24} color={colors.gray[400]} weight="regular" />
      )}
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
  },
  label: {
    fontSize: 16,
    color: colors.gray[700],
    fontWeight: "500",
  },
});
