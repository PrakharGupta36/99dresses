import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../../services/firebase";
import { useRouter } from "expo-router";
import { useUserProfile } from "../hooks/useUserProfile";

export default function ProfileScreen() {
  const { profile, loading } = useUserProfile();
  const router = useRouter();

  async function logout() {
    await signOut(auth);
    router.replace("/login");
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.center}>
        <Text>No profile found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        {profile.photo ? (
          <Image source={{ uri: profile.photo }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>
              {profile.name?.[0]?.toUpperCase() ?? "U"}
            </Text>
          </View>
        )}

        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.email}>{profile.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Member since</Text>
        <Text style={styles.value}>
          {profile.createdAt?.toDate
            ? profile.createdAt.toDate().toDateString()
            : "-"}
        </Text>
      </View>

      <Pressable style={styles.logout} onPress={logout}>
        <Text style={styles.logoutText}>Log out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 48,
  },

  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    marginBottom: 16,
  },

  avatarPlaceholder: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  avatarText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "600",
  },

  name: {
    fontSize: 22,
    fontWeight: "600",
    color: "#111",
  },

  email: {
    marginTop: 4,
    fontSize: 14,
    color: "#6B7280",
  },

  section: {
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
    paddingTop: 20,
  },

  label: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 4,
  },

  value: {
    fontSize: 16,
    color: "#111",
  },

  logout: {
    marginTop: "auto",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },

  logoutText: {
    color: "#111",
    fontSize: 16,
    fontWeight: "500",
  },
});
