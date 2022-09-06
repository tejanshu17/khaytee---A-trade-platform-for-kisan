import React from "react";
import Auth from './setup';
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export const SignupUser=(email,password)=>{
    return new Promise(function(resolve,reject){
        auth().createUserWithEmailAndPassword(email,password).then(() => {
            resolve('Sign Up successfull');
          })
          .catch(error => {
            reject(error);
          });
      });
}

export const Loginfinal = (email,password) =>{
  return new Promise(function(resolve, reject){
  auth()
          .signInWithEmailAndPassword(email, password)
          .then(() =>{
              resolve('Sign in Successfully');
          })
          .catch(error => {
              reject(error);
          });
});
};