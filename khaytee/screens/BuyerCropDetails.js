import React,{ useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    Image,
    View,
    TextInput,
  } from 'react-native';
  import FontAwesome from 'react-native-vector-icons/FontAwesome5';
  import auth, { firebase } from'@react-native-firebase/auth';
  import firestore from '@react-native-firebase/firestore';
  import { Button } from 'react-native-paper';
  import { TouchableOpacity } from 'react-native-gesture-handler';
  import {useNavigation, useRoute} from '@react-navigation/native';

  const BuyerCropDetails=()=>{
    const route=useRoute();
    const navigation=useNavigation();
    const userID=route.params.Id;
    const cropID=route.params.cropID;
    const farmerID=route.params.farmerID;
    const [CropName,setCropName]=useState();
    const [availableQty,setAvailableQty]=useState();
    const [farmerName,setFarmerName]=useState();
    const [price,setPrice]=useState();
    const [mandi,setMandi]=useState();
    const [photo,setPhoto]=useState();
    const [user, setUser]=React.useState();

    var temp_cropname;
    var temp_availableQty;
    var temp_farmerName;
    var temp_price;
    var temp_mandi;
    var temp_photo;

    const onAuthStateChanged = user =>{
      setUser(user);
     }
    useEffect(() => {
   
        const abortController = new AbortController();
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        displayData();
        return()=>{
          subscriber;
          abortController.abort();
   };
       
   },[])

   

   const displayData = async ()=>{
    
    firestore().collection('CropDB').doc(cropID).get().
      then(documentSnapshot => {
      
        if (documentSnapshot.exists) {
        console.log('User data: ', documentSnapshot.data());
        temp_cropname=documentSnapshot.data().CropName
        setCropName(temp_cropname)
        temp_availableQty=(documentSnapshot.data().Qty).toString();
        setAvailableQty(temp_availableQty)
        temp_price=documentSnapshot.data().Price
        setPrice(temp_price)
        temp_mandi=documentSnapshot.data().Mandi
        setMandi(temp_mandi)
        temp_photo=documentSnapshot.data().Photo 
        setPhoto(temp_photo)
      }
   }).then(console.log(CropName,availableQty,price,mandi));

   firestore().collection('FarmerDB').doc(farmerID).get().then(
    documentSnapshot => {
      
      if (documentSnapshot.exists) {
      console.log('User data: ', documentSnapshot.data());
      temp_farmerName=documentSnapshot.data().Name
      setFarmerName(temp_farmerName)
    }
  }
    
   );

   }

    return(

        <SafeAreaView style={styles.container}>
            <View style={styles.locationbar}>    
            <Text style={styles.location}>Maharashtra</Text>         
            </View>

            <Image  
                style={styles.male_avatar}
                source={require("../assets/male_avatar.png")}> 
            </Image> 

            <View style={styles.WhiteFooter}>
                <Text style={styles.title}>Crop Details</Text>
              <View style={styles.GreenFooter}>

                <View style={styles.image}> 
                <Image source={{uri:photo}} style={styles.imageView}></Image>
                </View>

                <View style={styles.GreenFooter1}>

                <Text style = {styles.fieldTitle} >Crop Name: </Text>
                <TextInput style={styles.inputField}
                  value={CropName}
                  editable={false}
                ></TextInput>
                <Text style = {styles.fieldTitle}>Available Qty: </Text>
                <TextInput style={styles.inputFieldAvailableQty}
                  value={availableQty}
                  editable={false}
                ></TextInput>
                <TextInput style={styles.inputFieldQty}
                  value="Quintal"
                  editable={false}
                ></TextInput>
                <Text style = {styles.fieldTitle}>Sold By:    </Text>
                <TextInput style={styles.inputField}
                  value={farmerName}
                  editable={false}
                ></TextInput>
                <Text style = {styles.fieldTitle}>Price:     </Text>
                <TextInput style={styles.inputFieldAvailableQty}
                  value={price}
                  editable={false}
                ></TextInput>
                <TextInput style={styles.inputFieldQty}
                  value="Quintal"
                  editable={false}
                ></TextInput>

                <Text style = {styles.fieldTitle}>Mandi:    </Text>
                <TextInput style={styles.inputField} value={mandi} editable={false}></TextInput>
                </View>
                <Button style={styles.buyNow} color="white" onPress={()=>navigation.navigate('Buyer_Add_Order',{Id:userID,cropID:cropID,farmerID:farmerID})}>Buy Now</Button>
                <View style={styles.navigationMenu}>
                <FontAwesome name={'home'} size={36} style={styles.homeIcon} onPress={()=> navigation.navigate('BuyerHome',{Id:userID})}></FontAwesome> 
            <FontAwesome name={'search'} size={34} style={styles.NavigationIcon} onPress={()=> navigation.navigate('FindCrop',{Id:userID})}></FontAwesome>
            <FontAwesome name={'clipboard'} size={34} style={styles.NavigationIcon} onPress={()=> navigation.navigate('initTrans',{Id:userID})}></FontAwesome>
            <FontAwesome name={'user'} size={34} style={styles.NavigationIcon} onPress={()=> navigation.navigate('profileBuyer',{Id:userID})}></FontAwesome>
            </View>

            
            </View>

            </View>
        </SafeAreaView>
    );
  }
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#8febb4",
      flex:1,
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
     WhiteFooter: {
        flex:1,
        borderTopLeftRadius: 70,
        borderTopRightRadius: 70,
        paddingTop: '6%',
        backgroundColor:'#FFFFFF'
     },
     title:{
        fontSize: 25, 
        fontWeight: '400',
        textAlign:'center',
        paddingBottom: '3%',
    },
    GreenFooter:{
          flex:2,
          flexDirection: "column",
          flexWrap:"wrap",
          borderTopLeftRadius: 70,
          borderTopRightRadius: 70,
          backgroundColor:'#8febb4',
          paddingTop:'4%'
    },  
    GreenFooter1:{
      flex:2,
      flexDirection: "row",
      flexWrap:"wrap",
    },
    titleColumn:{
        flex:1,
        flexDirection:"column",
        borderWidth:1,
        borderColor: 'white',     
    },
    inputColumns:{
      flex:1,
      flexDirection:"column",
      borderWidth:1,
      borderColor: 'white',
      
    },
    imageView:{
      bottom: '-5%',
      left:'19%',
      width:'70%',
      height: '90%',  
    },
    image:{
      height:'25%',
      width: '90%',
      margin: '2%',
    },
    fieldTitle:{
      fontSize:20,
      paddingTop:19,
      paddingBottom:12,
      paddingLeft: '7%',
  }, 
    inputField:{
        width: '62%',
        height: 40,
        paddingLeft:'3%',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "black",
        fontSize: 15,
        color:'black',
        marginVertical:'3%',
        backgroundColor: 'white'
    },
    inputFieldAvailableQty:{
        width: '30%',
        height: 40,
        paddingLeft:'3%',
        marginRight:'2%',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "black",
        fontSize: 15,
        color:'black',
        marginVertical: '3%',
        backgroundColor: 'white'
    },
    inputFieldQty:{
      width: '24%',
      height: 40,
      paddingLeft:'2%',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: "black",
      fontSize: 15,
      color:'black',
      marginVertical:'3%',
      backgroundColor: 'white'
  },
  navigationMenu: {
   
    width:370,
    height:50,
    bottom:'4%',
    marginLeft:'5%',
    borderRadius:40,
    backgroundColor:"#ffffff",
    flexDirection: 'row',
  },

  homeIcon:{
    paddingLeft: '8%',
    top: '2%',
  },

  NavigationIcon:{
    paddingLeft: '15%',
    top: '2%',
  },

  buyNow:{
    alignSelf:'center',
    borderRadius: 90, 
    borderWidth:1,
    borderColor: 'black',
    width: 160,
    bottom:'6%',
    backgroundColor:'black',
    color: 'white',
  },

  location: {
    fontSize:18,
    fontWeight:'bold',
    left:'5%',
    top:'14%',
  },
  
})

  export default BuyerCropDetails;