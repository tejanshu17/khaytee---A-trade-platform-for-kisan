import React, { useEffect } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import auth, { firebase } from'@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import RazorpayCheckout from 'react-native-razorpay';

export default function razor(){

    useEffect(() => {
       
    makePayment();    
    
    }
    )
    const route=useRoute();
    const navigation=useNavigation();
    const userID=route.params.Id;
    const orderid=route.params.ordernumber;
    const orderamount=route.params.orderamount;
    const makePayment = () =>{
        console.log("YE MERA AMOUNT");
        console.log(orderamount);
        var options = {
            description: orderid,
            image: 'khaytee\assets\splash2.png',
            currency: 'INR',
            key: 'rzp_test_74w2CSFOrgiZip',
            amount: orderamount*100,
            name: 'Khaytee',
            // order_id: orderid,//Replace this with an order_id created using Orders API.
            prefill: {
              email: 'khayteeportal@gmail.com',
              contact: '9821047718',
              name: 'Khaytee'
            },
            theme: {color: '#53a20e'}
          }

          RazorpayCheckout.open(options).then((data) => {
            // handle success
            alert(`Success: ${data.razorpay_payment_id}`);
            firestore().collection('OrderDB').doc(orderid).update({
                PaymentStatus:"Paid"
                
              }).then(()=>{console.log('order payment updated')
              navigation.navigate('BuyerHome',{Id:userID});
            
            });
            




          }).catch((error) => {
            // handle failure
            alert(`Error: ${error.code} | ${error.description}`);
            navigation.navigate('BuyerHome');

          });
    }

    return(
        <View></View>
    )
}
