import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBjnzWy6Xj9tbuhmgKOAWoCoGeEtGGt1w4",
  authDomain: "dress-99.firebaseapp.com",
  projectId: "dress-99",
  storageBucket: "dress-99.firebasestorage.app",
  messagingSenderId: "1074379445795",
  appId: "1:1074379445795:web:b7c2c7f6df7e226e8c4396",
  measurementId: "G-YBFRQQCLS7",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
