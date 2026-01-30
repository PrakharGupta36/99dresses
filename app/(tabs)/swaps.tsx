import { useRouter } from "expo-router";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Animated,
} from "react-native";
import { useRef } from "react";

const MOCK_SWAPS = [
  {
    id: "1",
    title: "Black oversized hoodie",
    brand: "ZARA",
    image:
      "https://image.hm.com/assets/hm/f0/02/f002ff8a0f069f96f3896012d36d467a915024d6.jpg?imwidth=1536x",
    distance: "1.2 km away",
  },
  {
    id: "2",
    title: "Beige trench coat",
    brand: "H&M Studio",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800",
    distance: "2.4 km away",
  },
  {
    id: "3",
    title: "Wide fit denim",
    brand: "Uniqlo U",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800",
    distance: "900 m away",
  },
];

export default function Swaps() {
  const router = useRouter();

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.kicker}>Near you</Text>
        <Text style={styles.title}>Smart swaps</Text>
        <Text style={styles.subtitle}>
          Hand-picked fashion you can exchange today
        </Text>
      </View>

      <FlatList
        data={MOCK_SWAPS}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <SwapCard
            item={item}
            onPress={() => router.push(`../swap/${item.id}`)}
          />
        )}
      />
    </View>
  );
}

function SwapCard({
  item,
  onPress,
}: {
  item: (typeof MOCK_SWAPS)[0];
  onPress: () => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  function pressIn() {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 20,
      bounciness: 0,
    }).start();
  }

  function pressOut() {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 6,
    }).start();
  }

  return (
    <Pressable onPress={onPress} onPressIn={pressIn} onPressOut={pressOut}>
      <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
        <View style={styles.imageWrap}>
          <Image source={{ uri: item.image }} style={styles.image} />

          {/* soft overlay */}
          <View style={styles.overlay} />

          {/* brand badge */}
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.brand}</Text>
          </View>
        </View>

        <View style={styles.cardBody}>
          <Text numberOfLines={1} style={styles.itemTitle}>
            {item.title}
          </Text>

          <Text style={styles.distance}>{item.distance}</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    paddingTop: 64,
    paddingHorizontal: 24,
    paddingBottom: 18,
  },

  kicker: {
    fontSize: 12,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#9CA3AF",
    marginBottom: 6,
  },

  title: {
    fontSize: 34,
    fontWeight: "600",
    letterSpacing: -0.6,
    color: "#111",
  },

  subtitle: {
    marginTop: 6,
    fontSize: 15,
    color: "#6B7280",
    maxWidth: 260,
  },

  list: {
    paddingHorizontal: 20,
    paddingBottom: 140,
  },

  card: {
    borderRadius: 24,
    marginBottom: 22,
    backgroundColor: "#fff",

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },

    elevation: 5,
  },

  imageWrap: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: 260,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.08)",
  },

  badge: {
    position: "absolute",
    left: 14,
    top: 14,
    backgroundColor: "rgba(255,255,255,0.9)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#111",
    letterSpacing: 0.3,
  },

  cardBody: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  itemTitle: {
    fontSize: 17,
    fontWeight: "600",
    letterSpacing: -0.2,
    color: "#111",
  },

  distance: {
    marginTop: 6,
    fontSize: 13,
    color: "#9CA3AF",
  },
});
