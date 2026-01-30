import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Add() {
  const [image, setImage] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");

  const imageMediaType: any = (ImagePicker as any).MediaType?.Image
    ? [(ImagePicker as any).MediaType.Image]
    : (ImagePicker as any).MediaTypeOptions.Images;

  async function ensurePermissions() {
    const media = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const camera = await ImagePicker.requestCameraPermissionsAsync();

    if (!media.granted || !camera.granted) {
      Alert.alert(
        "Permission required",
        "Please allow camera and photo library access.",
      );
      return false;
    }

    return true;
  }

  async function pickImage() {
    const ok = await ensurePermissions();
    if (!ok) return;

    Alert.alert("Add photo", "Choose source", [
      { text: "Camera", onPress: openCamera },
      { text: "Gallery", onPress: openGallery },
      { text: "Cancel", style: "cancel" },
    ]);
  }

  async function openCamera() {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: imageMediaType,
      quality: 0.8,
      allowsEditing: true,
      aspect: [4, 5],
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  async function openGallery() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: imageMediaType,
      quality: 0.8,
      allowsEditing: true,
      aspect: [4, 5],
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  function submit() {
    if (!image || !title || !brand || !condition) {
      Alert.alert("Missing info", "Please complete all required fields.");
      return;
    }

    Alert.alert("Item added", "Your item is ready for swaps.");
  }

  return (
    <ScrollView
      style={styles.root}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 200, // ✅ important – clears the floating tab bar
      }}
    >
      <Text style={styles.header}>Create listing</Text>

      {/* Image */}
      <Pressable
        style={styles.imageBox}
        onPress={!image ? pickImage : undefined}
      >
        {image ? (
          <>
            <Image source={{ uri: image }} style={styles.image} />

            <Pressable
              style={styles.removeButton}
              onPress={() => setImage(null)}
              hitSlop={10}
            >
              <Ionicons name="close" size={16} color="#111" />
            </Pressable>
          </>
        ) : (
          <View style={styles.imagePlaceholder}>
            <Ionicons name="camera-outline" size={28} color="#9CA3AF" />
            <Text style={styles.imageHint}>Add cover photo</Text>
          </View>
        )}
      </Pressable>

      {/* Title */}
      <View style={styles.field}>
        <Text style={styles.label}>Title *</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Oversized hoodie"
          style={styles.input}
        />
      </View>

      {/* Brand */}
      <View style={styles.field}>
        <Text style={styles.label}>Brand *</Text>
        <TextInput
          value={brand}
          onChangeText={setBrand}
          placeholder="ZARA"
          style={styles.input}
        />
      </View>

      {/* Condition */}
      <View style={styles.field}>
        <Text style={styles.label}>Condition *</Text>
        <TextInput
          value={condition}
          onChangeText={setCondition}
          placeholder="Like new"
          style={styles.input}
        />
      </View>

      {/* Description */}
      <View style={styles.field}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Fit, fabric, usage…"
          style={[styles.input, styles.textarea]}
          multiline
        />
      </View>

      {/* Submit – inline, not floating */}
      <Pressable style={styles.submit} onPress={submit}>
        <Text style={styles.submitText}>Publish item</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingTop: 64,
  },

  header: {
    fontSize: 28,
    fontWeight: "600",
    letterSpacing: -0.3,
    color: "#111",
    marginBottom: 24,
  },

  imageBox: {
    height: 280,
    borderRadius: 26,
    backgroundColor: "#F3F4F6",
    overflow: "hidden",
    marginBottom: 24,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  imagePlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  imageHint: {
    color: "#6B7280",
    fontSize: 14,
  },

  field: {
    marginBottom: 16,
  },

  label: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    padding: 14,
    fontSize: 15,
    backgroundColor: "#fff",
  },

  textarea: {
    minHeight: 110,
    textAlignVertical: "top",
  },

  submit: {
    marginTop: 28,
    height: 56,
    backgroundColor: "#111",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  submitText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
    letterSpacing: 0.2,
  },

  removeButton: {
    position: "absolute",
    top: 12,
    left: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.95)",
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },
});
