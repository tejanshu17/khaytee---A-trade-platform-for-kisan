import React from 'react';
import { Text, View , Button, Dimensions, Platform, StyleSheet, Image, TextInput, SafeAreaView, ScrollView, Alert, Linking} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import auth, { firebase } from'@react-native-firebase/auth';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import {Loginfinal} from '../apiService';
import Forgotpass from '../screens/forgot';
import firestore from '@react-native-firebase/firestore';

const Signs = ({navigation}) =>
{

  const [state, setState] = React.useState({
    emailAddress:'',
    password:'',

  });

const Signfinal = () =>
{
  if(state.emailAddress == "")
  {
    alert('Please enter email')
  }

  else if(state.password == "")
  {
    alert('Please enter password')
  }

  else
  {
  Loginfinal(state.emailAddress, state.password)
        .then(data =>{
          alert(data);
          const currentUserUid = firebase.auth().currentUser.uid;
          
          firestore().collection('userType').doc(currentUserUid).get().then(documentSnapshot =>{
            const typeOfUser = documentSnapshot.data().Category;
            const userID=documentSnapshot.data().ID;
            if(typeOfUser == "BuyerDB")
            {
              navigation.navigate('BuyerHome',{Id:userID});
            }
            else if(typeOfUser == "FarmerDB")
            {
              navigation.navigate('FarmerHome',{Id:userID});
            }
          })
          .catch(error =>{console.log(error)});
        })
        .catch(error => {
          alert(error);
        });

      }

};

const [user, setUser] = React.useState();

const onAuthStateChanged = user =>{
  setUser(user);
}
React.useEffect(() => {
const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
return subscriber;
},[])

  return(     
    <View style={styles.container}>
       <View style = {styles.header}>
            <Image style = {styles.images} source = {require('../assets/Human.png')}
            />
       </View>
       <View style = {styles.greyFooter}>
         <Text style = {styles.title}> 
            Login To Your Account
         </Text>
        
            <View style = {styles.whiteFooter}>
              <ScrollView>
            <Text style = {styles.fieldTitle}>
              Email
                </Text>


                <TextInput style ={styles.inputField}
                 onChangeText = {text => setState({...state, emailAddress: text})} 
                 value = {state.emailAddress} 
                 placeholder="Your Email" 
                 placeholderTextColor="#05375a"/>

                <Text style = {styles.fieldTitle}>
                  Password
                </Text>


                <TextInput style = {styles.inputField} 
                onChangeText = {text => setState({...state, password: text})} 
                value = {state.password} 
                placeholder = "Your Password"
                placeholderTextColor="#05375a" 
                secureTextEntry={true}/>


                <Feather
                name="eye-off"
                color="grey"
                size={2}
                />


               <TouchableOpacity style = {styles.buttonstyles} 
               onPress = {Signfinal}>
                 <Text>Login</Text>
               </TouchableOpacity>

               <TouchableOpacity style = {styles.forgot}
                    onPress = {() => navigation.navigate('Forgotp')}>
                    <Text>Forgot Password?</Text>
                  </TouchableOpacity>  

                  <View style = {styles.lastFooter}>

                 <TouchableOpacity style = {styles.register}
                    onPress = {() => navigation.navigate('Signup')}>
                    <Text>
                      <Text>Don't have an account? </Text> 
                      <Text style={styles.highlightRegister}>Register now</Text>
                    </Text>
                  </TouchableOpacity> 
                </View>
                </ScrollView>

             </View>   
      </View>
    </View>

    
  );

}
  
const styles=StyleSheet.create({

    container:{
       flex:1,
       flexDirection:'column',
       backgroundColor:'#8FEBB4',
    },

    images:{
        flex: 1,
        justifyContent: "center",
        width: 320,
        height: 200,
        marginLeft:'7%',

    },
    
    lastFooter:{
      flex:1,
      width: '100%',
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      backgroundColor:'white',
      justifyContent:"center",
      marginLeft:'18%',
      marginBottom:'10%'
    },

    forgot:{
      marginTop:30,
        marginLeft:'35%',
        marginBottom:'1%',
        
    },

    header:{
        flex:1,
        justifyContent: 'flex-end',
        paddingHorizontal: '5%',
        paddingBottom: '5%',
     },
     greyFooter:{
        flex:2,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingTop: '10%',
        backgroundColor:'#E5E5E5'
    },

    whiteFooter:{
        flex:1,
        justifyContent: 'flex-end',
        width: '100%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor:'white'
    },

    title:{
        fontSize: 25, 
        fontWeight: '400',
        textAlign:'center',
        paddingBottom: '3%',
    }, 

    fieldTitle:{
        fontSize:20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: '20%',
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

    buttonstyles:{
      left: '22%',
       width: 200,
       height: 50,
       alignItems: 'center',
       left:'24%',
       borderRadius: 25,
       marginVertical:'2%',
       paddingVertical: '4%',
       backgroundColor:"#8FEBB4"
    },

    register:{
        marginTop:'10%',
        marginLeft:'5%',
        marginBottom:'1%',
        
    },
    textInput: {
              flex: 1,
              marginTop: Platform.OS === 'android' ? 0 : -12,
              paddingLeft: 10,
              color: '#05375a',

  },
  highlightRegister: {
    color:"#8FEBB4",
  }

});


  

export default Signs;