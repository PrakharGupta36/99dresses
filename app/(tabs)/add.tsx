import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function Add() {
  const [image, setImage] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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

    // Later: upload to Firebase + create document
    Alert.alert("Item added", "Your item is ready for swaps.");
  }

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={{ paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.header}>List an item</Text>

      {/* Image */}
      <Pressable style={styles.imageBox} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.imageHint}>Tap to add photo</Text>
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
    borderRadius: 22,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: 24,
  },

  image: {
    width: "100%",
    height: "100%",
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
    borderRadius: 14,
    padding: 14,
    fontSize: 15,
    backgroundColor: "#fff",
  },

  textarea: {
    minHeight: 100,
    textAlignVertical: "top",
  },

  submit: {
    marginTop: 24,
    backgroundColor: "#111",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },

  submitText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
});
