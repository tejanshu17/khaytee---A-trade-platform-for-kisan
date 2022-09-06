import React,{useState, useEffect} from 'react';
import { Text, View , Button, Dimensions, Platform, StyleSheet, Image, TextInput, SafeAreaView, ScrollView, Alert, Linking} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import auth, { firebase } from'@react-native-firebase/auth';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import {Loginfinal} from '../screens/apiService';
import Forgotpass from '../screens/forgot';
import firestore from '@react-native-firebase/firestore';
import {useNavigation, useRoute} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';



export default function profileFarmer()
{   
    var temp_name;
    var temp_email;
    var temp_aadhar;
    var temp_phone;
    var temp_mandi;
    const route=useRoute();
    const navigation=useNavigation();
    const userID=route.params.Id;
    const [user, setUser]=React.useState();
    const[fullname,setFullname]=useState();
    const[fullemail,setFullemail]=useState();
    const[fullphone,setFullphone]=useState();
    const[fullaadhar,setFullaadhar]=useState();
    const[fullmandi, setFullmandi]=useState();
    const onAuthStateChanged = user =>{
        setUser(user);
    }
        useEffect(() => {
        const abortController = new AbortController();
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        getData();

        return()=>{
            subscriber;
            abortController.abort();
          };
        }
    )
    const getData = async () =>
    {
        firestore()
        .collection('FarmerDB')
        .doc(userID)
        .get()
        .then(documentSnapshot => {
            if(documentSnapshot.exists)
            {
                temp_name=documentSnapshot.data().Name
                setFullname(temp_name)
                temp_email=documentSnapshot.data().Email
                setFullemail(temp_email)
                temp_phone=documentSnapshot.data().PhoneNo
                setFullphone(temp_phone)
                temp_aadhar=documentSnapshot.data().Aadhar
                setFullaadhar(temp_aadhar)
                temp_mandi=documentSnapshot.data().Mandi
                setFullmandi(temp_mandi)
            }
        }).then(() =>
        console.log(temp_name,temp_aadhar,temp_email,temp_phone)).catch(error => console.log(error));
    }


    return (

        <View style = {styles.container}>
            <View style = {styles.header}>
            <Image style = {styles.images} source = {require('../assets/Human.png')}
            />
       </View>
         <Text style = {styles.title}> 
            Profile 
         </Text>
        <View style = {styles.whiteFooter}>
            <ScrollView>
                <Text></Text>
            <Text style = {styles.fieldTitle}>
              Name
                </Text>
                <TextInput style = {styles.inputField}>{fullname}</TextInput>

            <Text style = {styles.fieldTitle}>
              Phone Number
                </Text>
                <TextInput style = {styles.inputField}>{fullphone}</TextInput>

            <Text style = {styles.fieldTitle}>
              Email
                </Text>
                <TextInput style = {styles.inputField}>{fullemail}</TextInput>

            <Text style = {styles.fieldTitle}>
              Aadhar
                </Text>
                <TextInput style = {styles.inputField}>{fullaadhar}</TextInput>

            
            <Text style = {styles.fieldTitle}>
              Mandi
                </Text>
                <TextInput style = {styles.inputField}>{fullmandi}</TextInput>

            </ScrollView>

        </View>
        </View>
    )


}

const styles=StyleSheet.create({

    container:{
       flex:1,
       flexDirection:'column',
       backgroundColor:'#8FEBB4',
    },

    greyFooter:{
        flex:2,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingTop: '10%',
        backgroundColor:'#E5E5E5'
    },

    homeIcon:{
        paddingLeft: '28%',
        top: '2%',
        bottom:'5%'

      },

    title:{
        fontSize: 25, 
        fontWeight: '400',
        textAlign:'center',
        paddingBottom: '3%',
    },
    header:{
        flex:0,
        justifyContent: 'flex-end',
        paddingHorizontal: '5%',
        paddingBottom: '1%',
     },

     inputField:{
        alignContent:"space-around",
        left:'18%',
        width: '65%',
        height: 40,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: "#8FEBB4",
        fontSize: 15,
        color:'black',
        marginVertical: '2%'
    },

    fieldTitle:{
        fontSize:20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: '20%',
    }, 

    whiteFooter:{
        flex:1,
        justifyContent: 'flex-end',
        width: '100%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor:'white'
    },



});