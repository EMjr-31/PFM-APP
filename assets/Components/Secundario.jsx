import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from "react-native";

const data = [
    { id: "1", campo1: "Valor 1", campo2: "Valor A" },
    { id: "2", campo1: "Valor 2", campo2: "Valor B" },
    { id: "3", campo1: "Valor 3", campo2: "Valor C" },
    { id: "4", campo1: "Valor 4", campo2: "Valor D" },
    { id: "5", campo1: "Valor 5", campo2: "Valor E" },
    { id: "6", campo1: "Valor 6", campo2: "Valor F" },
    { id: "7", campo1: "Valor 7", campo2: "Valor G" },
    { id: "8", campo1: "Valor 8", campo2: "Valor H" },
    { id: "9", campo1: "Valor 9", campo2: "Valor I" },
    { id: "10", campo1: "Valor 10", campo2: "Valor J" },
    { id: "11", campo1: "Valor 11", campo2: "Valor K" },
    { id: "12", campo1: "Valor 12", campo2: "Valor L" },
    { id: "13", campo1: "Valor 13", campo2: "Valor M" },
    { id: "14", campo1: "Valor 14", campo2: "Valor N" },
    { id: "15", campo1: "Valor 15", campo2: "Valor O" },
    { id: "16", campo1: "Valor 16", campo2: "Valor P" },
    { id: "17", campo1: "Valor 17", campo2: "Valor Q" },
    { id: "18", campo1: "Valor 18", campo2: "Valor R" },
    { id: "19", campo1: "Valor 19", campo2: "Valor S" },
    { id: "20", campo1: "Valor 20", campo2: "Valor T" },
    { id: "21", campo1: "Valor 21", campo2: "Valor U" },
    { id: "22", campo1: "Valor 22", campo2: "Valor V" },
    { id: "23", campo1: "Valor 23", campo2: "Valor W" },
    { id: "24", campo1: "Valor 24", campo2: "Valor X" },
    { id: "25", campo1: "Valor 25", campo2: "Valor Y" },
    { id: "26", campo1: "Valor 26", campo2: "Valor Z" },
  ];
  

const EncabezadoTabla = () => (
  <View style={styles.row}>
    <Text style={styles.cellHeader}>Campo 1</Text>
    <Text style={styles.cellHeader}>Campo 2</Text>
  </View>
);

const ListaTabla = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        // Aquí puedes agregar la lógica para manejar el toque en una fila, por ejemplo, navegación a una pantalla de detalles
        //navigation.navigate("Detalle", { item });
        alert(item.campo2)
      }}
    >
      <View style={styles.row}>
        <Text style={styles.cell}>{item.campo1}</Text>
        <Text style={styles.cell}>{item.campo2}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.centered}>
        <View style={styles.tabla}>
          <EncabezadoTabla />
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabla: {
    width: '90%', // Utiliza el 90% del ancho disponible
    backgroundColor:'#fff',
    marginTop:40,
    padding:2,
    borderRadius:10
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  cellHeader: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    paddingBottom:10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    fontSize:16
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
});

export default ListaTabla;
