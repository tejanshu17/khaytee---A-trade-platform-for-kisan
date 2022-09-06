
import React, { useEffect, useState } from "react";
import { Text, View , Button, Dimensions, Platform, StyleSheet, Image, TextInput, SafeAreaView, ScrollView, Alert, Linking, ImageBackground} from 'react-native';
import DateTimeComponent from "./DateTimeComponent";
import WeatherScroll from "./WeatherScroll";
import Geolocation from '@react-native-community/geolocation';
const API_KEY="78107b4cf1418bedc9c015cc87e567db";
export default function weatherapp() {

  const [data,setData]=useState({});

  useEffect(()=>{
    Geolocation.getCurrentPosition((success)=>{

      let {latitude,longitude}=success.coords;
      fetchDatafromApi(latitude,longitude);
     
  
    },(err)=>{
      if(err){
        fetchDatafromApi("19.7515","75.7139")
      }
    })

  },[])

 const fetchDatafromApi=(latitude,longitude)=>{
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => 
    
  { 
    console.log(data)
    setData(data)
    
  })
  
 }



  return (
    <View style={styles.container}>
      <View style={styles.background}>
      {/* <ImageBackground style={styles.image} source={require("../assets/weatherbackground.png")}> */}
        <DateTimeComponent current={data.current} timezone={data.timezone} lat={data.lat} lon={data.lon}/>
        <WeatherScroll weatherData={data.daily}/>
      {/* </ImageBackground> */}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex:1,
  }, 
  image:{
    flex:1,
    resizeMode: "cover",
    justifyContent: 'center',
   
  },
  background:{
    flex:1,
    flexDirection:'column',
    backgroundColor:'#8FEBB4',
  }
})