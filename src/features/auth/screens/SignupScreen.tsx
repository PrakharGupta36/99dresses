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
import { signUpWithEmail } from "../../../services/auth/emailAuth";

export default function SignupScreen() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSignup() {
    try {
      setLoading(true);
      setError(null);

      await signUpWithEmail(email.trim(), password, name.trim());

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

        <Text style={styles.title}>Create account</Text>
        <Text style={styles.subtitle}>Join the swap community</Text>

        <View style={styles.form}>
          <TextInput
            placeholder="Full name"
            placeholderTextColor="#9CA3AF"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

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
            onPress={onSignup}
            disabled={loading}
            style={({ pressed }) => [
              styles.button,
              pressed && { opacity: 0.9 },
            ]}
          >
            <Text style={styles.buttonText}>
              {loading ? "Creating…" : "Continue"}
            </Text>
          </Pressable>
        </View>

        <View style={styles.footer}>
          <Pressable onPress={() => router.replace("/login")}>
            <Text style={styles.link}>
              Already have an account?{" "}
              <Text style={styles.linkStrong}>Login</Text>
            </Text>
          </Pressable>
          
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
