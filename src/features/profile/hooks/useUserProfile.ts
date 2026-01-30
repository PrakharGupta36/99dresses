import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../../services/firebase";

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  photo?: string | null;
  createdAt?: any;
}

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      const ref = doc(db, "users", user.uid);

      const unsubDoc = onSnapshot(ref, (snap) => {
        if (snap.exists()) {
          setProfile(snap.data() as UserProfile);
        } else {
          setProfile(null);
        }

        setLoading(false);
      });

      return unsubDoc;
    });

    return () => unsubAuth();
  }, []);

  return { profile, loading };
}
