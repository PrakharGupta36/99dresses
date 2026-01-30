import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export async function signUpWithEmail(
  email: string,
  password: string,
  name: string
) {
  const result = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = result.user;

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email,
    name,
    createdAt: serverTimestamp(),
  });

  return user;
}

export async function signInWithEmail(
  email: string,
  password: string
) {
  const result = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return result.user;
}
