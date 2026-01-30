import { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  StatusBar,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const HEADER_HEIGHT = 380;

const MOCK_SWAPS = [
  {
    id: "1",
    title: "Black oversized hoodie",
    brand: "ZARA",
    image:
      "https://image.hm.com/assets/hm/f0/02/f002ff8a0f069f96f3896012d36d467a915024d6.jpg?imwidth=1536x",
    distance: "1.2 km away",
    size: "M",
    condition: "Like new",
    description:
      "Relaxed fit hoodie in heavy cotton. Worn only twice. Perfect for daily wear.",
  },
  {
    id: "2",
    title: "Beige trench coat",
    brand: "H&M Studio",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800",
    distance: "2.4 km away",
    size: "S",
    condition: "Excellent",
    description:
      "Lightweight trench coat. Clean silhouette and premium fabric feel.",
  },
  {
    id: "3",
    title: "Wide fit denim",
    brand: "Uniqlo U",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800",
    distance: "900 m away",
    size: "32",
    condition: "Good",
    description:
      "Wide straight denim. Comfortable fit and classic everyday look.",
  },
];

export default function SwapDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const scrollY = useRef(new Animated.Value(0)).current;

  const item = MOCK_SWAPS.find((x) => x.id === id);

  if (!item) {
    return (
      <View style={styles.center}>
        <Text>Item not found</Text>
      </View>
    );
  }

  const translateY = scrollY.interpolate({
    inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
    outputRange: [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
    extrapolate: "clamp",
  });

  const scale = scrollY.interpolate({
    inputRange: [-HEADER_HEIGHT, 0],
    outputRange: [2, 1],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 140 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
      >
        {/* Parallax header */}
        <View style={{ height: HEADER_HEIGHT, overflow: "hidden" }}>
          <Animated.Image
            source={{ uri: item.image }}
            style={[
              styles.image,
              {
                transform: [{ translateY }, { scale }],
              },
            ]}
          />
        </View>

        <View style={styles.body}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.brand}>{item.brand}</Text>

          <View style={styles.metaRow}>
            <Text style={styles.meta}>Size · {item.size}</Text>
            <Text style={styles.meta}>Condition · {item.condition}</Text>
          </View>

          <Text style={styles.description}>{item.description}</Text>

          <View style={styles.locationBox}>
            <Text style={styles.location}>{item.distance}</Text>
          </View>
        </View>
      </Animated.ScrollView>

      {/* floating back */}
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={22} color="#111" />
      </Pressable>

      {/* fixed CTA */}
      <View style={styles.bottomBar}>
        <Pressable style={styles.cta}>
          <Text style={styles.ctaText}>Propose swap</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: "100%",
    height: HEADER_HEIGHT,
  },

  body: {
    padding: 24,
  },

  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#111",
  },

  brand: {
    marginTop: 4,
    fontSize: 14,
    color: "#6B7280",
  },

  metaRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 14,
  },

  meta: {
    fontSize: 13,
    color: "#374151",
  },

  description: {
    marginTop: 18,
    fontSize: 15,
    lineHeight: 22,
    color: "#4B5563",
  },

  locationBox: {
    marginTop: 20,
  },

  location: {
    fontSize: 13,
    color: "#9CA3AF",
  },

  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 24,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#F3F4F6",
  },

  cta: {
    height: 54,
    borderRadius: 16,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },

  ctaText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  backButton: {
    position: "absolute",
    top: 52,
    left: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.92)",
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },

    elevation: 6,
  },
});
