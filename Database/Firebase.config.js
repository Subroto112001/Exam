// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhoPbuZlCmoGgr4mkBkSNJOIv7FhUItFE",
  authDomain: "datashowapp-40904.firebaseapp.com",
  databaseURL: "https://datashowapp-40904-default-rtdb.firebaseio.com",
  projectId: "datashowapp-40904",
  storageBucket: "datashowapp-40904.firebasestorage.app",
  messagingSenderId: "608825057594",
  appId: "1:608825057594:web:acb45af2f329f4f04ab003",
  measurementId: "G-8RQ6M41SFW",
};


const app = initializeApp(firebaseConfig);
export default app
console.log("Databse conected");

