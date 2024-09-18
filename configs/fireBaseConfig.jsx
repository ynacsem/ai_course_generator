// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDE3lcbRzLcXXQ3hPDLkVrcUHOCSzi085A",
  authDomain: "course-ai-bd151.firebaseapp.com",
  projectId: "course-ai-bd151",
  storageBucket: "course-ai-bd151.appspot.com",
  messagingSenderId: "858355744337",
  appId: "1:858355744337:web:ef73b33f86f912eb9bc270",
  measurementId: "G-EH35LHK82V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)