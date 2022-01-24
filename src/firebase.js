// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//Test
// const firebaseConfig = {
//   apiKey: "AIzaSyC-GrVq3kn4Hagh8gzVF0FaZsE7WAg7E24",
//   authDomain: "ieeetesting-f081d.firebaseapp.com",
//   projectId: "ieeetesting-f081d",
//   storageBucket: "ieeetesting-f081d.appspot.com",
//   messagingSenderId: "17189641293",
//   appId: "1:17189641293:web:6e3a0da0f3cd50fbff9004",
//   measurementId: "G-BZH5XY7K20"
// };

//Main
const firebaseConfig = {
  apiKey: "AIzaSyBUx_Z49UvmtniZgg3pnuhc7t5OrVJri0E",
  authDomain: "ieee-ciet.firebaseapp.com",
  databaseURL: "https://ieee-ciet-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ieee-ciet",
  storageBucket: "ieee-ciet.appspot.com",
  messagingSenderId: "116568579394",
  appId: "1:116568579394:web:a9d8ae2af2c911f3f83cdb",
  measurementId: "G-4WC29B7CPK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)

export const auth = getAuth(app);
