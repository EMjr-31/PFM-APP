import React from "react";
import { View, Text,TouchableOpacity , StyleSheet} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { coloresTextos } from "./ColoresTextos"; 
import { colores } from "./Colores";
export function Card (props){
    const {onPress,titulo, color, colorTexto, icono,numero}=props
    return(
        <TouchableOpacity 
            style={{
                ...styles.card, 
                backgroundColor:colores[color]
            }
            }
            onPress={onPress}
        >
            <MaterialCommunityIcons name={icono} size={70} color={coloresTextos[colorTexto]} />
            <Text 
                 style={{
                    ...styles.cardText, 
                    color:coloresTextos[colorTexto]
                }
                }
            >{titulo}</Text>
            <Text
                style={{
                    ...styles.cardNum, 
                    color:coloresTextos[colorTexto]
                }}
            >{numero}</Text>
        </TouchableOpacity>
    )
}
const styles= StyleSheet.create({
    card: {
      flexBasis: "47%", // Establece el ancho del 48% del contenedor padre (menos espacio para evitar desbordamiento)
      height: 200,
      borderRadius: 35,
      padding: 16,
      marginHorizontal:5,
      marginVertical: 8, // Espaciado vertical entre las tarjetas
      justifyContent: "center",
      alignItems: "center",
    },
    cardText: {
      fontSize: 16,
      fontWeight:'bold'
    },
    cardNum:{
        fontSize: 12
    }
  });

