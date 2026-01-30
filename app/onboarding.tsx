import { useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Pressable,
  StyleSheet,
  Animated,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const PAGES = [
  {
    title: "Trade clothes, not money",
    subtitle:
      "Exchange fashion pieces with people near you. Fair, fast and transparent swaps.",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1080&q=80",
  },
  {
    title: "Smart swaps",
    subtitle:
      "We intelligently match your clothes with nearby users based on style, size and value.",
    image:
      "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=1080&q=80",
  },
  {
    title: "Sustainable by design",
    subtitle:
      "Refresh your wardrobe without buying more — and help reduce fashion waste.",
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1080&q=80",
  },
];

export default function Onboarding() {
  const router = useRouter();
  const listRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [page, setPage] = useState(0);

  const finish = async () => {
    await AsyncStorage.setItem("@onboarding_seen", "true");
    router.replace("/login");
  };

  const onNext = () => {
    if (page < PAGES.length - 1) {
      listRef.current?.scrollToIndex({
        index: page + 1,
        animated: true,
      });
    } else {
      finish();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      {/* Skip */}
      <Pressable onPress={finish} style={styles.skip}>
        <Text style={styles.skipText}>Skip</Text>
      </Pressable>

      <Animated.FlatList
        ref={listRef}
        data={PAGES}
        keyExtractor={(_, i) => i.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setPage(index);
        }}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [40, 0, 40],
            extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
            extrapolate: "clamp",
          });

          return (
            <View style={[styles.page, { width }]}>
              <View style={styles.hero}>
                <Animated.Image
                  source={{ uri: item.image }}
                  style={[
                    styles.image,
                    {
                      transform: [{ translateY }],
                      opacity,
                    },
                  ]}
                />
              </View>

              <Animated.View
                style={[
                  styles.textBlock,
                  {
                    transform: [{ translateY }],
                    opacity,
                  },
                ]}
              >
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
              </Animated.View>
            </View>
          );
        }}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.progress}>
          {PAGES.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [1, 2.2, 1],
              extrapolate: "clamp",
            });

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });

            return (
              <Animated.View
                key={i}
                style={[
                  styles.dot,
                  {
                    transform: [{ scaleX: scale }],
                    opacity,
                  },
                ]}
              />
            );
          })}
        </View>

        <Pressable style={styles.button} onPress={onNext}>
          <Text style={styles.buttonText}>
            {page === PAGES.length - 1 ? "Start swapping" : "Continue"}
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

  skip: {
    position: "absolute",
    right: 24,
    top: 56,
    zIndex: 10,
  },

  skipText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },

  page: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: "center",
  },

  hero: {
    height: 320,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 36,
  },

  image: {
    width: width * 0.72,
    height: 280,
    borderRadius: 28,
    backgroundColor: "#F3F4F6",

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 12 },

    elevation: 10,
  },

  textBlock: {
    maxWidth: 320,
  },

  title: {
    fontSize: 34,
    fontWeight: "600",
    letterSpacing: -0.4,
    color: "#111",
    marginBottom: 14,
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
    bottom: 36,
    paddingHorizontal: 28,
  },

  progress: {
    flexDirection: "row",
    marginBottom: 22,
  },

  dot: {
    height: 6,
    width: 8,
    borderRadius: 3,
    backgroundColor: "#111",
    marginRight: 8,
  },

  button: {
    height: 54,
    borderRadius: 16,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
});
