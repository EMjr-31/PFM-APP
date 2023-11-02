import React from "react";
import { View, Text,TouchableOpacity , StyleSheet} from "react-native";

export function Btn(props){
    const {onPress,texto, color}=props
    return (
        <TouchableOpacity
            style={{
                ...styles.btn, 
                backgroundColor:color
            }
            }
            onPress={onPress}
        >
            <Text style={styles.btn_texto}>{texto}</Text>
        </TouchableOpacity>
    )
}

const styles= StyleSheet.create({

    btn:{
        alignSelf:'center',
        padding: 15,
        width:'100%',
        height:55,
        borderRadius:100,
    },
    btn_texto:{
        textAlign:'center',
        color:'#fff'
    }
})