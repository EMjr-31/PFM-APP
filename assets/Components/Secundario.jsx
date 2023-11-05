import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";

const apiUrl = "http://147.182.249.91/api/plazas-trabajo";

const ListaTabla = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Realiza una solicitud HTTP a la API para obtener los datos
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error al obtener datos:", error));
  }, []);

  const EncabezadoTabla = () => (
    <View style={styles.row}>
      <Text style={styles.cellHeader}>ID</Text>
      <Text style={styles.cellHeader}>Nombre de la Plaza</Text>
      <Text style={styles.cellHeader}>Estado</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        // Aquí puedes agregar la lógica para manejar el toque en una fila, por ejemplo, navegación a una pantalla de detalles
        // navigation.navigate("Detalle", { item });
        alert(item.nombre_plaza)
      }}
    >
      <View style={styles.row}>
        <Text style={styles.cell}>{item.id}</Text>
        <Text style={styles.cell}>{item.nombre_plaza}</Text>
        <Text style={styles.cell}>{item.estatus}</Text>
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
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabla: {
    width: "90%",
    backgroundColor: "#fff",
    marginTop: 40,
    padding: 2,
    borderRadius: 10,
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
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    fontSize: 16,
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
});

export default ListaTabla;
