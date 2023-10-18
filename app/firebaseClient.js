import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxIt5HRgz_aUvuFH1w1CFnbDeWj2DGM60",

  authDomain: "sam-skulsky.firebaseapp.com",

  projectId: "sam-skulsky",

  storageBucket: "sam-skulsky.appspot.com",

  messagingSenderId: "743339915767",

  appId: "1:743339915767:web:97094868aaacfa9ac7d6f2",
};

let app;
// Make sure we haven't initialized the app more than once
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
}

const db = getFirestore(app);
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();

export { db, auth, googleAuthProvider };
