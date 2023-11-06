import React from "react";
import { View, Text,TouchableOpacity , StyleSheet} from "react-native";
import { colores } from "./Colores";
import { coloresTextos } from "./ColoresTextos";

export function Btn(props){
    const {onPress,texto, color, colorTexto}=props
    return (
        <TouchableOpacity
            style={{
                ...styles.btn, 
                backgroundColor:colores[color]
            }
            }
            onPress={onPress}
        >
            <Text 
                style={{
                    ...styles.btn_texto, 
                    color:coloresTextos[colorTexto]
                }
                }
            >{texto}</Text>
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
        color:'#fff',
        fontSize:18
    }
})