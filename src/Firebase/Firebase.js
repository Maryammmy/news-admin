
    import { initializeApp } from "firebase/app";
    import { getFirestore } from "firebase/firestore";
    import { getStorage } from 'firebase/storage';

      const firebaseConfig = {
        apiKey: "AIzaSyBfl0iIvSx8FrZ1TdsjVt2d1gYXxb6moK0",
        authDomain: "bennu-7e1c2.firebaseapp.com",
        projectId: "bennu-7e1c2",
        storageBucket: "bennu-7e1c2.appspot.com",
        messagingSenderId: "412070770443",
        appId: "1:412070770443:web:2167264aeea0b537b5940e",
        measurementId: "G-00T1TQKXLV"
      };
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    const db = getFirestore(app);
    export { db, storage };




