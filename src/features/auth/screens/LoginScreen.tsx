import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { signInWithEmail } from "../../../services/auth/emailAuth";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onLogin() {
    try {
      setLoading(true);
      setError(null);

      await signInWithEmail(email.trim(), password);

      router.replace("/(tabs)/swaps");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        {/* Brand */}
        <Text style={styles.brand}>99dresses</Text>

        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Sign in to continue swapping</Text>

        <View style={styles.form}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />

          {error && <Text style={styles.error}>{error}</Text>}

          <Pressable
            onPress={onLogin}
            disabled={loading}
            style={({ pressed }) => [
              styles.button,
              pressed && { opacity: 0.9 },
            ]}
          >
            <Text style={styles.buttonText}>
              {loading ? "Signing in…" : "Continue"}
            </Text>
          </Pressable>
        </View>

        <View style={styles.footer}>
          <Pressable onPress={() => router.push("/signup")}>
            <Text style={styles.link}>
              Don’t have an account?{" "}
              <Text style={styles.linkStrong}>Sign up</Text>
            </Text>
          </Pressable>
          {/* <Pressable
            onPress={async () => {
              const AsyncStorage = (
                await import("@react-native-async-storage/async-storage")
              ).default;

              await AsyncStorage.removeItem("@onboarding_seen");
              alert("Onboarding reset");
            }}
          >
            <Text
              style={{ marginTop: 12, color: "#9CA3AF", textAlign: "center" }}
            >
              Reset onboarding (dev)
            </Text>
          </Pressable> */}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },

  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
  },

  brand: {
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 1.4,
    color: "#111",
    marginBottom: 48,
  },

  title: {
    fontSize: 32,
    fontWeight: "600",
    letterSpacing: -0.4,
    color: "#111",
  },

  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: "#6B7280",
  },

  form: {
    marginTop: 48,
  },

  input: {
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 16,
    fontSize: 15,
    marginBottom: 14,
    color: "#111",
  },

  button: {
    marginTop: 10,
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

  footer: {
    marginTop: "auto",
    paddingBottom: 32,
    alignItems: "center",
  },

  link: {
    fontSize: 14,
    color: "#6B7280",
  },

  linkStrong: {
    color: "#111",
    fontWeight: "600",
  },

  error: {
    marginBottom: 10,
    color: "#DC2626",
    fontSize: 13,
  },
});
