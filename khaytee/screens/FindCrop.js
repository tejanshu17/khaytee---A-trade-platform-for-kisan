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
  import { ModalPicker } from '../screens/ModalPicker';
  import { CropNamePicker } from './CropNamePicker';
  import { LocationPicker } from './LocationPicker';

const FindCrop=()=>{ 
   const navigation=useNavigation();
   const route=useRoute();
   const [state, setState] = React.useState({
    searchInput:'',
   });
   const [user, setUser]=React.useState();
   const [lastdoc,setLastDoc]=React.useState(null);
   const [crops,setCrops]=React.useState([]);
   const [value,setValue]=useState([]);
   const [location,setLocation]=useState();
   const [CropName,setCropName]=useState();
   const [isFilterVisible,setIsFilterVisible]=useState(false);
   const [isCropFilterVisible,setIsCropFilterVisible]=useState(false);
   const [isLocationFilterVisible,setIsLocationFilterVisible]=useState(false);
   const userID=route.params.Id;

   const changeModalVisibility=(bool)=>{
    setIsFilterVisible(bool)
   }

   const setSelectFilter = (option) => {
     setValue(option);
     if (option=="Crop Name"){
       changeModalVisibilityCrop(true)
     }
     else if(option=="Location")
     {
      changeModalVisibilityLocation(true)
     }
   }

   const changeModalVisibilityCrop=(bool)=>{
    setIsCropFilterVisible(bool)
   }

   const setSelectFilterCrop = (option) => {
    setCropName(option);
    DisplaySearchedData(option);
  }

  const changeModalVisibilityLocation=(bool)=>{
    setIsLocationFilterVisible(bool)
   }

   const setSelectFilterLocation = (option) => {
    setLocation(option);
    DisplaySearchedDataBasedonLocation(option);
  }
   const onAuthStateChanged = user =>{
       setUser(user);
   }
   useEffect(() => {
    
    const abortController = new AbortController();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    getCropData();
    
    return()=>{
      subscriber;
      abortController.abort();
    };
        
    },[])
    
   
    const getCropData = async ()=>{

      console.log("Entered getData");
      const snapshot=await firestore().collection('CropDB').get();

      if(!snapshot.empty){

        let newCrops=[];

        setLastDoc(snapshot.docs[snapshot.docs.length-1]);

        for(let i=0;i<snapshot.docs.length;i++)
        {
          newCrops.push(snapshot.docs[i].data());
        }
        setCrops(newCrops);
      }
      else{
        setLastDoc(null);
      }

    }
    
    const DisplaySearchedData = (search) =>{
      console.log("Entered Search data")
      let newCrops=[];
     
        const snapshot=firestore().collection('CropDB');
        const searching=search ? snapshot.where("CropName", "==", search):snapshot;
  
        searching.get().then(snaps=>{
          
          setLastDoc(snaps.docs[snaps.docs.length-1]);
  
          for(let i=0;i<snaps.docs.length;i++)
          {
            newCrops.push(snaps.docs[i].data());
          }
  
          setCrops(newCrops);
        })
      

    }

    const DisplaySearchedDataBasedonLocation = (search) =>{
      console.log("Entered Search data")
      let newCrops=[];
     
        const snapshot=firestore().collection('CropDB');
        const searching=search ? snapshot.where("Mandi", "==", search):snapshot;
  
        searching.get().then(snaps=>{
          
          setLastDoc(snaps.docs[snaps.docs.length-1]);
  
          for(let i=0;i<snaps.docs.length;i++)
          {
            newCrops.push(snaps.docs[i].data());
          }
  
          setCrops(newCrops);
        })
      

    }
    
    const renderList=({CropName,Photo,Mandi,Price,CropID,FarmerID})=>{
      return(
        <View style={styles.list}>
          <TouchableOpacity
            onPress={()=>navigation.navigate('BuyerCropDetails',{Id:userID,cropID:CropID,farmerID:FarmerID})}
          >
          <View style={styles.listItem} >
                <Text style={styles.cropTitle}>{CropName}</Text>
                <FontAwesome name={'map-marker-alt'} size={20} style={styles.locationIcon}></FontAwesome> 
                <Text style={styles.mandiTitle}>{Mandi}</Text>
                <FontAwesome name={'rupee-sign'} size={20} style={styles.rupeeIcon}></FontAwesome> 
                <Text style={styles.priceTitle}>{Price}</Text>
                <Image source={{uri:Photo}} style={styles.listImage}/>      
          </View>
          </TouchableOpacity>
        </View>

      )
    }

    return(
      
        <SafeAreaView style={styles.container}>
          <ScrollView>
           <View style={styles.searchbar}>
              <View style={styles.searchCol}>
                <FontAwesome name={'search'} size={20} style={styles.searchIcon}></FontAwesome>
                <TextInput  
                  onChangeText={text=>
                   setState({...state, searchInput: text})
                  }
                  placeholder="apply filters        "
                  editable={false}
                  
                />
                <TouchableOpacity
                  onPress={()=> changeModalVisibility(true)}
                >
                  <FontAwesome name={'filter'} size={20} style={styles.filterIcon}></FontAwesome>
                </TouchableOpacity>
                <Modal
                  transparent={true}
                  animationType='fade'
                  visible={isFilterVisible}
                  nRequestClose={()=> changeModalVisibility(false)}
                >
                  <ModalPicker 
                    changeModalVisibility={changeModalVisibility}
                    setSelectFilter={setSelectFilter}
                  />

                </Modal>
                <Modal
                  transparent={true}
                  animationType='fade'
                  visible={isCropFilterVisible}
                  nRequestClose={()=> changeModalVisibilityCrop(false)}
                >
                 <CropNamePicker 
                    changeModalVisibilityCrop={changeModalVisibilityCrop}
                    setSelectFilterCrop={setSelectFilterCrop}
                  /> 
                </Modal>
                <Modal
                  transparent={true}
                  animationType='fade'
                  visible={isLocationFilterVisible}
                  nRequestClose={()=> changeModalVisibilityLocation(false)}
                >
                 <LocationPicker 
                    changeModalVisibilityLocation={changeModalVisibilityLocation}
                    setSelectFilterLocation={setSelectFilterLocation}
                  /> 
                </Modal>

              </View>
            </View>

            <Image  
                style={styles.male_avatar}
                source={require("../assets/male_avatar.png")}> 
            </Image> 
           </ScrollView>
          <FlatList 
              style={styles.flatlistDisplay}
              data={crops}
              keyExtractor={item=> item.CropID.toString()}
              renderItem={({item})=> renderList(item)}
            />            
            <View style={styles.navigationMenu}>
            <FontAwesome name={'home'} size={36} style={styles.homeIcon} onPress={()=> navigation.navigate('BuyerHome',{Id:userID})}></FontAwesome> 
            <FontAwesome name={'search'} size={34} style={styles.NavigationIcon}></FontAwesome>
            <FontAwesome name={'clipboard'} size={34} style={styles.NavigationIcon} onPress={()=> navigation.navigate('initTrans',{Id:userID})}></FontAwesome>
            <FontAwesome name={'user'} size={34} style={styles.NavigationIcon} onPress={()=> navigation.navigate('profileBuyer',{Id:userID})}></FontAwesome>
            </View>
        </SafeAreaView>
        
    );

}

const styles=StyleSheet.create({

    container: {
        backgroundColor: "#8febb4",
        flex:1,
      },

      male_avatar: { 
        width: 55,
        height: 55, 
        left: '85%',
        top: '-27%',
        borderRadius: 1000,
      },

      searchbar: {
        left: '2%',
        top: '15%',
        width:'80%',
        height: '36%',
        borderRadius:40,
        backgroundColor:"#ffffff",
     }, 

     searchIcon:{
       paddingTop:'2.5%',
       paddingHorizontal: '2%',
       paddingRight: '3%',
     },

     filterIcon:{
      paddingLeft:'45%',
      paddingTop:'3%',
     },     
     
     searchCol:{
       flexDirection: 'row',
     },
     
     list: {
      width: '100%',
      flexDirection: 'column',
      paddingHorizontal: 10,
      marginBottom: 20
    },

    flatlistDisplay:{
      top:'-2%',
    },
    
    listImage:{
      width:70,
      height:70,
      left: '3%',
      bottom:'122%',
      borderRadius: 30,
    },

    listItem:{
      alignSelf:'center',
      width:380,
      height:90,
      borderRadius:40,
      backgroundColor:"#E5E5E5",

    },
    cropTitle:{
      fontSize:25,
      fontWeight: 'bold',
      alignSelf: 'center',
    },
    locationIcon:{
      left:'32%',
      top:'30%',
      
    },

    mandiTitle:{
      fontSize:17,
      left:'38%',
      top:'10%', 
    },

    rupeeIcon: {
      left:'60%',
      top:'-18%',
    },

    priceTitle:{
      left:'65%',
      top:'-36%',
    },

    navigationMenu: {
      alignSelf:'center',
      width:370,
      height:50,
      bottom:'2%',
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

    loader:{
      marginBottom:1,
      alignItems:'center',
    },
    registerBtn:{
      backgroundColor:'white',
      alignSelf:'center',
      width:'40%',
      marginTop: 30,
      marginBottom: 15,
      borderRadius:40,
      borderWidth: 2,
  },
});


export default FindCrop;