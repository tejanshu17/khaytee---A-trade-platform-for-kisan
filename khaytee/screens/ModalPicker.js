import React from "react";

import { StyleSheet,Text, View,TouchableOpacity, Dimensions, ScrollView } from "react-native";
const OPTIONS=['Crop Name','Location'];
const WIDTH= Dimensions.get('window').width;
const HEIGHT= Dimensions.get('window').height;

const ModalPicker = (props) => {

    const onPressItem =(option)=>{
        props.changeModalVisibility(false);
        props.setSelectFilter(option)
    }
    const option=OPTIONS.map((item,index)=>{
        return(
            <TouchableOpacity
                style={styles.option}
                key={index}
                onPress={()=>onPressItem(item)}
            >
                <Text style={styles.text}>
                    {item}
                </Text>

            </TouchableOpacity>
        )
    })

    return(
        <TouchableOpacity
            onPress={()=> props.changeModalVisibility(false)}
            style={styles.container}
        >
            <View style={[styles.modal, {width: WIDTH-100, height: HEIGHT/6.5}]}>
                <ScrollView>
                    {option}
                </ScrollView>
            </View>
        </TouchableOpacity>
    )
}

const styles= StyleSheet.create({

    container:
    {
        flex: 1,
        alignItems: 'center',
        top: '7%',
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: 10,
    },
    option: {
        alignItems: 'flex-start'
    },

    text: {
        margin: 20,
        fontSize: 20,
        fontWeight: 'bold',
    }
})

export {ModalPicker}