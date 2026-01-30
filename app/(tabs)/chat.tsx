import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
} from "react-native";

const MOCK_CHATS = [
  {
    id: "1",
    name: "Aarav",
    item: "Black oversized hoodie",
    lastMessage: "Looks good to me. When can we meet?",
    avatar:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=400",
    time: "2m",
  },
  {
    id: "2",
    name: "Isha",
    item: "Beige trench coat",
    lastMessage: "Can you share one more photo?",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400",
    time: "18m",
  },
  {
    id: "3",
    name: "Kunal",
    item: "Wide denim pants",
    lastMessage: "Deal works for me.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400",
    time: "1h",
  },
];

export default function Chat() {
  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
      </View>

      <FlatList
        data={MOCK_CHATS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable style={styles.row}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />

            <View style={styles.body}>
              <View style={styles.topRow}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>

              <Text style={styles.item}>{item.item}</Text>
              <Text style={styles.last} numberOfLines={1}>
                {item.lastMessage}
              </Text>
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
    paddingBottom: 12,
  },

  title: {
    fontSize: 28,
    fontWeight: "600",
    letterSpacing: -0.3,
    color: "#111",
  },

  list: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },

  row: {
    flexDirection: "row",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E5E7EB",
  },

  body: {
    flex: 1,
    marginLeft: 12,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
  },

  time: {
    fontSize: 12,
    color: "#9CA3AF",
  },

  item: {
    marginTop: 2,
    fontSize: 13,
    color: "#6B7280",
  },

  last: {
    marginTop: 6,
    fontSize: 14,
    color: "#111",
  },
});
