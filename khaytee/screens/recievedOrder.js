import React,{ useState, useEffect } from 'react';
import {TouchableHighlight} from 'react-native';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    Image,
    View,
    FlatList,
    TextInput,
    Modal,
    Button,
  } from 'react-native';
  import FontAwesome from 'react-native-vector-icons/FontAwesome5';
  import auth, { firebase, FirebaseAuthTypes } from'@react-native-firebase/auth';
  import firestore from '@react-native-firebase/firestore';
  import {useNavigation, useRoute} from '@react-navigation/native';
  import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

  const recievedOrder=()=>{ 

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

   const rejectCrop=(orderid)=>{
   
    firestore().collection('OrderDB').doc(orderid).update({
        OrderStatus: 'Reject',                
    }).then(()=>{console.log('order rejected in database')
        alert("Order Rejected")
  });

   }

   const acceptCrop=async (orderid)=>{

    var available;
    var required;
    var cropid;
    await firestore().collection('OrderDB').doc(orderid).get()
    .then(documentSnapshot => {
                   
                    if (documentSnapshot.exists) {
                      available=documentSnapshot.data().AvailableQty;
                      required=documentSnapshot.data().RequiredQty;
                      cropid=documentSnapshot.data().CropID;
                      console.log(cropid);
                    }
                 }).then(()=>{

                    firestore().collection('OrderDB').doc(orderid).update({
                        OrderStatus: 'Confirm',
                        AvailableQty:available-parseInt(required),
                      }).then(()=>{
                        
                        firestore().collection('CropDB').doc(cropid).update({
                          Qty:available-parseInt(required)
                          
                        }).then(()=>{console.log('order updated in crop db')});
                        
                        
                      console.log('order updated in database')
                      alert("Order Accepted");
                    
                    });

                      

                    

                 });
    
   
    

   }


   const getOrderData = async ()=>{

        // console.log("Entered order Data");
        const snapshot=await firestore().collection('OrderDB')
        .where("OrderStatus", "==", "Pending")
        .where("FarmerId","==",userID)
        .get();
    
        if(!snapshot.empty){
    
          let newOrders=[];
    
          setLastDoc(snapshot.docs[snapshot.docs.length]);
    
          for(let i=0;i<snapshot.docs.length;i++)
          {
            newOrders.push(snapshot.docs[i].data());
          }
          setOrder(newOrders);
          // console.log(newOrders)
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
            
            <View style={styles.buttons}>
            <TouchableOpacity style={styles.accept}><Text style={{color:"white", fontSize: 13, left:'3%', top:'10%'}} onPress={()=>acceptCrop(item.OrderId)}> Accept</Text></TouchableOpacity>
            <TouchableOpacity style={styles.reject}><Text style={{color:"white", fontSize: 13, left:'10%', top:'13%'}} onPress={()=>rejectCrop(item.OrderId)}> Reject</Text></TouchableOpacity>
            </View>
            
            

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
  }, 

  accept:{

    left:'30%',
    width: 60, 
    height: 30,
    borderRadius:40,
    backgroundColor:"black",
  },

  reject: {
    left:'30%',
    width: 60, 
    height: 30,
    borderRadius:40,
    backgroundColor:"black",
  },

  buttons:{
      flex:1,
      flexDirection:'row',
      left: '80%',
  }


});
 export default recievedOrder;


