import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { Platform, StyleSheet, View } from "react-native";

const ACTIVE = "#111";
const INACTIVE = "#9CA3AF";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          position: "absolute",
          left: 16,
          right: 16,
          bottom: 0,

          ...(Platform.OS === "ios"
            ? {
                height: 80,
                backgroundColor: "##dfdfdf",
              }
            : {
                height: 65,
                backgroundColor: "#dfdfdf",
              }),

          borderRadius: 30,
          paddingTop: 10,

          borderTopWidth: 0,

          ...(Platform.OS === "ios"
            ? {
                shadowColor: "#000",
                shadowOpacity: 0.18,
                shadowRadius: 30,
                shadowOffset: { width: 0, height: 12 },
              }
            : {
                elevation: 14,
              }),
        },

        tabBarItemStyle: {
          borderRadius: 40,
        },

        tabBarBackground: () => (
          <View style={StyleSheet.absoluteFill}>
            <BlurView intensity={60} tint="light" style={styles.blur} />
          </View>
        ),
      }}
    >
      <Tabs.Screen
        name="swaps"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "swap-horizontal" : "swap-horizontal-outline"}
              size={22}
              color={focused ? ACTIVE : INACTIVE}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="feed"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "grid" : "grid-outline"}
              size={22}
              color={focused ? ACTIVE : INACTIVE}
            />
          ),
        }}
      />

      {/* Center action */}
      <Tabs.Screen
        name="add"
        options={{
          tabBarIcon: () => (
            <View style={styles.centerButton}>
              <Ionicons name="add" size={26} color="#fff" />
            </View>
          ),
          tabBarItemStyle: {
            marginTop: 0,
          },
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "chatbubble" : "chatbubble-outline"}
              size={22}
              color={focused ? ACTIVE : INACTIVE}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={22}
              color={focused ? ACTIVE : INACTIVE}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  blur: {
    flex: 1,
    borderRadius: 22,
    overflow: "hidden",
  },

  centerButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
  },
});
