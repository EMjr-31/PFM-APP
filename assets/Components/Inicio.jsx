import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import moment from 'moment'; // Importa la biblioteca moment
import { Btn  } from "./btn";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

const PerfilUsuario = () => {
  const route = useRoute();
  //const { correo } = route.params;
  const navegar = useNavigation();
   // Obtiene la fecha actual y la formatea en el formato deseado
   const currentDate = moment();
   const formattedDate = currentDate.format("dddd DD [de] MMMM YYYY");
  return (
    <View style={styles.container}>
      <View style={styles.cont_redondo}>
        <View style={styles.cont_fecha}>
        <Text style={styles.date}>{formattedDate}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require("../img/LogoPFCIniciales_.png")} // Reemplaza con la ruta de tu imagen de perfil
            style={styles.profileImage}
          />
        </View>
        <View style={styles.cont_usuario}>
          <Text style={styles.email}>Usuario PFC</Text>
        </View>
        <View style={styles.cont_btn}>
          <Btn
            onPress={()=>{
              navegar.navigate("Login");
            }}
            texto='Cerra Sesion'
            color="2"
            colorTexto="11"
          />
          <View style={styles.buttonSpacing}></View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#0052cc'
  },
  cont_redondo: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    padding: 10,
    height: '98%',
    width: '100%',
    backgroundColor: '#fff',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25
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
  cont_usuario:{
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    marginBottom:20,
    
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
  },cont_fecha:{
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    marginBottom:20,
  },
  date: {
    fontSize: 20,
  },
  cont_btn:{
    width:'85%',
    justifyContent:'center',
    alignItems:'center',
    marginBottom:20,
  },
  buttonSpacing: {
    height:5, // Separate the "Cancelar" button from the "Guardar" button
  },
});

export default PerfilUsuario;
