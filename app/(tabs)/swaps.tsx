import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
} from "react-native";

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
  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Smart swaps</Text>
        <Text style={styles.subtitle}>Curated swaps near you</Text>
      </View>

      <FlatList
        data={MOCK_SWAPS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.cardBody}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.brand}>{item.brand}</Text>

              <Text style={styles.distance}>{item.distance}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: "600",
    letterSpacing: -0.3,
    color: "#111",
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#6B7280",
  },

  list: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 18,
    overflow: "hidden",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },

    elevation: 3,
  },

  image: {
    width: "100%",
    height: 220,
  },

  cardBody: {
    padding: 14,
  },

  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },

  brand: {
    marginTop: 4,
    fontSize: 13,
    color: "#6B7280",
  },

  distance: {
    marginTop: 10,
    fontSize: 12,
    color: "#9CA3AF",
  },
});
