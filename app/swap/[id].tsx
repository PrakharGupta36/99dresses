import { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  StatusBar,
  Dimensions,
  Image,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const HEADER_HEIGHT = 420;

export const MOCK_SWAPS = [
  {
    id: "1",
    title: "Black oversized hoodie",
    brand: "ZARA",
    images: [
      "https://image.hm.com/assets/hm/f0/02/f002ff8a0f069f96f3896012d36d467a915024d6.jpg?imwidth=1536x",
      "https://images.unsplash.com/photo-1520975922284-9f9d6f2d7e03?q=80&w=900",
    ],
    distance: "1.2 km away",
    size: "M",
    condition: "Like new",
    description:
      "Heavy cotton oversized hoodie with dropped shoulders and soft fleece lining.",
    seller: { name: "Aarav", rating: 4.8 },
  },
  {
    id: "2",
    title: "Beige trench coat",
    brand: "H&M Studio",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=900",
      "https://images.unsplash.com/photo-1592878897400-9b5f6a2b0f7f?q=80&w=900",
    ],
    distance: "2.4 km away",
    size: "S",
    condition: "Excellent",
    description: "Classic beige trench with belt and storm flap. Barely worn.",
    seller: { name: "Isha", rating: 4.6 },
  },
  {
    id: "3",
    title: "Wide fit denim",
    brand: "Uniqlo U",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=900",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=900",
    ],
    distance: "900 m away",
    size: "32",
    condition: "Good",
    description:
      "Wide straight denim with mid-rise waist and soft washed finish.",
    seller: { name: "Kunal", rating: 4.7 },
  },
  {
    id: "4",
    title: "Relaxed cotton shirt",
    brand: "COS",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=900",
      "https://images.unsplash.com/photo-1620799140188-3b2a02fdc9b1?q=80&w=900",
    ],
    distance: "1.8 km away",
    size: "L",
    condition: "Like new",
    description: "Soft premium cotton shirt with relaxed silhouette.",
    seller: { name: "Rhea", rating: 4.9 },
  },
  {
    id: "5",
    title: "Minimal white sneakers",
    brand: "Nike Lab",
    images: [
      "https://images.unsplash.com/photo-1528701800489-20be3c39ea89?q=80&w=900",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=900",
    ],
    distance: "3.1 km away",
    size: "UK 9",
    condition: "Good",
    description: "Clean minimal sneakers. Slight sole wear only.",
    seller: { name: "Dev", rating: 4.4 },
  },
  {
    id: "6",
    title: "Wool overcoat",
    brand: "Massimo Dutti",
    images: [
      "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?q=80&w=900",
      "https://images.unsplash.com/photo-1585914924626-15adac1e6402?q=80&w=900",
    ],
    distance: "2.0 km away",
    size: "M",
    condition: "Excellent",
    description: "Warm tailored wool overcoat for winter layering.",
    seller: { name: "Nikhil", rating: 4.8 },
  },
  {
    id: "7",
    title: "Straight fit chinos",
    brand: "Muji",
    images: [
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=900",
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=900",
    ],
    distance: "1.5 km away",
    size: "32",
    condition: "Good",
    description: "Comfortable straight fit chinos in breathable fabric.",
    seller: { name: "Aman", rating: 4.5 },
  },
  {
    id: "8",
    title: "Boxy fit sweatshirt",
    brand: "Pull&Bear",
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=900",
      "https://images.unsplash.com/photo-1618354692215-6d90e1c1c38b?q=80&w=900",
    ],
    distance: "700 m away",
    size: "M",
    condition: "Like new",
    description: "Boxy silhouette sweatshirt with soft brushed interior.",
    seller: { name: "Neha", rating: 4.7 },
  },
  {
    id: "9",
    title: "Denim jacket",
    brand: "Levi’s",
    images: [
      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=900",
      "https://images.unsplash.com/photo-1520975869018-7cdd7f4b4a30?q=80&w=900",
    ],
    distance: "2.7 km away",
    size: "L",
    condition: "Good",
    description: "Classic trucker denim jacket with light fade.",
    seller: { name: "Sahil", rating: 4.6 },
  },
  {
    id: "10",
    title: "Utility cargo pants",
    brand: "Carhartt WIP",
    images: [
      "https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?q=80&w=900",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=900",
    ],
    distance: "3.4 km away",
    size: "34",
    condition: "Excellent",
    description: "Heavy-duty utility cargo pants with multiple pockets.",
    seller: { name: "Rohit", rating: 4.9 },
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
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color="#111" />
        </Pressable>
        <Text>Item not found</Text>
      </View>
    );
  }

  const headerOpacity = scrollY.interpolate({
    inputRange: [HEADER_HEIGHT - 120, HEADER_HEIGHT - 60],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const imageTranslate = scrollY.interpolate({
    inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
    outputRange: [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.6],
    extrapolate: "clamp",
  });

  const imageScale = scrollY.interpolate({
    inputRange: [-HEADER_HEIGHT, 0],
    outputRange: [1.6, 1],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      {/* Sticky header */}
      <Animated.View
        style={[
          styles.stickyHeader,
          {
            opacity: headerOpacity,
          },
        ]}
      >
        <Text style={styles.stickyTitle} numberOfLines={1}>
          {item.title}
        </Text>
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 160 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
      >
        {/* Image pager */}
        <View style={{ height: HEADER_HEIGHT }}>
          <Animated.View
            style={{
              flex: 1,
              transform: [
                { translateY: imageTranslate },
                { scale: imageScale },
              ],
            }}
          >
            <Animated.ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
            >
              {item.images.map((img, i) => (
                <Image key={i} source={{ uri: img }} style={styles.heroImage} />
              ))}
            </Animated.ScrollView>
          </Animated.View>
        </View>

        <View style={styles.body}>
          {/* Title row */}
          <Text style={styles.title}>{item.title}</Text>

          {/* Pills */}
          <View style={styles.pillRow}>
            <View style={styles.brandPill}>
              <Text style={styles.brandText}>{item.brand}</Text>
            </View>

            <View style={styles.conditionPill}>
              <Text style={styles.conditionText}>{item.condition}</Text>
            </View>
          </View>

          <View style={styles.metaRow}>
            <Text style={styles.meta}>Size · {item.size}</Text>
            <Text style={styles.meta}>{item.distance}</Text>
          </View>

          <Text style={styles.description}>{item.description}</Text>

          {/* Seller mini card */}
          <View style={styles.sellerCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.seller.name[0]}</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.sellerName}>{item.seller.name}</Text>
              <Text style={styles.sellerSub}>
                ⭐ {item.seller.rating} · Trusted swapper
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </View>
        </View>
      </Animated.ScrollView>

      {/* Back */}
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={22} color="#111" />
      </Pressable>

      {/* CTA */}
      <View style={styles.bottomBar}>
        <Pressable style={styles.cta}>
          <Text style={styles.ctaText}>Request swap</Text>
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

  heroImage: {
    width,
    height: HEADER_HEIGHT,
  },

  body: {
    padding: 24,
  },

  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#111",
  },

  pillRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },

  brandPill: {
    paddingHorizontal: 12,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },

  brandText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#111",
  },

  conditionPill: {
    paddingHorizontal: 12,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#ECFDF5",
    alignItems: "center",
    justifyContent: "center",
  },

  conditionText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#047857",
  },

  metaRow: {
    flexDirection: "row",
    gap: 16,
    marginTop: 14,
  },

  meta: {
    fontSize: 13,
    color: "#6B7280",
  },

  description: {
    marginTop: 20,
    fontSize: 15,
    lineHeight: 22,
    color: "#4B5563",
  },

  sellerCard: {
    marginTop: 28,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 16,
    backgroundColor: "#F9FAFB",
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: "#fff",
    fontWeight: "600",
  },

  sellerName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111",
  },

  sellerSub: {
    marginTop: 2,
    fontSize: 12,
    color: "#6B7280",
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

  stickyHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 96,
    paddingTop: 52,
    paddingHorizontal: 56,
    backgroundColor: "#fff",
    justifyContent: "center",
    zIndex: 20,
    borderBottomWidth: 1,
    borderColor: "#F3F4F6",
  },

  stickyTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
  },
});
