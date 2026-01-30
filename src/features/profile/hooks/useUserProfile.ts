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
    let unsubscribeDoc: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (unsubscribeDoc) {
        unsubscribeDoc();
        unsubscribeDoc = null;
      }

      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      setLoading(true);

      const ref = doc(db, "users", user.uid);

      unsubscribeDoc = onSnapshot(
        ref,
        (snap) => {
          if (snap.exists()) {
            const data = snap.data();

            setProfile({
              uid: user.uid,     // ✅ VERY IMPORTANT
              name: data.name,
              email: data.email,
              photo: data.photo ?? null,
              createdAt: data.createdAt,
            });
          } else {
            setProfile(null);
          }

          setLoading(false);
        },
        () => {
          setLoading(false);
        }
      );
    });

    return () => {
      if (unsubscribeDoc) unsubscribeDoc();
      unsubscribeAuth();
    };
  }, []);

  return { profile, loading };
}
