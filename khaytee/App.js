import React,{ Component, useEffect} from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import Sign from './screens/Signup.js'; 
import Signs from './screens/Signs.js'
import Forgotpass from './screens/forgot.js'; 
import FarmerHome from './screens/FarmerHome.js';
import Buyer from './screens/BuyerHome.js';
import FindCrop from './screens/FindCrop.js';
import BuyerCropDetails from './screens/BuyerCropDetails.js';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Buyer_Add_Order from './screens/Buyer_Add_Order.js';
import UploadCrop from './screens/UploadCrop.js';
import { initTransaction } from './screens/initTransaction.js';
import PendingOrderPage from './screens/PendingOrderPage.js';
import {pendingTransaction}  from './screens/PendingTransactions.js';
import {transactionHistory} from './screens/TransactionHistory.js';
import profileBuyer from './screens/buyerProfile';
import UploadCrops from './screens/UploadCrops.js';
import { initCrop } from './screens/initCrop.js';
import { myCrops } from './screens/myCrops.js';
import farmerTransaction from './screens/farmerTransaction.js';
import recievedOrder from './screens/recievedOrder.js';
import profileFarmer from './screens/farmerProfile.js';
import weatherapp from './screens/weatherapp.js';
import razor from './screens/razor.js';

const Stack = createStackNavigator();

export default function khayy() {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "homescreen" headerMode='none'>
        <Stack.Screen name="homescreen" component={home}/>
        <Stack.Screen name="Signs" component={Signs}/> 
        <Stack.Screen name="Signup" component={Sign}/> 
        <Stack.Screen name="FarmerHome" component={FarmerHome}/>
        <Stack.Screen name="Forgotp" component={Forgotpass}/> 
        <Stack.Screen name="BuyerHome" component={Buyer}/>
        <Stack.Screen name="FindCrop" component={FindCrop}/>
        <Stack.Screen name="BuyerCropDetails" component={BuyerCropDetails}/>
        <Stack.Screen name="Buyer_Add_Order" component={Buyer_Add_Order}/>
        <Stack.Screen name="UploadCrop" component={UploadCrop}/>
        <Stack.Screen name="initTrans" component={initTransaction} />
        <Stack.Screen name="PendingOrder" component={PendingOrderPage}/>
        <Stack.Screen name="PendingTrans" component={pendingTransaction}/>
        <Stack.Screen name="TransHistory" component={transactionHistory}/>
        <Stack.Screen name="profileBuyer" component={profileBuyer} />
        <Stack.Screen name="uploadCrops" component={UploadCrops} />
        <Stack.Screen name="initCrop" component={initCrop} />
        <Stack.Screen name="myCrops" component={myCrops} />
        <Stack.Screen name="farmerTransaction" component={farmerTransaction} />
        <Stack.Screen name="recievedOrder" component={recievedOrder} />
        <Stack.Screen name="profileFarmer" component={profileFarmer} />
        <Stack.Screen name="weatherapp" component={weatherapp} />
        <Stack.Screen name="razor" component={razor} />
        </Stack.Navigator>
      </NavigationContainer>
  )
}


function home({navigation})
{ 
  // const [counter, setCounter] = useState(0);
  
  useEffect(() => {
    console.log(
      "Occurs ONCE, AFTER the initial render."
    );

     setTimeout(() => {
      navigation.navigate('Signs');
    },4000)
  }, []);

    return (
        <View style={{ flex: 1,backgroundColor:"white", justifyContent: "center", alignItems: "center" }}>
   
    <Image  
        style={{width: 375, height: 375}}
        source={require('../khaytee/assets/splash2.png')}> 
    </Image> 

        
        </View>
      );
}