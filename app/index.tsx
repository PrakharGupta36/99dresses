import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function Index() {
  const [ready, setReady] = useState(false);
  const [seen, setSeen] = useState<boolean | null>(null);

  useEffect(() => {
    AsyncStorage.getItem("@onboarding_seen").then((v) => {
      setSeen(v === "true");
      setReady(true);
    });
  }, []);

  if (!ready) return null;

  if (!seen) return <Redirect href="/onboarding" />;

  return <Redirect href={{ pathname: "/login" }} />;
}
