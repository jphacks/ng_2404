import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./config";
import router from "next/router";

export type AuthUserProps = {
  email: string;
  password: string;
};

export const createUser = async ({ email, password }: AuthUserProps) =>
  createUserWithEmailAndPassword(auth, email, password);

export const signIn = async ({ email, password }: AuthUserProps) =>
  signInWithEmailAndPassword(auth, email, password);

export const signOutUser = async () => {
  try {
    await signOut(auth);
    router.push("/");
  } catch (error) {
    console.error(error);
  }
};
