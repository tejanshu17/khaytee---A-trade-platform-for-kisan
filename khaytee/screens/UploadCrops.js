import React,{ useState } from 'react';
import { Text, View , Button, Dimensions, Platform, StyleSheet, Image, TextInput, SafeAreaView, ScrollView, Alert, Linking} from 'react-native';
import { CheckBox, Icon } from 'react-native-elements';
import auth, { firebase } from'@react-native-firebase/auth'; 
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {useNavigation, useRoute} from '@react-navigation/native';
import  ImageCropPicker  from 'react-native-image-crop-picker';


export default function UploadCrops() {  

  const route=useRoute();
  const navigation=useNavigation();
  var variate="C";
  var mandiboy;
  var tempID;
  var dum_price="5000";
  let urlpic;
  const userID=route.params.Id;
  const cropname=route.params.cropname;
  const qty=route.params.qty;
  
  const [maximumData, setMaximumData] = useState();
  const [minimumData, setMinimumData] = useState();
  const [Mandi,setMandi]=useState();  
  const [img,setImg]=useState(null);
  const [imgURL,setImgURL] =React.useState();
  const [imgname,setImgname] =React.useState();
  const [user, setUser] = React.useState();
  const [price,setPrice]=React.useState(0);

const onAuthStateChanged = user =>{
  setUser(user);
}
React.useEffect(() => {
  const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  return subscriber;
},[])

const uploadImg=()=>{
  ImageCropPicker.openPicker({
    width:300,
    height:400,
    cropping: false,
  }).then( async image => {
    console.log(image)
    setImg(image.path)
    let imgName=image.path.substring(image.path.lastIndexOf('/')+1);
    setImgname(imgName)   
  })
}


const getMandi = async () =>
{   
        console.log(userID,qty,imgURL)
        await firestore()
        .collection('FarmerDB')
        .doc(userID)
        .get()
        .then(documentSnapshot => {
          console.log("found farmer details", documentSnapshot.exists);

          if(documentSnapshot.exists)
          {
            mandiboy = documentSnapshot.data().Mandi;
            setMandi(mandiboy)
          }
        }).then(() =>
                console.log(userID,mandiboy)).catch(error => console.log(error));

        const mandiString=mandiboy+"_"+cropname
        const resp = await fetch("https://api-fastapi.herokuapp.com/predictedValue");
        const data = await resp.json();
        const stringData=JSON.stringify(data)
        const obj=JSON.parse(stringData)
        const tempMax=(obj[mandiString]['Maximum'])
        const tempMin=(obj[mandiString]['Minimum'])

        const stringMax=JSON.stringify(tempMax)
        const stringMin=JSON.stringify(tempMin)

        setMaximumData(stringMax.slice(0,4))
        setMinimumData(stringMin.slice(0,4))
        
        
      }


    const getcid = () =>
    {
        firestore()
        .collection('userType')
        .doc('count')
        .get()
        .then(documentSnapshot => {
                        console.log('found crop id', documentSnapshot.exists);

                        if (documentSnapshot.exists) {
                          console.log('Crop data: ', documentSnapshot.data());
                          tempID=documentSnapshot.data().Crop;
                          console.log(tempID)
                        }
                     }).then(()=>
                            generate_ID(tempID)).catch(error => console.log(error));
      
    }

    const generate_ID = (rec_tempID) =>
    {
       
        console.log(rec_tempID) 
        var upcount,new_crop;   
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

      if(price>0){

        console.log(minimumData)
        var min=parseInt(minimumData)
        var max=parseInt(maximumData)
        console.log(typeof(max))
        console.log(price)
        if(price>=min && price<=max){
          firestore().collection('userType').doc('count').update({
            Crop: upcount,
          }).then(()=>{console.log('count updated in database')});
          new_crop = variate+char1+char2+char3+char4+char5;
          console.log(new_crop);
          add_entry(new_crop);
        }
        else{
          alert("Enter valid price")
        }

      }
      else{
        alert("Enter price")
      }
      
      

    }
    const add_entry = async (cropnumber) =>
    {
      const reference=storage().ref(imgname);
      try{
        await reference.putFile(img)
        const url=await storage().ref(imgname).getDownloadURL()
        urlpic=url
        console.log(urlpic)
      } catch (error){
        console.log(error) 
      }

     
          console.log(cropnumber,mandiboy,urlpic)
          firestore().collection('CropDB').doc(cropnumber).set({
            CropName: cropname,
            FarmerID:userID,
            CropID:cropnumber,
            Mandi:Mandi,
            Photo:urlpic,
            Price:price ,
            Qty: qty,
            
  
          }).then(()=> {
            console.log("crop is uploaded") 
            alert("Crop Uploaded")
          }
            
          ).catch(error=>console.log(error));
          
     
    }

    const getAllData = () =>{
      getcid();
    }
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
  
  <Image  
  style={styles.timg}
  source={{uri:img}}> 
  </Image>
   
  <View style={styles.chooseimg}>
        <Text style = {{color:"white", left:"16%", top: "26%", fontSize: 17}} onPress={()=>uploadImg()}>Choose From Gallery</Text>
  </View>

  <Text style = {{color:"black", left:"5%", top: "16%", fontSize: 20, fontWeight: "bold"}}>Recommended Cost:</Text>

  <View style={styles.cost}>
      <Text style = {{color:"black", left:"12%", top: "16%", fontSize: 18, fontWeight: "bold"}}>{maximumData}-{minimumData}</Text>
  </View>

  <View style={styles.getPrice}>
        <Text style = {{color:"white", left:"16%", top: "28%", fontSize: 17}} onPress={()=>getMandi()}>Get Price</Text>
  </View>
  
  <Text style = {{color:"black", left:"5%", top: "20%", fontSize: 20, fontWeight: "bold"}}>Your Cost:</Text>

  
      <TextInput 
        style={styles.costVerify}
        onChangeText={text=>setPrice(text)}
        >
        </TextInput>
  
  <View style={styles.upload}>
        <Text style = {{color:"white", left:"25%", top: "28%", fontSize: 17}} onPress={()=>getAllData()}>Upload</Text>
  </View>

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
  left: 350,
  bottom: 110,
  right: -5,
  top: -28,
  borderRadius: 1000,
},

location: {
  fontSize:18,
  fontWeight:'bold',
  left:'5%',
  top:'14%',
},

timg: { 
  width: "80%",
  height: "25%", 
  left: "9%",
  // bottom: 110,
  // right: -5,
  top: "4%",
  // borderRadius: 1000,
},

locationbar: {
  left: '2%',
  top: '2%',
  width:'80%',
  height: '5%',
  borderRadius:40,
  backgroundColor:"#ffffff",
},

chooseimg: {
    left: '20%',
    top: '10%',
    width:'60%',
    height: '6%',
    borderRadius:40,
    backgroundColor:"black",
  },

cost:{
    backgroundColor: "white",
    height:"5%",
    width: "30%",
    left: "55%",
    top: "12.5%"
},

costVerify:{
  backgroundColor: "white",
  height:"5%",
  width: "30%",
  left: "32%",
  top: "16%",
  fontSize:12,
  fontWeight: 'bold',
},

upload: {
    left: '35%',
    top: '25%',
    width:'30%',
    height: '6%',
    borderRadius:40,
    backgroundColor:"black",
  }, 
  getPrice:{
    left: '40%',
    top: '16%',
    width:'25%',
    height: '5%',
    borderRadius:30,
    backgroundColor:"black",
  }

});

