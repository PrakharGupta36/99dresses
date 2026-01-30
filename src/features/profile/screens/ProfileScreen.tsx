import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { auth, db } from "../../../services/firebase";
import { useUserProfile } from "../hooks/useUserProfile";

export default function ProfileScreen() {
  const { profile, loading } = useUserProfile();
  const router = useRouter();

  async function logout() {
    await signOut(auth);
    router.replace("/login");
  }

  async function editProfile() {
    if (!profile) return;

    Alert.prompt(
      "Edit name",
      "Enter your new name",
      async (value) => {
        if (!value || !value.trim()) return;

        try {
          const ref = doc(db, "users", profile.uid);

          await updateDoc(ref, {
            name: value.trim(),
          });
        } catch (e) {
          Alert.alert("Update failed");
        }
      },
      "plain-text",
      profile.name,
    );
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
      {/* Top title */}
      <View style={styles.topBar}>
        <Text style={styles.topTitle}>Profile</Text>
      </View>

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

        <Pressable style={styles.editButton} onPress={editProfile}>
          <Text style={styles.editText}>Edit profile</Text>
        </Pressable>
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

  topBar: {
    paddingTop: 48,
    paddingBottom: 12,
  },

  topTitle: {
    fontSize: 28,
    fontWeight: "600",
    letterSpacing: -0.3,
    color: "#111",
  },

  header: {
    alignItems: "center",
    marginTop: 24,
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

  editButton: {
    marginTop: 16,
    paddingHorizontal: 18,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },

  editText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#111",
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
