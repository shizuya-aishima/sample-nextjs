// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDrO_IvtzGuz3hQ1sJEELkaz6K2clhAQVg',
  authDomain: 'care-food-planner.firebaseapp.com',
  projectId: 'care-food-planner',
  storageBucket: 'care-food-planner.appspot.com',
  messagingSenderId: '876404620204',
  appId: '1:876404620204:web:4d3139269a18954e19d809',
  measurementId: 'G-WXJNYV3K3V',
};

console.log(firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
