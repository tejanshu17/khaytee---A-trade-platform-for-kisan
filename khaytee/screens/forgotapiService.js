import React from 'react';
import { resolvePath } from 'react-router';
import auth from'@react-native-firebase/auth';

export const Forgotfinal = (email) =>{
    return new Promise(function(resolve, reject){
        auth()
            .sendPasswordResetEmail(email)
            .then(() =>{
                resolve('Please Check Your Email');
            })
            .catch(error => {
                reject(error);
            });
});
};
