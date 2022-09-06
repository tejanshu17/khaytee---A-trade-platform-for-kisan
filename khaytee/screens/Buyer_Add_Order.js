import React,{useState,useEffect} from 'react';
import {Text,View,Platform,StyleSheet,Image,TextInput,ScrollView,SafeAreaView, Button, Picker, Alert} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import auth, { firebase } from'@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation, useRoute} from '@react-navigation/native';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import DatePicker from "react-native-datepicker";
import FontAwesome from 'react-native-vector-icons/FontAwesome5';


export default Buyer_Add_Order = () =>
{
    const route=useRoute();
    const navigation=useNavigation();
    const [latitude,setLatitude]=React.useState(0)
    const [longitude,setLongitude]=React.useState(0)
    const [address,setAddress]=React.useState()
    const [date, setDate] = useState(new Date())
    const init_status="Pending";
    const [user, setUser]=React.useState();
    var variate="T";
    var dum_buyername_temp;
    var dum_cropname_temp;
    var dum_farmername_temp;
    var dum_qty_temp;
    var dum_price_temp;
    const farmer_dumid=route.params.farmerID;
    const buyer_dumid=route.params.Id;
    const crop_dumid=route.params.cropID;
    const dum_unit = "quintal";
    const [requiredqty, setRequiredQty] = useState();
    const [selectedQty, setSelectedQty] = useState("Qty");
    const [dum_cropname, setdum_cropname] = useState();
    const [dum_farmername, setdum_farmername] = useState();
    const [dum_buyername, setdum_buyername] = useState();
    const [dum_price, setdum_price] = useState();
    const [dum_qty, setdum_qty] = useState();
    const onAuthStateChanged = user =>{
      setUser(user);
  }
  useEffect(() => {
   
   const abortController = new AbortController();
   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
   findpushval(farmer_dumid,buyer_dumid,crop_dumid);
   
   return()=>{
     subscriber;
     abortController.abort();
   };
       
   },[])
  

    const findpushval = async () =>
    {
        firestore()
        .collection('FarmerDB')
        .doc(farmer_dumid)
        .get()
        .then(documentSnapshot => {
          console.log("found farmer details", documentSnapshot.exists);

          if(documentSnapshot.exists)
          {
            dum_farmername_temp = documentSnapshot.data().Name;
            setdum_farmername(dum_farmername_temp)
          }
        }).then(() =>
                console.log(dum_farmername)).catch(error => console.log(error));

        firestore()
        .collection('BuyerDB')
        .doc(buyer_dumid)
        .get()
        .then(documentSnapshot => {
                  console.log("found buyer details", documentSnapshot.exists);
        
                  if(documentSnapshot.exists)
                  {
                    dum_buyername_temp = documentSnapshot.data().Name;
                    setdum_buyername(dum_buyername_temp)
                    console.log(state.dum_buyername)
                  }
                }).then(() =>
                        console.log(dum_buyername)).catch(error => console.log(error));


        firestore()
          .collection('CropDB')
          .doc(crop_dumid)
          .get()
          .then(documentSnapshot => {
             console.log("found crop details", documentSnapshot.exists);
                
          if(documentSnapshot.exists)
          {
              dum_cropname_temp = documentSnapshot.data().CropName;
              setdum_cropname(dum_cropname_temp)
              dum_qty_temp = documentSnapshot.data().Qty;
              setdum_qty(dum_qty_temp)
              dum_price_temp = documentSnapshot.data().Price;
              setdum_price(dum_price_temp)

          }
          }).then(() =>
              console.log(dum_qty)).catch(error => console.log(error));

      
    }

    const validateQty = () =>
    {
      if(requiredqty>dum_qty)
      {
        alert("Please enter valid quantity");
      }
      else
      {
        firestore()
        .collection('userType')
        .doc('count')
        .get()
        .then(documentSnapshot => {
                        console.log('found order id', documentSnapshot.exists);

                        if (documentSnapshot.exists) {
                        console.log('Order data: ', documentSnapshot.data());
                        tempID=documentSnapshot.data().Order;
                        }
                     }).then(()=>
                            generate_ID(tempID)).catch(error => console.log(error));
      }
    }

    const generate_ID = (rec_tempID) =>
    {

        console.log(rec_tempID)    
        let char1=rec_tempID.charAt(0);
        let char2=rec_tempID.charAt(1);
        let char3=rec_tempID.charAt(2);
        let char4=rec_tempID.charAt(3);
        let char5=rec_tempID.charAt(4);

        let digit1=parseInt(char1);
        let digit2=parseInt(char2);
        let digit3=parseInt(char3);
        let digit4=parseInt(char4);
        let digit5=parseInt(char5);

        if (digit5 > 8) {
          digit5 = 0;
          if (digit4 > 8) {
              digit4 = 0;
              if (digit3 > 8) {
                  digit3 = 0;
                  if (digit2 > 8) {
                      digit2 = 0;
                      if (digit1 <= 8) {
                          digit1 = (digit1 + 1);
                      }
                  } else {
                      digit2 = (digit2 + 1);
                  }
              } else {
                  digit3 = (digit3 + 1);
              }
          } else {
              digit4 = (digit4 + 1);
          }
      } else {
          digit5 = (digit5 + 1);
      }

      char1=digit1.toString();
      char2=digit2.toString();
      char3=digit3.toString();
      char4=digit4.toString();
      char5=digit5.toString();
      upcount=char1+char2+char3+char4+char5;
      console.log(upcount);
      firestore().collection('userType').doc('count').update({
        Order: upcount,
    }).then(()=>{console.log('count updated in database')});
      new_order = variate+char1+char2+char3+char4+char5;
      console.log(new_order);
      add_entry(new_order);

    }

    const add_entry = (ordernumber) =>
    {
        var orderamount=parseInt(requiredqty)*parseInt(dum_price)
        firestore().collection('OrderDB').doc(ordernumber).set({
          BuyerId: buyer_dumid,
          BuyerName: dum_buyername,
          CropName: dum_cropname,
          Date: date,
          FarmerId: farmer_dumid,
          FarmerName:dum_farmername,
          OrderId:ordernumber,
          AvailableQty:dum_qty,
          RequiredQty:requiredqty,
          OrderStatus:init_status,
          PaymentStatus:init_status, 
          OrderAmount: orderamount,
          CropID: crop_dumid,

        }).then(()=>
        
        {
          
          console.log("order is placed");
        
        }
          ).catch(error=>console.log(error));
        alert("Order is placed!");
    }
    
    return (
      
            <SafeAreaView style = {styles.container}>
                <View style={styles.locationbar}>
                <Text style={styles.location}>Maharashtra</Text>
                </View>

                <Image  
                    style={styles.male_avatar}
                    source={require("../assets/male_avatar.png")}> 
                </Image> 

                 <View style = {styles.whiteFooter}>
                   <Text style = {styles.title}>Place Your Order</Text>
                   {/* <ScrollView> */}
                   <View style = {styles.greyFooter}>

                      <Text style = {styles.fieldTitle}>Sold By: </Text>
                      <TextInput style = {styles.inputField} editable={false}>{dum_farmername}</TextInput>


                      <Text style = {styles.fieldTitle}>     Crop: </Text>
                      <TextInput style = {styles.inputField} editable={false}>{dum_cropname}</TextInput>

                      <Text style = {styles.fieldTitle}>Available Qty: </Text>
                      <TextInput style = {styles.smallField} editable={false}>{dum_qty}</TextInput>
                      <Text>   </Text>
                      <Picker
                       selectedQty = {selectedQty}
                       style = {styles.quantity}
                       onValueChange = {(itemValue, itemIndex) => setSelectedQty(itemValue)} 
                      >
                        <Picker.Item label="Quintal" value="Quintal"/>

                      </Picker>
                      {/* <TextInput style = {styles.smallField}></TextInput> */}

                      <View style = {styles.greenFooter}>

                        {/* <Text>hello </Text> */}

                      <Text style = {styles.lastfieldTitle}>Required Qty:   </Text>
                      <TextInput style = {styles.lastsmallField} onChangeText = {(val) => setRequiredQty(val)}></TextInput>
                      <Text>   </Text>
                      <Picker
                       selectedQty = {selectedQty}
                       style = {styles.quantity}
                       onValueChange = {(itemValue, itemIndex) => setSelectedQty(itemValue)} 
                      >
                        <Picker.Item label="Quintal" value="Quintal"/>

                      </Picker>
                      <Text style = {styles.lastfieldTitle}>Pick-up Date:</Text>
                      <DatePicker style={styles.datePicker} date={date} onDateChange={setDate}/>
                  <TouchableOpacity style = {styles.placeorder} onPress={()=> validateQty()}>
                  <Text style = {styles.placebutton} onPress={()=> validateQty()}>Place Order</Text>  
                  </TouchableOpacity>
                 
                    {/* <View style={styles.navigationbar}>
                   <Text>Navigation bar</Text>
                  </View> */}

                    <View style={styles.navigationMenu}>
                    <FontAwesome name={'home'} size={36} style={styles.homeIcon} onPress={()=> navigation.navigate('BuyerHome',{Id:buyer_dumid})}></FontAwesome> 
            <FontAwesome name={'search'} size={34} style={styles.NavigationIcon} onPress={()=> navigation.navigate('FindCrop',{Id:buyer_dumid})}></FontAwesome>
            <FontAwesome name={'clipboard'} size={34} style={styles.NavigationIcon} onPress={()=> navigation.navigate('initTrans',{Id:buyer_dumid})}></FontAwesome>
            <FontAwesome name={'user'} size={34} style={styles.NavigationIcon} onPress={()=> navigation.navigate('profileBuyer',{Id:buyer_dumid})}></FontAwesome>
                    </View>

                      </View> 

                 
                    </View>
                    
                  {/* </ScrollView>  */}
                
                 </View>
                 
            </SafeAreaView>
   
    )
}

const styles=StyleSheet.create({

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
    
      male_avatar: { 
        width: 55,
        height: 55, 
        left: '85%',
        top: '-4%',
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

        whiteFooter:{
          flex:1,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          paddingTop: '6%',
          backgroundColor:'#FFFFFF'
      },
        title:{
          fontSize: 25, 
          fontWeight: '400',
          textAlign:'center',
          paddingBottom: '6%',
      },
      
        greyFooter:{
          flex:1,
          flexDirection: "row",
          flexWrap:"wrap",
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          paddingTop: '6%',
          backgroundColor:'#E5E5E5',
          paddingBottom:"15%"
      },

      fieldTitle:{
        fontSize:20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: '12%',
      }, 

      inputField:{
        alignContent:"space-around",
        left:'4%',
        width: '55%',
        height: 40,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: "#8FEBB4",
        fontSize: 15,
        color:'black',
        marginVertical: '2%',
        backgroundColor: 'white'
    },
      smallField:{
        color:'black',
        borderColor: "#8FEBB4",
        alignContent:"space-around",
        left:'5%',
        width: '20%',
        marginVertical: '2%',
        borderRadius: 15,
        borderWidth: 2,
        backgroundColor: 'white'
      },
      quantity:{
        color:'black',
        borderColor: "#8FEBB4",
        alignContent:"space-around",
        left:'5%',
        width: '30%',
        marginVertical: '2%',
        borderRadius: 15,
        borderWidth: 2,
        backgroundColor: 'white'
      },

      greenFooter:{
        // flex:1,
        flexDirection: "row",
        flexWrap:"wrap",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor:'#8FEBB4',
        paddingTop:"10%",
        paddingBottom:"110%",
        width:"100%",
        alignSelf:"stretch"
    },

    lastfieldTitle:{
      fontSize:20,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: '12%',
    }, 

    lastinputField:{
      alignContent:"space-around",
      left:'4%',
      width: '55%',
      height: 40,
      borderRadius: 15,
      borderWidth: 2,
      borderColor: "#FFFFFF",
      fontSize: 15,
      color:'black',
      marginVertical: '2%',
      backgroundColor: 'white'
  },

    lastsmallField:{
    color:'black',
    borderColor: "#FFFFFF",
    alignContent:"space-around",
    left:'5%',
    width: '20%',
    marginVertical: '2%',
    borderRadius: 15,
    borderWidth: 2,
    backgroundColor: 'white'
  },
  datePicker: {
    top:'40%',
    left:'5%',
    width: 150
},

placeorder:{
  backgroundColor:'#FFFFFF',
  alignSelf:'center',
  left:"80%",
  width:'100%',
  top:"30%",
  marginTop: 50,
  marginBottom: 115,
  borderRadius:40,
  borderWidth: 2,
 
},

placebutton:{
  fontSize:20,
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: '15%',
}, 

 
navigationbar: {
  left: '10%',
  paddingTop: 30,
  width:'90%',
  height: '80%',
  borderRadius:40,
  backgroundColor:"#FFFFFF",
},

navigationMenu: {
  alignSelf:'center',
  width:370,
  height:50,
  // bottom:'2%',
  borderRadius:40,
  backgroundColor:"#ffffff",
  flexDirection: 'row',
  left: '6%',
  
},

homeIcon:{
  paddingLeft: '8%',
  top: '2%',
},

NavigationIcon:{
  paddingLeft: '15%',
  top: '2%',
},
location: {
  fontSize:18,
  fontWeight:'bold',
  left:'5%',
  top:'14%',
}

});