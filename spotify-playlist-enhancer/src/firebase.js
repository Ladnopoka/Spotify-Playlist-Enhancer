import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDcvM_DjzgxVYStXymMEaJ_dtujVbE4R6k",
  authDomain: "spotify-playlist-api.firebaseapp.com",
  projectId: "spotify-playlist-api",
  storageBucket: "spotify-playlist-api.appspot.com",
  messagingSenderId: "541511073797",
  appId: "1:541511073797:web:00454bbfefb88f6c3a5c6c",
  measurementId: "G-7LGGEHRLC1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default getFirestore();