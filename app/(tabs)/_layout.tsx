import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";

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

          height: 64,
          borderRadius: 18,

          backgroundColor: "#ffffff",

          borderTopWidth: 0,

          ...(Platform.OS === "ios"
            ? {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.08,
                shadowRadius: 16,
              }
            : {
                elevation: 10,
              }),
        },

        tabBarItemStyle: {
          borderRadius: 18,
        },
      }}
    >
      <Tabs.Screen
        name="swaps"
        options={{
          tabBarIcon: ({ focused, size }) => (
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
          tabBarIcon: ({ focused }) => (
            <Ionicons name="add" size={28} color={focused ? "#fff" : "#fff"} />
          ),
          tabBarItemStyle: {
            marginTop: -22,
          },
          tabBarLabel: undefined,
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#fff",
          tabBarIconStyle: {
            backgroundColor: "#111",
            borderRadius: 999,
            width: 48,
            height: 48,
            justifyContent: "center",
            alignItems: "center",
          } as any,
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
