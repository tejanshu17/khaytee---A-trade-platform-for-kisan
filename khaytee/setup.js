import React from 'react'; 
import firebase from "@react-native-firebase/app";
import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';

const firebaseConfig={
    apiKey: "AIzaSyBmTkeDLeTtBQ58s2FbDWishT-b-bmk-oc",
    authDomain: "khaytee-262e2.firebaseapp.com",
    projectId: "khaytee-262e2",
    storageBucket: "khaytee-262e2.appspot.com",
    messagingSenderId: "288090632926",
    appId: "1:288090632926:web:f5a074e48e64d504ad884f",
    measurementId: "G-40YN3LHKLZ"
  
}
if(!firebase.app.length)
{
    firebase.initializeApp(firebaseConfig);
}
export default() =>{
    return(firebase,auth,firestore);
};