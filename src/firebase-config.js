// Importeer Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";

// Firebase Configuratie
const firebaseConfig = {
    apiKey: "AIzaSyDq1MeOTqw83EhUlywQaG1zxQxDtu3E9Ss",
    authDomain: "printeraid-f8d6f.firebaseapp.com",
    databaseURL: "https://printeraid-f8d6f-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "printeraid-f8d6f",
    storageBucket: "printeraid-f8d6f.firebasestorage.app",
    messagingSenderId: "283710313186",
    appId: "1:283710313186:web:34afec79e1c67eb8a404bb",
    measurementId: "G-EDFM0BJC3W"
  };
 
// Initialiseer Firebase
const app = initializeApp(firebaseConfig);

export default app;