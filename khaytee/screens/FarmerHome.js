import React, { Component } from  "react"; 
// import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { TouchableHighlight } from "react-native-gesture-handler";


export default function FarmerHome() {  

  const route=useRoute();
  const navigation=useNavigation();
  const userID=route.params.Id;
  return (
  <SafeAreaView 
    style={styles.container}>
      <View style={styles.locationbar}>
      <Text style={styles.location}>Maharashtra</Text>
      </View>
    <Text 
    style={styles.hello}>
      Hello Kishan, {"\n"}
      what's growing around?
    </Text>

    <View  style={styles.imageView}>
      <View style={styles.environmentView}>
      <TouchableOpacity onPress={()=>navigation.navigate('UploadCrop',{Id:userID})}>
      <ImageBackground 
          style={styles.environment}
          source={require("../assets/environment.png")}
      >  
          <Text style={{fontSize:20 ,left: 37, bottom: -5}}>Upload{"\n"}Your{"\n"}Crop
          </Text>  
      </ImageBackground>  
      </TouchableOpacity>
      </View>
        <View style={styles.transferView}>
        <ImageBackground  
            style={styles.transfer}
            source={require("../assets/transfer.jpg")}>
            <Text style={{fontSize:20 ,left: '15%' , top:'-5%'}} onPress={()=>navigation.navigate('farmerTransaction',{Id:userID})}>Transaction
            </Text>  
        </ImageBackground> 
      </View> 
    </View>
    
    <Image  
        style={styles.male_avatar}
        source={require("../assets/male_avatar.png")}> 
    </Image> 
  
  
   <View style={styles.weatherView}>
     <TouchableOpacity onPress={()=>navigation.navigate('weatherapp')}>
      <ImageBackground  
            style={styles.weather}
            source={require("../assets/weather.png")}>
            <Text style={{fontSize:20 ,left: 85, bottom: -35}}>Weather
            </Text> 
        </ImageBackground>
        </TouchableOpacity>
   </View>

   <View style={styles.navigationMenu}>
            <FontAwesome name={'home'} size={36} style={styles.homeIcon} onPress={()=> navigation.navigate('FarmerHome',{Id:userID})}></FontAwesome> 
            <FontAwesome name={'seedling'} size={34} style={styles.NavigationIcon} onPress={()=> navigation.navigate('initCrop',{Id:userID})}></FontAwesome>
            <FontAwesome name={'clipboard'} size={34} style={styles.NavigationIcon} onPress={()=> navigation.navigate('farmerTransaction',{Id:userID})}></FontAwesome>
            <FontAwesome name={'box'} size={34} style={styles.NavigationIcon} onPress={()=> navigation.navigate('recievedOrder',{Id:userID})}></FontAwesome>
            <FontAwesome name={'user'} size={34} style={styles.NavigationIcon} onPress={()=> navigation.navigate('profileFarmer',{Id:userID})}></FontAwesome>
                    </View>
  </SafeAreaView>  
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#8febb4",
    flex:1,
  },

  imageView:{
    top: '2%',
    right:'2%',
  },
  environment:{ 
    width: 160,
    height: 142,
    top: '15%',
    bottom: '30%',
    left: '2%',
    right: '8%',
   },

  environmentView:{
    width: 180,
    height: 190,
    top: '37%',
    bottom: '30%',
    left: '6%',
    borderWidth:1,
    borderRadius: 20,
    borderColor: '#ffffff',
    backgroundColor:'#ffffff'
   },

   transfer: {
    width: 153,
    height: 136,
    left:'4%',
    top:'14%',
    borderRadius: 10
  },

   transferView:{
    width: 180,
    height: 190,
    bottom:'13%',
    left: '55%',
    borderWidth:1,
    borderRadius: 20,
    borderColor: '#ffffff',
    backgroundColor:'#ffffff'
   },

   homeIcon:{
    paddingLeft: '8%',
    top: '2%',
  },
  
  NavigationIcon:{
    paddingLeft: '10%',
    top: '2%',
  },

  male_avatar: { 
    width: 55,
    height: 55, 
    left: '85%',
    bottom: '57.5%',
    borderRadius: 1000,
  },
  location: {
    fontSize:18,
    fontWeight:'bold',
    left:'5%',
    top:'14%',
  },

  navigationMenu: {
    alignSelf:'center',
    width:370,
    height:50,
    borderRadius:40,
    top: '12%',
    backgroundColor:"#ffffff",
    flexDirection: 'row',
    left: '0%',
    
  },

  weather:{
    width: 350,
    height: 150,
    top: '5%',
    left: '7%',
    borderRadius: 10,
    justifyContent: 'center',
  },

  weatherView:{
    width: 387,
    height: 160,
    bottom:'5%',
    left: '3.6%',
    borderWidth:1,
    borderRadius: 20,
    borderColor: '#ffffff',
    backgroundColor:'#ffffff'
  },

  hello: {
    fontSize: 35,
    top: '10%',
    left: 15,
    fontWeight: "bold",
    justifyContent: 'center',
  },

 locationbar: {
    left: '2%',
    top: '2%',
    width:'80%',
    height: '5%',
    borderRadius:40,
    backgroundColor:"#ffffff",
 }
});

 
