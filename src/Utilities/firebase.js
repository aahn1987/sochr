import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDF9X5qxDdurOvAtqa0_rWZrcYQ9WXhnSA",
  authDomain: "sochrpayroll.firebaseapp.com",
  projectId: "sochrpayroll",
  storageBucket: "sochrpayroll.firebasestorage.app",
  messagingSenderId: "876743523671",
  appId: "1:876743523671:web:0f7ae19ab09e0170cc5212",
  measurementId: "G-8VETVDGMNX",
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
