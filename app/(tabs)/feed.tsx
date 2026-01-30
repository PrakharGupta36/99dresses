import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
} from "react-native";

const MOCK_FEED = [
  {
    id: "1",
    user: "Aarav",
    item: "Black cropped jacket",
    brand: "ZARA",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800",
    time: "2 min ago",
  },
  {
    id: "2",
    user: "Isha",
    item: "Wide denim pants",
    brand: "Uniqlo U",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800",
    time: "11 min ago",
  },
  {
    id: "3",
    user: "Kunal",
    item: "Oversized hoodie",
    brand: "H&M Studio",
    image:
      "https://images.unsplash.com/photo-1520975922284-9f9d6f2d7e03?q=80&w=800",
    time: "24 min ago",
  },
];

export default function Feed() {
  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Community feed</Text>
        <Text style={styles.subtitle}>
          New drops from people near you
        </Text>
      </View>

      <FlatList
        data={MOCK_FEED}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.cardBody}>
              <Text style={styles.activity}>
                <Text style={styles.user}>{item.user}</Text> listed a new item
              </Text>

              <Text style={styles.item}>
                {item.item} · {item.brand}
              </Text>

              <Text style={styles.time}>{item.time}</Text>
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
    height: 240,
  },

  cardBody: {
    padding: 14,
  },

  activity: {
    fontSize: 13,
    color: "#6B7280",
  },

  user: {
    fontWeight: "600",
    color: "#111",
  },

  item: {
    marginTop: 6,
    fontSize: 15,
    fontWeight: "500",
    color: "#111",
  },

  time: {
    marginTop: 10,
    fontSize: 12,
    color: "#9CA3AF",
  },
});
