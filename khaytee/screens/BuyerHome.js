import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  ImageBackground,
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Geolocation from '@react-native-community/geolocation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {useNavigation, useRoute} from '@react-navigation/native';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


export default function BuyerHome() {

  const route=useRoute();
  const navigation=useNavigation();
  const [latitude,setLatitude]=React.useState(0)
  const [longitude,setLongitude]=React.useState(0)
  const [address,setAddress]=React.useState()
  const userID=route.params.Id;
  const [name,setName]=React.useState();
  
  firestore().collection('BuyerDB').doc(userID).get().then(documentSnapshot => {
    if (documentSnapshot.exists) {
      setName(documentSnapshot.data().Name);
    }
 });

  return (
  <SafeAreaView style={styles.container}>

      <View style={styles.locationbar}>
        <Text style={styles.location}>Maharashtra</Text>
      </View>

      <Image  
        style={styles.male_avatar}
        source={require("../assets/male_avatar.png")}> 
      </Image> 

      <Text 
          style={styles.hello}>
          Hello {name}, {"\n"}
          Let's Go Cropping...
      </Text>

    <View style={styles.imageView}>

    <View style={styles.imageCol}>
        <View style={styles.circle}>
        <TouchableOpacity
        onPress={() => navigation.navigate('FindCrop',{Id:userID})}
        >
          <Image  
            style={styles.wheat}
            source={require("../assets/wheat.png")}> 
          </Image> 
          </TouchableOpacity>
        </View>
    
        <View style={styles.circle}>
        <TouchableOpacity
        onPress={() => navigation.navigate('FindCrop',{Id:userID})}
      >
          <Image  
            style={styles.tomato}
            source={require("../assets/Tomato.png")}> 
          </Image>
          </TouchableOpacity>
        </View>
   </View>

    <View style={styles.imageCol}>

      <View style={styles.circle}>
      <TouchableOpacity
        onPress={() => navigation.navigate('FindCrop',{Id:userID})}
      >
      <Image  
        style={styles.crop_image}
        source={require("../assets/potato.jpg")}> 
      </Image> 
      </TouchableOpacity>
      </View>

      <View style={styles.circle}>
        <TouchableOpacity
        onPress={() => navigation.navigate('FindCrop',{Id:userID})}
      >
      <Image  
        style={styles.corn}
        source={require("../assets/corn.png")}> 
        </Image>
        </TouchableOpacity>
      </View>
    </View>

      
    <View style={styles.imageCol}>

          <View style={styles.circle}>
          <TouchableOpacity
        onPress={() => navigation.navigate('FindCrop',{Id:userID})}
      >
              <Image  
            style={styles.sugarcane}
            source={require("../assets/carrot.jpg")}> 
        </Image>
           </TouchableOpacity>
    
          </View>

          <View style={styles.circle}>
          <TouchableOpacity
        onPress={() => navigation.navigate('FindCrop',{Id:userID})}
      >
            <Image  
        style={styles.cotton}
        source={require("../assets/greenchilli.jpg")}> 
    </Image> 
         </TouchableOpacity>
          </View>
      </View>

    </View>
    
    <View style={styles.bottomView}>

    
      <View style={styles.findcropView}>

      <TouchableOpacity
        onPress={() => navigation.navigate('FindCrop',{Id:userID})}
      >
      <ImageBackground 
        style={styles.find_crop}
        imageStyle={{ borderRadius: 10}}
        source={require("../assets/find_crop.jpg")}>  
        <Text style={{fontSize:20 ,left: 37, bottom: 0, fontWeight: "bold"}}>Find Crop
        </Text>  
     </ImageBackground>  
     </TouchableOpacity>
      </View>
    
      
    <View style={styles.transferView}>
      <TouchableOpacity onPress={()=>navigation.navigate('initTrans',{Id:userID})}>
     <ImageBackground  
        style={styles.transfer}
        imageStyle={{ borderRadius: 10}}
        source={require("../assets/transfer.jpg")}>
        <Text style={{fontSize:20 ,left: 30, bottom: 70, fontWeight: "bold"}}>Transaction
        </Text>  
    </ImageBackground> 
    </TouchableOpacity>
    </View>
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
    flexDirection: 'row',
    top:'10%',
    width:500,
    left:'3.5%',
    height: 250,
  },

  bottomView:{
    width:500,
    left:'0.5%',
    top:'10%',
    height: 250,
  },

  imageCol:{
      flexDirection: 'column',
      paddingLeft: '2%',
      paddingRight: '3%',
      paddingBottom: '2%',
  },

  circle: {
    width: 100,
    height: 100, 
    borderRadius:70,
    top: '4%',
    marginBottom: '15%',
  },

  wheat:{
    width: 100,
    height: 100,
    top: '0.1%',
    borderRadius: 75
   },

   crop_image:{
    width: 100,
    height: 100,
    top: '0.1%',
    left: '0.1%',
    borderRadius: 70,
   },

   sugarcane:{
    width: 100,
    height: 100,
    top: '0.1%',
    left: '0.1%',
    borderRadius: 75,
   },

   
   tomato:{
    width: 100,
    height: 100,
    top: '0.1%',
    left: '0.1%',
    right: 0,
    borderRadius: 70,
   },

   corn:{
    width: 100,
    height: 100,
    top: '0.1%',
    left: '0.1%',
    borderRadius: 70,
   },

   cotton:{
    width: 100,
    height: 100,
    top: '0.1%',
    left: '0.1%',
    right: 0,
    borderRadius: 100,
   },

  find_crop:{
    width: 165,
    height: 170,
    top: '0.1%',
    left: '0.1%',
    borderRadius: 10,
   },

    findcropView:{
      width: 180,
      height: 190,
      top: '10%',
      bottom: '30%',
      left: '3%',
      borderWidth:1,
      borderRadius: 20,
      borderColor: '#ffffff',
      backgroundColor:'#ffffff',
   },

   transferView:{
    width: 180,
    height: 190,
    bottom:'66%',
    left: '43.5%',
    borderWidth:1,
    borderRadius: 20,
    borderColor: '#ffffff',
    backgroundColor:'#ffffff'
   },

  male_avatar: { 
    width: 55,
    height: 55, 
    left: '85%',
    top: '-4%',
    borderRadius: 1000,
  },

  transfer: {
    width: 165,
    height: 170,
    top: '0.1%',
    left: '0.1%',
    borderRadius: 10,
    bottom:'3%',
    justifyContent: 'center',
  },

  hello: {
    fontSize: 35,
    top: '2%',
    left: '7%',
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
 },

 location: {
   fontSize:18,
   fontWeight:'bold',
   left:'5%',
   top:'14%',
 }
 
});