import React, { Component } from  "react"; 
import { 
    View, 
    Text, 
    Image,
    TextInput,
    StyleSheet,
    ScrollView,
    ToastAndroid
} from 'react-native';
import RadioForm from "react-native-simple-radio-button";
import DatePicker from "react-native-datepicker";
import {SignupUser} from "../apiService";
import auth, { firebase } from '@react-native-firebase/auth';
import {Button, ThemeProvider} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import FarmerHome from '../screens/FarmerHome.js';

var TypeOfUser= [
    {label: "Farmer", value: 0},
    {label: "Buyer", value: 1},
]

class Signup extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
        date: '',
        name:'',
        emailAddress: '',
        password: '',
        phoneNo: '',
        aadharNo: '',
        typeofUser:'',
        user: '',
        mandiField: false,
        mandi:'',
        count: '',
        id:'',
        age:0,
        };
      }
    
    calculateCount=(num,typeofuser)=>{

        const currentUserUid=firebase.auth().currentUser.uid;
        this.calAge();
        let char1=num.charAt(0);
        let char2=num.charAt(1);
        let char3=num.charAt(2);
        let char4=num.charAt(3);
        let char5=num.charAt(4);
    
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
            num=char1+char2+char3+char4+char5;
            this.id=num;
    
             //count gets updated in userType Category and adding user entry
            if(typeofuser==0)
            {
                firestore().collection('userType').doc('count').update({
                    Farmer: num,
                }).then(()=>{console.log('count updated in database')});

                firestore().collection('userType').doc(currentUserUid).set({
                    Category: 'FarmerDB',
                    ID:'F'+this.id,
                }).then(()=>{console.log('Added user in userType')}).then(()=>this.storeUserData(typeofuser));
            }
            else if(typeofuser==1)
            {
                firestore().collection('userType').doc('count').update({
                    Buyer: num,
                }).then(()=>{console.log('count updated in database')});

                firestore().collection('userType').doc(currentUserUid).set({
                    Category: 'BuyerDB',
                    ID:'B'+this.id,
                }).then(()=>{console.log('Added user in userType')}).then(()=>this.storeUserData(typeofuser));
            }
    
    }

    //validates the field, adds user in authentication 
    validate=()=>{

        const{name,emailAddress,password,phoneNo,aadharNo,date,typeofUser,mandi}=this.state;
        var flag=true;
        var retrievedCount='';
        if(name=="")
        {
           alert("Please enter name");
            flag=false;
        }
        else if(emailAddress=="")
        {
            alert("Please enter valid email");
            flag=false;
        }
        else if(phoneNo.length!=10 && isNaN(phoneNo))
        {
            alert("Phone number needs to have 10 digits");
            flag=false;
        }
        else if(aadharNo=="")
        {
            alert("Please enter aadhar number");
            flag=false;
        }
        else if((parseInt(new Date().getFullYear())-parseInt(date.substring(6,10)))<2)
        {
            alert("Please enter birth date");
            flag=false;
        }
        else if(password=="")
        {
            alert("Please enter the password");
            flag=false;
        }
        else if(typeofUser!="")
        {
            if(typeofUser==0)
            {
                if(mandi=="")
                 {
                    alert("Please enter the mandi");
                    flag=false;
                }
                else
                {
                    flag=true;
                }
            }
           
        }
        if(flag)
        {
            SignupUser(this.state.emailAddress.trim(),this.state.password)
            .then(
                (data)=>{
                   alert(data);

                   if(typeofUser==0) //retrieve farmer's count
                   {
                    firestore()
                    .collection('userType')
                    .doc('count')
                    .get()
                    .then(documentSnapshot => {
                        console.log('User is farmer: ', documentSnapshot.exists);

                        if (documentSnapshot.exists) {
                        console.log('User data: ', documentSnapshot.data());
                        retrievedCount=documentSnapshot.data().Farmer;
                        }
                     }).then(()=>this.calculateCount(retrievedCount,typeofUser)).catch(error => console.log(error));
                   }
                   else if(typeofUser==1) //retrieve buyer's count
                   {
                    firestore()
                    .collection('userType')
                    .doc('count')
                    .get()
                    .then(documentSnapshot => {
                        console.log('User is buyer: ', documentSnapshot.exists);
                        if (documentSnapshot.exists) {
                        console.log('User data: ', documentSnapshot.data());
                        retrievedCount=documentSnapshot.data().Buyer;
                        }
                     }).then(()=>
                            this.calculateCount(retrievedCount,typeofUser)).catch(error=>console.log(error));
                   }
                })
                .catch((error) => {
                        alert(error);
              });
        }
    }

    storeUserData=(typeofuser)=>{
        const{name,emailAddress,phoneNo,aadharNo,date,mandi,age}=this.state;
        if(typeofuser==0)
        {
            firestore().collection('FarmerDB').doc('F'+this.id).set({
                Aadhar: aadharNo,
                Age: age,
                DOB: date,
                Email:emailAddress,
                Mandi:mandi,
                Name: name,
                PhoneNo: phoneNo

            }).then(()=>this.props.navigation.navigate("FarmerHome",{Id:'F'+this.id})).catch(error=>console.log(error));
        }
        else if(typeofuser==1){
            
            firestore().collection('BuyerDB').doc('B'+this.id).set({
                Aadhar: aadharNo,
                Age: age,
                DOB: date,
                Email:emailAddress,
                Name: name,
                PhoneNo: phoneNo

            }).then(()=>this.props.navigation.navigate("BuyerHome",{Id:'B'+this.id})).catch(error=>console.log(error));
        }
        
    }

    onAuthStateChanged=users=>{
        this.user=users;
    }

    componentDidMount(){
        
        const subscriber=auth().onAuthStateChanged(this.onAuthStateChanged);
        return subscriber;
    }

    showMandiField=(value)=>{
        if(value=='0')
        {          
            this.setState({mandiField:true})

        }
        else
        {
            this.setState({mandiField:false})
        }
    }

    calAge=()=>{
       
       console.log(this.state.date);
       const age=parseInt(new Date().getFullYear())-parseInt(this.state.date.substring(6,10));
       this.setState({age:age});

    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image 
                        style={styles.img} 
                        source={require("../assets/signup.png")} 
                    />
                </View>

                <View style={styles.greyFooter}>
                    <Text style={styles.title}>Create New Account</Text>
                    <View style={styles.whiteFooter}>
                            <ScrollView>
                                <Text style={styles.fieldTitle}>Name</Text>
                                <TextInput 
                                    style={styles.inputField} 
                                    placeholder='Enter your Name' 
                                    onChangeText={(value)=>this.setState({name:value})} 
                                    mode="outlined" 
                                    value={this.state.name}                                    
                                    theme={theme}
                                />

                                <Text style={styles.fieldTitle}>Email</Text>
                                <TextInput 
                                    style={styles.inputField} 
                                    placeholder='Enter your email'  
                                    mode="outlined" 
                                    theme={theme}
                                    value={this.state.emailAddress}
                                    onChangeText={(text)=>this.setState({...this.state,emailAddress:text})}

                                />

                                <Text style={styles.fieldTitle}>Phone</Text>
                                <TextInput 
                                    style={styles.inputField} 
                                    placeholder='Enter your phone number'  
                                    mode="outlined" 
                                    onChangeText={(value)=>this.setState({phoneNo:value})} 
                                    value={this.state.phoneNo}
                                    theme={theme}
                                />

                                <Text style={styles.fieldTitle}>Aadhar</Text>
                                <TextInput 
                                    style={styles.inputField} 
                                    placeholder='Enter aadhar number'  
                                    mode="outlined" 
                                    onChangeText={(value)=>this.setState({aadharNo:value})} 
                                    theme={theme}
                                />

                            <Text style={styles.fieldTitle}>Birth Date</Text>
                            <DatePicker 
                                style={styles.datePicker}
                                format="DD-MM-YYYY"
                                date={this.state.date}
                                value={this.state.date}
                                mode="date" 
                                minDate="01-01-2001"
                                maxDate="26-09-2021"
                                onChangeText={(value)=>this.setState({date:value})} 
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0,
                                    }, 
                                    dateInput: {
                                        marginLeft:36,
                                        borderColor: '#8FEBB4',
                                        borderRadius: 15,
                                        borderWidth: 2,
                                    }
                                }}
                                onDateChange={(value) => 
                                    this.setState({date:value})
                                }

                            />
                            <Text style={styles.fieldTitle}>Password</Text>
                            <TextInput 
                                    style={styles.inputField} 
                                    mode="outlined" 
                                    theme={theme}
                                    secureTextEntry={true}
                                    value={this.state.password}
                                    onChangeText={(text)=>this.setState({...this.state,password:text})}
                                />
                        <View>
                            <Text style={styles.fieldTitle}>Type of User</Text>
                            <RadioForm style={styles.radioButton}
                                radio_props={TypeOfUser}
                                initial={-1}
                                //onPress={(value)=>{ToastAndroid.show(value.toString(),ToastAndroid.SHORT)}}
                                onPress={(value)=>{
                                    this.showMandiField(value.toString())
                                    this.setState({typeofUser:value})
                                }}
                                buttonSize={20}
                                buttonColor={'#8FEBB4'}
                                selectedButtonColor={'#8FEBB4'}
                                labelStyle={{fontSize:18}}
                                disable={true}
                            />

                            {
                                this.state.mandiField?
                                (<View>
                                <Text style={styles.fieldTitle}>Mandi</Text>
                                <TextInput     
                                    style={styles.inputField} 
                                    placeholder='Enter your Mandi'  
                                    mode="outlined" 
                                    theme={theme}
                                    onChangeText={(value)=>this.setState({mandi:value})} 
                                /> 
                            </View>): null
                            }
                             
                        </View>
                            <Button 
                                style={styles.registerBtn}
                                mode='contained'
                                onPress={this.validate}
                                //onPress={()=>this.props.navigation.navigate("FarmerHome")}
                            >Register Now
                            </Button>
                        </ScrollView> 
                    </View>
                </View>               
            </View>
        )
    }
}


const theme={
    colors:{
        primary: '#8FEBB4'
    }
}


const styles=StyleSheet.create({

    container:{
       flex:1,
       flexDirection:'column',
       backgroundColor:'#8FEBB4',
    },
    
    header:{
        flex:1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 30,
     },
     greyFooter:{
        flex:5,
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
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: '20%',
    }, 

    inputField:{
        left:'18%',
        width: '65%',
        height: 40,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: "#8FEBB4"
    },

    datePicker: {
        left:'18%',
        width: 250,
    },

    radioButton:{
        left:'22%',
    },

    registerBtn:{
        backgroundColor:'#8FEBB4',
        alignSelf:'center',
        width:'40%',
        marginTop: 30,
        marginBottom: 15,
        borderRadius:40,
        borderWidth: 2,
    },

    img:{
        width:220,
        height:140,
        alignSelf:'center',
        top:'30%',
    }
});
  
export default Signup