import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAAAferugrYAbHqY0d96ondBPmqdPdaN_w",
    authDomain: "famous-person-guessing-game.firebaseapp.com",
    databaseURL: "https://famous-person-guessing-game.firebaseio.com",
    projectId: "famous-person-guessing-game",
    storageBucket: "famous-person-guessing-game.appspot.com",
    messagingSenderId: "275457808030",
    appId: "1:275457808030:web:40675b36590f243c6c4d8f",
    measurementId: "G-1TFM95J5GM"
};
  
firebase.initializeApp(firebaseConfig);

export const dbRefobject = firebase.database();