import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { CameraIcon, ImageIcon, XCircleIcon } from "phosphor-react-native";
import { colors } from "../theme/colors";

interface ImagePickerComponentProps {
  label: string;
  imageUri?: string;
  onImageSelected: (uri: string) => void;
  onImageRemoved: () => void;
  multiple?: boolean;
}

export const ImagePickerComponent = ({
  label,
  imageUri,
  onImageSelected,
  onImageRemoved,
  multiple = false,
}: ImagePickerComponentProps) => {
  const [permissionStatus, setPermissionStatus] = useState<string | null>(null);

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    return status === "granted";
  };

  const requestLibraryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return status === "granted";
  };

  const pickImage = async (useCamera: boolean) => {
    const hasPermission = useCamera
      ? await requestCameraPermission()
      : await requestLibraryPermission();
    if (!hasPermission) {
      Alert.alert(
        "Permission Required",
        "Please allow access to your photos to add images.",
        [{ text: "OK" }]
      );
      return;
    }

    try {
      const result = useCamera
        ? await ImagePicker.launchCameraAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
          })
        : await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
            allowsMultipleSelection: multiple,
          });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        onImageSelected(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image");
      console.error(error);
    }
  };

  const showImageOptions = () => {
    Alert.alert("Add Photo", "Choose an option", [
      {
        text: "Take Photo",
        onPress: () => pickImage(true),
      },
      {
        text: "Choose from Library",
        onPress: () => pickImage(false),
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      {imageUri ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <Pressable onPress={onImageRemoved} style={styles.removeButton}>
            <XCircleIcon size={32} color={colors.red[500]} weight="fill" />
          </Pressable>
        </View>
      ) : (
        <Pressable onPress={showImageOptions} style={styles.addButton}>
          <CameraIcon size={32} color={colors.matcha[500]} />
          <Text style={styles.addButtonText}>Add Photo</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    color: colors.gray[700],
    fontWeight: "500",
    marginBottom: 8,
    fontSize: 14,
  },
  addButton: {
    height: 150,
    borderWidth: 2,
    borderColor: colors.gray[400],
    borderStyle: "dashed",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.gray[50],
  },
  addButtonText: {
    marginTop: 8,
    color: colors.gray[600],
    fontSize: 14,
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    backgroundColor: colors.gray[200],
  },
  removeButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: colors.white,
    borderRadius: 16,
  },
});
