import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAYcRqm7QzRWhjdCqmbWkeJ14OIWK-rvWw",
  authDomain: "santeria-paraiso.firebaseapp.com",
  databaseURL: "https://santeria-paraiso-default-rtdb.firebaseio.com",
  projectId: "santeria-paraiso",
  storageBucket: "santeria-paraiso.firebasestorage.app",
  messagingSenderId: "565464658079",
  appId: "1:565464658079:web:11c8a57d2d2e29896372aa"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);