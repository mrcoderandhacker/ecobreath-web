// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyD8fbHoCP3eAKz9G4_pndV2PXO3I5w-66I",
  authDomain: "ecobreath-ark.firebaseapp.com",
  databaseURL: "https://ecobreath-ark-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ecobreath-ark",
  storageBucket: "ecobreath-ark.firebasestorage.app",
  messagingSenderId: "721936301933",
  appId: "1:721936301933:web:cf71a684920326bc9ea464",
  measurementId: "G-917TG8Q55Z"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
