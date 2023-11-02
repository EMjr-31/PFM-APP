import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView} from "react-native";

const Comercial = () => {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardText}>Propuestas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardText}>Clientes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardText}>Contactos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardText}>Empleados</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardText}>Reportes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Centrar verticalmente
  },
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap", // Permite que las tarjetas se envuelvan en filas
    justifyContent: "space-between", // Espaciado uniforme horizontalmente
  },
  card: {
    flexBasis: "48%", // Establece el ancho del 48% del contenedor padre (menos espacio para evitar desbordamiento)
    height: 200,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8, // Espaciado vertical entre las tarjetas
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    fontSize: 16,
  },
});

export default Comercial;
