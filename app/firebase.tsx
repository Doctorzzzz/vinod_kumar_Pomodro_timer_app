import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDsLx1OFDra2rwHxYUIxTNUnL5V7Wds8Ww",
  authDomain: "pomodoro-timer-cd3bd.firebaseapp.com",
  projectId: "pomodoro-timer-cd3bd",
  storageBucket: "pomodoro-timer-cd3bd.appspot.com",
  messagingSenderId: "178285147820",
  appId: "1:178285147820:web:8fa809aa47513d142f1109",
  measurementId: "G-H2RK87W0Y0",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();


export const sendResetPasswordEmail = (email: string) => {
  return sendPasswordResetEmail(auth, email);
};
