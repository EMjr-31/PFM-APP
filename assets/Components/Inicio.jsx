import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const PerfilUsuario = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../img/LogoPFCIniciales_.png")} // Reemplaza con la ruta de tu imagen de perfil
          style={styles.profileImage}
        />
      </View>
      <Text style={styles.name}>Nombre del Usuario</Text>
      <Text style={styles.email}>correo@ejemplo.com</Text>
      <Text style={styles.role}>Rol del Usuario</Text>
      <Text style={styles.date}>Fecha de Registro: 01/01/2023</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: 150, // Tamaño deseado para la imagen de perfil
    height: 150,
    borderRadius: 75, // Para hacer una imagen circular, asegúrate de que la mitad del ancho sea igual al radio
    overflow: "hidden",
    marginBottom: 20,
  },
  profileImage: {
    flex: 1,
    width: null,
    height: null,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
  },
  role: {
    fontSize: 16,
  },
  date: {
    fontSize: 12,
  },
});

export default PerfilUsuario;
