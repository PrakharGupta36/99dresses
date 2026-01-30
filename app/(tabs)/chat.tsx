import { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Animated,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MOCK_CHATS = [
  {
    id: "1",
    name: "Aarav",
    item: "Black oversized hoodie",
    lastMessage: "Looks good to me. When can we meet?",
    time: "2m",
    unread: true,
  },
  {
    id: "2",
    name: "Isha",
    item: "Beige trench coat",
    lastMessage: "Can you share one more photo?",
    time: "18m",
    unread: false,
  },
  {
    id: "3",
    name: "Kunal",
    item: "Wide denim pants",
    lastMessage: "Deal works for me.",
    time: "1h",
    unread: false,
  },
];

const HEADER_MAX = 96;
const HEADER_MIN = 56;

export default function Chat() {
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [HEADER_MAX, HEADER_MIN],
    extrapolate: "clamp",
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 40],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />

      <Animated.View
        style={[
          styles.header,
          {
            height: headerHeight,
          },
        ]}
      >
        <Animated.Text
          style={[
            styles.title,
            {
              opacity: headerOpacity,
            },
          ]}
        >
          Messages
        </Animated.Text>

        <Text style={styles.subtitle}>Your ongoing swaps</Text>
      </Animated.View>

      <Animated.FlatList
        data={MOCK_CHATS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        renderItem={({ item, index }) => <ChatRow item={item} index={index} />}
      />
    </View>
  );
}

function ChatRow({
  item,
  index,
}: {
  item: (typeof MOCK_CHATS)[0];
  index: number;
}) {
  const appear = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  Animated.timing(appear, {
    toValue: 1,
    duration: 420,
    delay: index * 60,
    useNativeDriver: true,
  }).start();

  const translateY = appear.interpolate({
    inputRange: [0, 1],
    outputRange: [14, 0],
  });

  function pressIn() {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 30,
      bounciness: 0,
    }).start();
  }

  function pressOut() {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 6,
    }).start();
  }

  return (
    <Pressable onPressIn={pressIn} onPressOut={pressOut}>
      <Animated.View
        style={[
          styles.card,
          {
            opacity: appear,
            transform: [{ translateY }, { scale }],
          },
        ]}
      >
        {/* Plain user icon */}
        <View style={styles.avatarWrap}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={22} color="#6B7280" />
          </View>

          {item.unread && <View style={styles.unreadDot} />}
        </View>

        <View style={styles.body}>
          <View style={styles.topRow}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>

          <View style={styles.itemPill}>
            <Text style={styles.itemText}>{item.item}</Text>
          </View>

          <Text
            style={[styles.last, item.unread && styles.lastUnread]}
            numberOfLines={1}
          >
            {item.lastMessage}
          </Text>
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
    paddingHorizontal: 24,
    justifyContent: "flex-end",
    paddingBottom: 12,
    marginTop:45,
  },

  title: {
    fontSize: 30,
    fontWeight: "600",
    letterSpacing: -0.3,
    color: "#111",
  },

  subtitle: {
    marginTop: 2,
    fontSize: 13,
    color: "#9CA3AF",
  },

  list: {
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 140,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 14,
    marginBottom: 14,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },

  avatarWrap: {
    marginRight: 12,
  },

  avatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },

  unreadDot: {
    position: "absolute",
    right: -2,
    top: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#111",
    borderWidth: 2,
    borderColor: "#fff",
  },

  body: {
    flex: 1,
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

  itemPill: {
    alignSelf: "flex-start",
    marginTop: 6,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },

  itemText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#374151",
  },

  last: {
    marginTop: 8,
    fontSize: 14,
    color: "#6B7280",
  },

  lastUnread: {
    color: "#111",
    fontWeight: "500",
  },
});
