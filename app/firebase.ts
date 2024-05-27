import { FirebaseError, initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

async function signupByEmail(email: string, password: string) {
  try {
    const auth = getAuth(app);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return { message: "Signup successful", ...user };
  } catch (error: unknown) {
    const firebaseError = error as FirebaseError;
    throw firebaseError.code;
  }
}

async function login(email: string, password: string) {
  try {
    const auth = getAuth(app);
    console.log(auth);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return { message: "Login successful", ...user };
  } catch (error: unknown) {
    const firebaseError = error as FirebaseError;
    throw firebaseError.code;
  }
}

async function logout() {
  try {
    const auth = getAuth(app);
    await signOut(auth);
    return { message: "Logout successful" };
  } catch (error: unknown) {
    const firebaseError = error as FirebaseError;
    throw firebaseError.code;
  }
}

export { login, logout, signupByEmail };
