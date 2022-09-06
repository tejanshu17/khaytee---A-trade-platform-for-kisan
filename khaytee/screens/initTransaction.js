import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  ImageBackground,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {useNavigation, useRoute} from '@react-navigation/native';


export const initTransaction =() =>
{
    const route=useRoute();
    const navigation=useNavigation();
    const userID=route.params.Id;
    return(
        <View style={styles.container}>
            <View style={styles.top}>
            <TouchableOpacity/>
            <Text style={styles.title} onPress={() =>navigation.navigate('PendingTrans',{Id:userID})}>Pending Transaction</Text>
            </View>
            <View style={styles.middle}>
            <TouchableOpacity onPress={() =>navigation.navigate('PendingOrder',{Id:userID})}/> 
            <Text style={styles.title} onPress={() =>navigation.navigate('PendingOrder',{Id:userID})}>Pending Order</Text>
            </View>
            <View style={styles.bottom}>
            <TouchableOpacity/>
            <Text style={styles.title} onPress={() =>navigation.navigate('TransHistory',{Id:userID})}>Transaction History</Text>
            </View>
             
        </View>
    )
}

const styles=StyleSheet.create({

    container:{
        flex:9,
       flexDirection:'column',
       backgroundColor:'#FFFFFF',
    },
    title:{
        top:'40%',
        fontSize: 25, 
        fontWeight: '400',
        textAlign:'center',
        paddingBottom: '3%',
        color:'#000000'
    }, 
    top:{
        flex:3,
        flexDirection:'column',
        backgroundColor:'#7FFFD4',
    },
    middle:{
        flex:3,
        flexDirection:'column',
        backgroundColor:'#2AAA8A',
    },
    bottom:{
        flex:3,
        flexDirection:'column',
        backgroundColor:'#40E0D0',
    },
    buttonstyles:{
       left: '25%',
       width: 200,
       height: 50,
       alignItems: 'center',
       borderRadius: 25,
       marginVertical:'2%',
       paddingVertical: '4%',
       backgroundColor:"#00FFFF"
      },





})




