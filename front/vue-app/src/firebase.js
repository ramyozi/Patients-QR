import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDA43rZ1iAzVRsLpLocGkOWMQaVH4EK9qQ",
    authDomain: "patients-qr.firebaseapp.com",
    projectId: "patients-qr",
    storageBucket: "patients-qr.appspot.com",
    messagingSenderId: "223754090823",
    appId: "1:223754090823:web:c081932097e127dfe97462",
    measurementId: "G-36DVVJYNWF"
  };

  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);
  const auth = getAuth(app);
  
  export { app, firestore, auth };