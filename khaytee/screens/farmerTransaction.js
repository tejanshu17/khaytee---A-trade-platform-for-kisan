import React,{ useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    Image,
    View,
    FlatList,
    TextInput,
    Modal,
  } from 'react-native';
  import FontAwesome from 'react-native-vector-icons/FontAwesome5';
  import auth, { firebase } from'@react-native-firebase/auth';
  import firestore from '@react-native-firebase/firestore';
  import {useNavigation, useRoute} from '@react-navigation/native';
  import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

  const farmerTransaction=()=>{ 

    const [user, setUser]=React.useState();
    const [lastdoc,setLastDoc]=React.useState(null);
    const [order,setOrder]=React.useState([]);
    const route=useRoute();
    const navigation=useNavigation();
    const userID=route.params.Id;

    const onAuthStateChanged = user =>{
      setUser(user);
    }
  
  useEffect(() => {
   
   const abortController = new AbortController();
   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
   getOrderData();
   
   return()=>{
     subscriber;
     abortController.abort();
   };
       
   },[])

   const getOrderData = async ()=>{

        console.log("Entered order Data");
        const snapshot=await firestore().collection('OrderDB')
        .where("FarmerId","==",userID).where("OrderStatus", "==", "Confirm")
        .get();
    
        if(!snapshot.empty){
    
          let newOrders=[];
    
          setLastDoc(snapshot.docs[snapshot.docs.length]);
    
          for(let i=0;i<snapshot.docs.length;i++)
          {
            newOrders.push(snapshot.docs[i].data());
          }
          setOrder(newOrders);
          console.log(newOrders)
        }
        else{
          setLastDoc(null);
        }
        
    
      }

  return(
    <View style={styles.container}>
      <ScrollView>
      {order.map((item)=>{
        return(
          <View key={item.OrderId}>
            <View style={styles.item}>
            <Text style={styles.cropTitle}>{item.CropName}</Text>
            <Text style={styles.fields}>{item.BuyerName}          Qty:{item.RequiredQty}           Status: {item.OrderStatus}</Text>
            </View>
          </View>
        )
      })}
      </ScrollView>

    </View>
    
     
 
   
)
}

const styles=StyleSheet.create({

  container: {
      backgroundColor: "#8febb4",
      flex:1,
    },

  item: {
    fontSize:50,
    backgroundColor: "#E5E5E5",
    marginTop:20,
    padding: 20,
    width:'90%',
    borderRadius: 50,
    left:'5%',
  }, 
  cropTitle:{
    fontSize:25,
    fontWeight:'bold',
    alignSelf:'center',
  },

  fields:{
    fontSize:15,
  }


});
 export default farmerTransaction;


