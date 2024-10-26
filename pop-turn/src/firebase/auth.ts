import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./config";

export type AuthUserProps = {
  email: string;
  password: string;
};

export const createUser = async ({ email, password }: AuthUserProps) =>
  createUserWithEmailAndPassword(auth, email, password);

export const signIn = async ({ email, password }: AuthUserProps) =>
  signInWithEmailAndPassword(auth, email, password);

export const signOutUser = async () => signOut(auth);
