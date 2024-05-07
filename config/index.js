import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQstTdngUWnIGg6QXXy7Q2AsLbN1qj0eU",
  authDomain: "chat-react-native-8570f.firebaseapp.com",
  projectId: "chat-react-native-8570f",
  storageBucket: "chat-react-native-8570f.appspot.com",
  messagingSenderId: "677646142173",
  appId: "1:677646142173:web:50793c64accfe6324d2934",
  measurementId: "G-V95B4DQFNJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app);

export {auth, database};
