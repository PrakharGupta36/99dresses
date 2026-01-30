import { useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Pressable,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const PAGES = [
  {
    title: "Trade clothes, not money",
    subtitle:
      "Exchange fashion items with people near you — instantly and fairly.",
  },
  {
    title: "Smart swaps",
    subtitle:
      "We match your clothes with the best nearby swaps using style, size and value.",
  },
  {
    title: "Sustainable by design",
    subtitle: "Reduce waste and refresh your wardrobe without buying more.",
  },
];

export default function Onboarding() {
  const router = useRouter();
  const listRef = useRef<FlatList>(null);
  const [page, setPage] = useState(0);

  const onNext = async () => {
    if (page < PAGES.length - 1) {
      listRef.current?.scrollToIndex({
        index: page + 1,
        animated: true,
      });
    } else {
      await AsyncStorage.setItem("@onboarding_seen", "true");
      router.replace("/login");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={PAGES}
        keyExtractor={(_, i) => i.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setPage(index);
        }}
        renderItem={({ item }) => (
          <View style={[styles.page, { width }]}>
            <View style={styles.center}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>
          </View>
        )}
      />

      {/* footer */}
      <View style={styles.footer}>
        <View style={styles.dots}>
          {PAGES.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === page && styles.dotActive]}
            />
          ))}
        </View>

        <Pressable onPress={onNext} style={styles.button}>
          <Text style={styles.buttonText}>
            {page === PAGES.length - 1 ? "Continue" : "Next"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  page: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "center",
  },

  center: {
    marginBottom: 120,
  },

  title: {
    fontSize: 34,
    fontWeight: "600",
    color: "#111",
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: "#6B7280",
  },

  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 32,
    paddingHorizontal: 32,
  },

  dots: {
    flexDirection: "row",
    marginBottom: 24,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#E5E7EB",
    marginRight: 6,
  },

  dotActive: {
    backgroundColor: "#111",
    width: 18,
  },

  button: {
    height: 52,
    borderRadius: 14,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
