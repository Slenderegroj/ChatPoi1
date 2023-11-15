import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp ({
    apiKey: "AIzaSyA0P8jZ_ZveY557aRTJgYpD3Fk3wwVZ_8Q",
    authDomain: "unichat-6e994.firebaseapp.com",
    projectId: "unichat-6e994",
    storageBucket: "unichat-6e994.appspot.com",
    messagingSenderId: "290781285432",
    appId: "1:290781285432:web:f7d345d46856f314b1eacd"
}).auth();