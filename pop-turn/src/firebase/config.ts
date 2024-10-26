import { initializeApp ,getApp,getApps} from "firebase/app";
// import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

export const app = initializeApp(firebaseConfig);
// export const db = getDatabase(app);
export const firestore = getFirestore(app); // Firestoreの初期化
export const initializeFirebaseApp = () =>
    !getApps().length ? initializeApp(firebaseConfig) : getApp();