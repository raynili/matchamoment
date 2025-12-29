import React from "react";
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
import { CameraIcon, XCircleIcon, PlusIcon } from "phosphor-react-native";
import { colors } from "../theme/colors";

interface MultipleImagePickerProps {
  label: string;
  imageUris: string[];
  onImageAdded: (uri: string) => void;
  onImageRemoved: (uri: string) => void;
  maxImages?: number;
}

export const MultipleImagePicker = ({
  label,
  imageUris,
  onImageAdded,
  onImageRemoved,
  maxImages = 5,
}: MultipleImagePickerProps) => {
  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    return status === "granted";
  };

  const requestLibraryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return status === "granted";
  };

  const pickImage = async (useCamera: boolean) => {
    if (imageUris.length >= maxImages) {
      Alert.alert(
        "Limit Reached",
        `You can only add up to ${maxImages} photos.`
      );
      return;
    }

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
          });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        onImageAdded(result.assets[0].uri);
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
      <Text style={styles.label}>
        {label} ({imageUris.length}/{maxImages})
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.imagesContainer}>
          {imageUris.map((uri, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image source={{ uri }} style={styles.image} />
              <Pressable
                onPress={() => onImageRemoved(uri)}
                style={styles.removeButton}
              >
                <XCircleIcon size={24} color={colors.red[500]} weight="fill" />
              </Pressable>
            </View>
          ))}

          {imageUris.length < maxImages && (
            <Pressable onPress={showImageOptions} style={styles.addButton}>
              <PlusIcon size={32} color={colors.matcha[500]} weight="bold" />
              <Text style={styles.addButtonText}>Add</Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
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
  imagesContainer: {
    flexDirection: "row",
    gap: 12,
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 12,
    backgroundColor: colors.gray[200],
  },
  removeButton: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: colors.white,
    borderRadius: 12,
  },
  addButton: {
    width: 120,
    height: 120,
    borderWidth: 2,
    borderColor: colors.gray[400],
    borderStyle: "dashed",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.gray[50],
  },
  addButtonText: {
    marginTop: 4,
    color: colors.gray[600],
    fontSize: 12,
  },
});
