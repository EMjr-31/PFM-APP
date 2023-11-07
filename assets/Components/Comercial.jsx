import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import {Card} from "./Card";
import { CardGrande } from "./CardGrande";
import { useNavigation } from "@react-navigation/native";


const Comercial = () => {
  const navegar=useNavigation();
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.cardContainer}>
            <CardGrande 
              onPress={()=>navegar.navigate("Propuestas")} 
              titulo='Propuestas' 
              color='2' 
              colorTexto='11' 
              icono='clipboard-flow-outline' 
              numero='12'
            />
            <CardGrande 
              onPress={()=>navegar.navigate("Clientes")} 
              titulo='Clientes' 
              color='3'
              colorTexto='11'
              icono='office-building'
              numero='20'
            />
            <CardGrande 
              onPress={()=>navegar.navigate("Contactos")} 
              titulo='Contactos' 
              color='5' 
              colorTexto='11' 
              icono='card-account-details-outline' 
              numero='30'
            />
            <CardGrande 
              onPress={()=>navegar.navigate("Reporte Comercial")} 
              titulo='Reportes'
              color='6' 
              colorTexto='11' 
              icono='chart-box-outline'
            />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Centrar verticalmente
    backgroundColor:'#0052cc'
  },
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap", // Permite que las tarjetas se envuelvan en filas
    justifyContent: "space-between", // Espaciado uniforme horizontalmente
    marginTop:15,
    paddingTop: 10,
    backgroundColor:'#f3f6fc',
    borderTopRightRadius:25,
    borderTopLeftRadius:25
  },
});

export default Comercial;
