
// src/main.js
import './style.css';

// Importeer Firebase en PubNub
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getFirestore, collection, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";
 
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
const db = getFirestore(app);
 
console.log(db)
var startTimes, durations;
// Eventlistener voor de registratieknop
document.getElementById("submitButton").addEventListener("click", async function () {

});
window.onbeforeunload = async function() {
  try {
    // Voeg gegevens toe aan Firestore
    await setDoc(doc(db, "printer", "printer1"), {
      start: startTimes,
      duration: durations,
    });
    alert("Gegevens succesvol verzonden!");
  }
  catch (error){
    console.error("fout, niet verzonden", error)
  }
}
window.onload = async function() {
  try {
    // Haal het document op uit de "printer" collectie, specifiek "printer1"
    const docRef = doc(db, "printer", "printer1");
    const docSnap = await getDoc(docRef);

    // Check of het document bestaat
    if (docSnap.exists()) {
      // Haal de gegevens op en wijs ze toe aan de variabelen
      startTimes = docSnap.data().start;
      durations = docSnap.data().duration;

      console.log("Gegevens opgehaald:", {startTimes, durations});
    } else {
      console.log("Geen document gevonden!");
    }
  } catch (error) {
    console.error("Fout bij het ophalen van gegevens:", error);
  }
}
 // Replace 'ESP32_IP' with the actual IP address of your ESP32
 const ws = new WebSocket('ws://10.16.1.49:81');

let lastTimestamp = Date.now();
let lastState = null;

ws.onopen = function() {
     console.log('Connected to WebSocket server');
 };

 ws.onmessage = function(event) {
     const currentState = parseInt(event.data); // Convert to integer
     const currentTimestamp = Date.now();
     const currentStartDate = new Date(currentTimestamp);
     const startformattedDate = currentStartDate.toLocaleString();
     const currentEndDate = new Date(lastTimestamp)
     const endformattedDate = (currentEndDate).toLocaleString();
     // Display the current sensor state
     document.getElementById('sensorValue').innerText = `Sensor Value: ${currentState}`;

     // Only calculate time if the state changed from 1 to 0
     if (lastState === 1 && currentState === 0) {
         const timeElapsed = Math.floor((currentTimestamp - lastTimestamp)); // Time in seconds
            tableAdd (startformattedDate,timeElapsed,endformattedDate)
     }

     // Update the last state and timestamp
     lastState = currentState;
     lastTimestamp = currentTimestamp;
 };

 ws.onclose = function() {
     console.log('Disconnected from WebSocket server');
     document.getElementById('sensorValue').innerText = 'Disconnected';
     document.getElementById('timeElapsed').innerText = '';
 };

 ws.onerror = function(error) {
     console.error('WebSocket error:', error);
 };

 function msToTime(duration) {
    let milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        let result = [];

        if (hours > 0) {
          result.push(`${hours} hours`);
        }
        if (minutes > 0) {
          result.push(`${minutes} minutes`);
        }
        if (seconds > 0) {
          result.push(`${seconds} seconds`);
        }
      
        return result.join(', ');
 }
 function tableAdd (start,info,end) {
    const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    cell1.textContent = start;
    cell2.textContent = msToTime(info);
    cell3.textContent = end;
 }
 function updateArray (array, newData) {
    array.splice(0, 1); // Removes the first element
    array.push(newData); // Adds a new element at the end
 }