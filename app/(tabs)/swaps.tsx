import { useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  Animated,
} from "react-native";
import { useRef } from "react";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.78;
const SPACING = 18;
const SIDE_SPACING = (width - CARD_WIDTH) / 2;

export const MOCK_SWAPS = [
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
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=900",
    distance: "2.4 km away",
  },
  {
    id: "3",
    title: "Wide fit denim",
    brand: "Uniqlo U",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=900",
    distance: "900 m away",
  },
  {
    id: "4",
    title: "Relaxed cotton shirt",
    brand: "COS",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=900",
    distance: "1.8 km away",
  },
  {
    id: "5",
    title: "Minimal white sneakers",
    brand: "Nike Lab",
    image:
      "https://images.unsplash.com/photo-1528701800489-20be3c39ea89?q=80&w=900",
    distance: "3.1 km away",
  },
  {
    id: "6",
    title: "Wool overcoat",
    brand: "Massimo Dutti",
    image:
      "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?q=80&w=900",
    distance: "2.0 km away",
  },
  {
    id: "7",
    title: "Straight fit chinos",
    brand: "Muji",
    image:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=900",
    distance: "1.5 km away",
  },
  {
    id: "8",
    title: "Boxy fit sweatshirt",
    brand: "Pull&Bear",
    image:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=900",
    distance: "700 m away",
  },
];

export default function Swaps() {
  const router = useRouter();
  const scrollX = useRef(new Animated.Value(0)).current;

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

      <Animated.FlatList
        data={MOCK_SWAPS}
        keyExtractor={(i) => i.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + SPACING}
        decelerationRate="fast"
        bounces={false}
        contentContainerStyle={{
          paddingHorizontal: SIDE_SPACING,
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true },
        )}
        renderItem={({ item, index }) => (
          <SwapCard
            item={item}
            index={index}
            scrollX={scrollX}
            onPress={() => router.push(`../swap/${item.id}`)}
          />
        )}
      />
    </View>
  );
}

function SwapCard({
  item,
  index,
  scrollX,
  onPress,
}: {
  item: (typeof MOCK_SWAPS)[0];
  index: number;
  scrollX: Animated.Value;
  onPress: () => void;
}) {
  const inputRange = [
    (index - 1) * (CARD_WIDTH + SPACING),
    index * (CARD_WIDTH + SPACING),
    (index + 1) * (CARD_WIDTH + SPACING),
  ];

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.92, 1, 0.92],
    extrapolate: "clamp",
  });

  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [16, 0, 16],
    extrapolate: "clamp",
  });

  const imageTranslate = scrollX.interpolate({
    inputRange,
    outputRange: [-20, 0, 20],
    extrapolate: "clamp",
  });

  const pressScale = useRef(new Animated.Value(1)).current;

  function pressIn() {
    Animated.spring(pressScale, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  }

  function pressOut() {
    Animated.spring(pressScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }

  return (
    <Pressable onPress={onPress} onPressIn={pressIn} onPressOut={pressOut}>
      <Animated.View
        style={[
          styles.card,
          {
            width: CARD_WIDTH,
            marginRight: SPACING,
            transform: [{ scale }, { translateY }, { scale: pressScale }],
          },
        ]}
      >
        <View style={styles.imageWrap}>
          <Animated.Image
            source={{ uri: item.image }}
            style={[
              styles.image,
              {
                transform: [{ translateX: imageTranslate }],
              },
            ]}
          />

          <View style={styles.overlay} />

          {/* brand pill */}
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
    paddingBottom: 50,
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

  card: {
    borderRadius: 26,
    backgroundColor: "#fff",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },

    elevation: 6,
  },

  imageWrap: {
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    overflow: "hidden",
  },

  image: {
    width: "110%",
    height: 340,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.06)",
  },

  badge: {
    position: "absolute",
    left: 16,
    top: 16,
    backgroundColor: "rgba(255,255,255,0.92)",
    paddingHorizontal: 12,
    paddingVertical: 5,
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
    paddingVertical: 16,
  },

  itemTitle: {
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: -0.2,
    color: "#111",
  },

  distance: {
    marginTop: 8,
    fontSize: 13,
    color: "#9CA3AF",
  },
});
