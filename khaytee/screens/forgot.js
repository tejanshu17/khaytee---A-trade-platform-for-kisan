import React from 'react';
import { Text, View , Button, Dimensions, Platform, StyleSheet, Image, TextInput, SafeAreaView, ScrollView, Alert, Linking} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Forgotfinal } from './forgotapiService';
import auth from'@react-native-firebase/auth';


const Forgotpass = () =>
{
    
const [state, setState] = React.useState({
    emailAddress:''
  });

  const resetforgot = () =>
  {
      Forgotfinal(state.emailAddress)
      .then(data =>{
        alert(data);
      })
      .catch(error => {
        alert(error);
      });
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
             Forgot Password?
          </Text>
         
             <View style = {styles.whiteFooter}>
               <ScrollView>
             <Text style = {styles.fieldTitle}>
               Enter your email for recovery
                 </Text>
 
 
                 <TextInput style ={styles.inputField}
                  onChangeText = {text => setState({...state, emailAddress: text})} 
                  value = {state.emailAddress} 
                  placeholder="Your Email" 
                  placeholderTextColor="#05375a"/>

                  <TouchableOpacity style = {styles.buttonstyles}
                   onPress = {resetforgot}>
                      <Text>Submit</Text>
                      </TouchableOpacity>

                 </ScrollView>
            
 
              </View>   
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

    images:{
        flex: 1,
        justifyContent: "center",
        width: 320,
        height: 200,
        marginLeft:20,

    },
    
    lastFooter:{
      flex:1,
      width: '100%',
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      backgroundColor:'white',
      justifyContent:"center",
      marginLeft:80,
      marginBottom:50
    },

    forgot:{
        marginLeft:100,
        marginBottom:1
    },

    header:{
        flex:1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 30,
     },
     greyFooter:{
        flex:2,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingTop: 30,
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
        paddingTop: '14%',
        paddingBottom: 10,
        paddingLeft: '18%',
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
        marginVertical: '5%'
    },

    buttonstyles:{
      left: '25%',
      width: 200,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 25,
      marginVertical:'5%',
      paddingVertical: '3%',
      backgroundColor:"#8FEBB4"
    },

    textInput: {
      flex: 1,
      marginTop: Platform.OS === 'android' ? 0 : -12,
      paddingLeft: '5%',
      color: '#05375a',
  }

});


export default Forgotpass;