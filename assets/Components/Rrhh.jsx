import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { CardGrande } from "./CardGrande";
import { useNavigation } from "@react-navigation/native";

const Rrhh = () => {
  const navegar = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.cardContainer}>
        <CardGrande
          onPress={() => navegar.navigate("Secundario", { EjemploProps: "Seguimientos" })}
          titulo='Seguimientos'
          color='2'
          colorTexto='11'
          icono='badge-account-alert-outline'
          numero='12'
        />
        <CardGrande
          onPress={() => navegar.navigate("Ingresar Candidatos")}
          titulo='Candidatos'
          color='4'
          colorTexto='11'
          icono='account-box-multiple-outline'
          numero='20'
        />
        <CardGrande
          onPress={() => alert('Reportes')}
          titulo='Reportes'
          color='6'
          colorTexto='11'
          icono='chart-box-outline'
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0052cc',
  },
  cardContainer: {
    height:700,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 15,
    paddingTop: 10,
    backgroundColor: '#fff',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
});

export default Rrhh;
