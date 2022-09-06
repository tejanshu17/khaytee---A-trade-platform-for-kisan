// import React,{ useState } from 'react';
// import { Text, View, Dimensions, Picker, StyleSheet, Image, TextInput, SafeAreaView, ScrollView, Alert, Linking} from 'react-native';
// import DropdownMenu from 'react-native-dropdown-menu';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import Feather from 'react-native-vector-icons/Feather';
// import auth, { firebase } from'@react-native-firebase/auth';
// import { Button } from 'react-native-paper';
// import { createStackNavigator } from "@react-navigation/stack";
// import { NavigationContainer } from "@react-navigation/native";
// import firestore from '@react-native-firebase/firestore';
// import {useNavigation, useRoute} from '@react-navigation/native';


// export default function UploadCrop() {  

//   const route=useRoute();
//   const navigation=useNavigation();
//   const [latitude,setLatitude]=React.useState(0)
//   const [longitude,setLongitude]=React.useState(0)
//   const [address,setAddress]=React.useState()
//   const [cropname,setCropName]=useState('cropname')  
//   const [unit,setUnit]=useState('unit')  
  
//   var cropdata = [["Tomato", "Masoor", "Potato", "Bajra", "Wheat", "Maize", "Barley"]];
//   var croptype = [["Cash", "Food", "Kharif", "Rabi"]];


// const [user, setUser] = React.useState();

// const onAuthStateChanged = user =>{
//   setUser(user);
// }
// React.useEffect(() => {
// const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
// return subscriber;
// },[])

// return(

 
//   <SafeAreaView 
//     style={styles.container}>
      
//       <View style={styles.locationbar}>
//       </View>
       
//   <Image  
//   style={styles.male_avatar}
//   source={require("../assets/male_avatar.png")}> 
//   </Image> 
//   <ScrollView>
//   <Text style={{fontSize:25, fontWeight: "bold" ,left: 80, top: 0}}>Upload Crop Details
//   </Text> 
//   <Image  
//   style={styles.upload}
//   source={require("../assets/upload.jpg")}> 
// </Image> 

// <Text style={{fontSize:25, fontWeight: "bold" ,left: 50, top: 40}}>Crop Name
// </Text>

// <TextInput style={styles.pickerstyle1}>
// </TextInput>
// <Picker
//     cropname = {cropname}
//     style = {styles.quantity}
//     onValueChange = {(itemValue, itemIndex) => setCropName(itemValue)} 
// >
//   <Picker.Item label="Tomato" value="Tomato"/>
//   <Picker.Item label="Maize" value="Maize"/>
//   <Picker.Item label="Potato" value="Potato"/>
//   <Picker.Item label="Carrot" value="Carrot"/>
//   <Picker.Item label="Wheat" value="Wheat"/>
//   <Picker.Item label="Green chillies" value="Green chillies"/>

// </Picker>
// <Text style={{fontSize:25, fontWeight: "bold" ,left: 50, top: 17}}>Quantity
// </Text>
// <TextInput style={styles.pickerstyle}
//   placeholder="Enter Quantity"  
// >
// </TextInput>
// <Picker
//     unit = {unit}
//     style = {styles.quantityUnit}
//     onValueChange = {(itemValue, itemIndex) => setUnit(itemValue)} 
// >
// <Picker.Item label="Quintal" value="Quintal"/>
// </Picker>
// <Button style={styles.button} color="white">Next</Button>

// </ScrollView>

// </SafeAreaView> 

// )
// }

// const styles = StyleSheet.create({
// container: {
//     backgroundColor: "#8febb4",
//     flex:1,
//   },

// male_avatar: { 
//   width: 50,
//   height: 50, 
//   left: 346,
//   bottom: 110,
//   right: -5,
//   top: -25,
//   borderRadius: 1000,
// },

// locationbar: {
//   left: '2%',
//   top: '2%',
//   width:'80%',
//   height: '5%',
//   borderRadius:40,
//   backgroundColor:"#ffffff",
// },

// upload: {
//   width: 300,
//   height: 190, 
//   left: 57,
//   bottom: 60,
//   right: 20,
//   top: 18,
//   borderRadius: 10
// },
// input: {
//   flex: 1,
//   // width: "5%",
//   height: "3%",
//   // backgroundColor: "white",
//   // padding: 10,
//   left: "27%",
//   top: "2%",
//   bottom: "10%",
//   borderRadius: 10,
//   color: "black"
// },
// viewinput: {
//   flex: 0.19,
//   width: "15%",
//   // height: "1000%",
//   backgroundColor: "white",
//   // padding: 10,
//   left: "15%",
//   top: "-7.2%",
//   bottom: "10%",
//   // borderRadius: 10,
// },

// next:{
//   width: 50,
//   height: 50, 
//   left: "80%",
//   bottom: "7%",
//   right: "10%",
//   // top: "-60%",
//   borderRadius: 10
// },
// quantity:{
//   color:'black',
//   borderColor: "#8FEBB4",
//   alignContent:"space-around",
//   left:'15%',
//   width: '30%',
//   marginVertical: '2%',
//   borderRadius: 15,
//   borderWidth: 2,
//   backgroundColor: 'white',
//   top: '0.5%',
// },
// quantityUnit:{
//   color:'black',
//   borderColor: "#8FEBB4",
//   alignContent:"space-around",
//   left:'42%',
//   width: '30%',
//   marginVertical: '2%',
//   borderRadius: 15,
//   borderWidth: 2,
//   backgroundColor: 'white',
//   top: '-4.5%',
// },

// pickerstyle:{
//   backgroundColor:'white',
//   height:40,
//   width: 120,
//   left: '12%',
//   top: '5%',
//   borderRadius: 40
// },
// pickerstyle1:{
//   backgroundColor:'white',
//   height:40,
//   width: 200,
//   left: '12%',
//   top: '10%',
//   borderRadius: 40
// },
// button:{
//   backgroundColor: 'black',
//   height:40,
//   width: 130,
//   left: '30%',
//   top: '0.5%',
// }

// });

import React,{ useState } from 'react';
import { Text, View, Dimensions, Picker, StyleSheet, Image, TextInput, SafeAreaView, ScrollView, Alert, Linking} from 'react-native';
import DropdownMenu from 'react-native-dropdown-menu';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import auth, { firebase } from'@react-native-firebase/auth';
import { Button } from 'react-native-paper';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';
import {useNavigation, useRoute} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';



export default function UploadCrop() {  

  const route=useRoute();
  const navigation=useNavigation();
  const [address,setAddress]=React.useState()
  const [cropname,setCropName]=useState('cropname')  
  const [Qty,setQty]=useState(0)  
  const [Unit,setUnit]=useState()
  const userID=route.params.Id
 
  

  const nextUpload = () =>
  {
    console.log(cropname, Qty, Unit,userID)
    navigation.navigate('uploadCrops',{cropname:cropname,qty:Qty,unit:Unit,Id:userID});
  }


const [user, setUser] = React.useState();

const onAuthStateChanged = user =>{
  setUser(user);
}
React.useEffect(() => {
const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
return subscriber;
},[])

return(

 
  <SafeAreaView 
    style={styles.container}>
      
      <View style={styles.locationbar}>
        <Text style={styles.location}>Maharashtra</Text>
      </View>
       
  <Image  
  style={styles.male_avatar}
  source={require("../assets/male_avatar.png")}> 
  </Image> 
  <ScrollView>
  <Text style={{fontSize:25, fontWeight: "bold" ,left: 80, top: 0}}>Upload Crop Details
  </Text> 
  <Image  
  style={styles.upload}
  source={require("../assets/upload.jpg")}> 
</Image> 

<Text style={{fontSize:25, fontWeight: "bold" ,left: 50, top: 40}}>Crop Name
</Text>

<TextInput style={styles.pickerstyle1} editable={false}>
</TextInput>
<Picker
    cropname = {cropname}
    style = {styles.quantity}
    onValueChange = {(itemValue, itemIndex) => setCropName(itemValue)} 
>
  <Picker.Item label="Tomato" value="Tomato"/>
  <Picker.Item label="Maize" value="Maize"/>
  <Picker.Item label="Potato" value="Potato"/>
  <Picker.Item label="Carrot" value="Carrot"/>
  <Picker.Item label="Wheat" value="Wheat"/>
  <Picker.Item label="Green chillies" value="Green chillies"/>

</Picker>

<Text  style={{fontSize:25, fontWeight: "bold" ,left: 50, top: 17}} 
>Quantity
</Text>

<TextInput style={styles.pickerstyle}
 onChangeText= {text => setQty(text)}  placeholder="Enter Quantity"  
>
</TextInput>

<Picker
    style = {styles.quantityUnit}
    onValueChange = {(itemValue, itemIndex) => setUnit(itemValue)} 
>
<Picker.Item label="Quintal" value="Quintal"/>
</Picker>
<Button style={styles.button} color="white" onPress = {nextUpload}>Next</Button>


</ScrollView>



</SafeAreaView> 

)
}

const styles = StyleSheet.create({
container: {
    backgroundColor: "#8febb4",
    flex:1,
  },

male_avatar: { 
  width: 50,
  height: 50, 
  left: 346,
  bottom: 110,
  right: -5,
  top: -25,
  borderRadius: 1000,
},

locationbar: {
  left: '2%',
  top: '2%',
  width:'80%',
  height: '5%',
  borderRadius:40,
  backgroundColor:"#ffffff",
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

location: {
  fontSize:18,
  fontWeight:'bold',
  left:'5%',
  top:'14%',
},

upload: {
  width: 300,
  height: 190, 
  left: 57,
  bottom: 60,
  right: 20,
  top: 18,
  borderRadius: 10
},
input: {
  flex: 1,
  // width: "5%",
  height: "3%",
  // backgroundColor: "white",
  // padding: 10,
  left: "27%",
  top: "2%",
  bottom: "10%",
  borderRadius: 10,
  color: "black"
},
viewinput: {
  flex: 0.19,
  width: "15%",
  // height: "1000%",
  backgroundColor: "white",
  // padding: 10,
  left: "15%",
  top: "-7.2%",
  bottom: "10%",
  // borderRadius: 10,
},

next:{
  width: 50,
  height: 50, 
  left: "80%",
  bottom: "7%",
  right: "10%",
  // top: "-60%",
  borderRadius: 10
},
quantity:{
  color:'black',
  borderColor: "#8FEBB4",
  alignContent:"space-around",
  left:'15%',
  width: '30%',
  marginVertical: '2%',
  borderRadius: 15,
  borderWidth: 2,
  backgroundColor: 'white',
  top: '0.5%',
},
quantityUnit:{
  color:'black',
  borderColor: "#8FEBB4",
  alignContent:"space-around",
  left:'42%',
  width: '30%',
  marginVertical: '2%',
  borderRadius: 15,
  borderWidth: 2,
  backgroundColor: 'white',
  top: '-4.5%',
},

pickerstyle:{
  backgroundColor:'white',
  height:40,
  width: 120,
  left: '12%',
  top: '5%',
  borderRadius: 40
},
pickerstyle1:{
  backgroundColor:'white',
  height:40,
  width: 200,
  left: '12%',
  top: '10%',
  borderRadius: 40
},
button:{
  backgroundColor: 'black',
  height:40,
  width: 130,
  left: '30%',
  top: '0.5%',
},
homeIcon:{
  paddingLeft: '8%',
  top: '2%',
},

NavigationIcon:{
  paddingLeft: '10%',
  top: '2%',
},

});



