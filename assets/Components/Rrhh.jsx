import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import {Card} from "./Card";
import { CardGrande } from "./CardGrande";
import { useNavigation } from "@react-navigation/native";

const Rrhh =()=>{
    const navegar=useNavigation();
    return(
        <View style={styles.container}>
        <View style={styles.cardContainer}>
          <Card onPress={()=>{alert('Candidatos')}} titulo='Candidatos' color='5' colorTexto='11' icono='account-box-multiple-outline' numero='20'/>
          <Card onPress={()=>{alert('Reportes')}} titulo='Reportes' color='8' colorTexto='3' icono='chart-box-outline'/>
          <CardGrande 
            onPress={()=>navegar.navigate("Secundario", {EjemploProps:"Seguimientos"})} 
            titulo='Seguimientos' color='4' colorTexto='11' icono='badge-account-alert-outline' numero='12'
        />
        </View>
      </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center", // Centrar verticalmente
      backgroundColor:'#f3f6fc',
    },
    cardContainer: {
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap", // Permite que las tarjetas se envuelvan en filas
      justifyContent: "space-between", // Espaciado uniforme horizontalmente
    },
  });
  

export default Rrhh;