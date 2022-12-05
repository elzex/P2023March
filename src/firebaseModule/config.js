// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDJdMTfhlEArrwDDLkX7LJmJGS0fFPkVYs",
    authDomain: "p2023march-24d3a.firebaseapp.com",
    projectId: "p2023march-24d3a",
    storageBucket: "p2023march-24d3a.appspot.com",
    messagingSenderId: "108153014804",
    appId: "1:108153014804:web:392fe43c5cb93b34cb7501",
    measurementId: "G-DKCT29NV3F"
};

export const app = initializeApp(firebaseConfig);
