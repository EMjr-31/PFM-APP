import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import {Card} from "./Card";
import { CardGrande } from "./CardGrande";


const Comercial = () => {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <CardGrande onPress={()=>{alert('Propuestas')}} titulo='Propuestas' color='2' colorTexto='11' icono='clipboard-flow-outline' numero='12'/>
        <Card onPress={()=>{alert('Clientes')}} titulo='Clientes' color='3' colorTexto='11' icono='office-building' numero='20'/>
        <Card onPress={()=>{alert('Contactos')}} titulo='Contactos' color='5' colorTexto='11' icono='card-account-details-outline' numero='30'/>
        <Card onPress={()=>{alert('Reportes')}} titulo='Reportes' color='9' colorTexto='3' icono='chart-box-outline'/>
      </View>
    </View>
  );
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

export default Comercial;
