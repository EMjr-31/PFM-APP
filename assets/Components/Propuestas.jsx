import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import { Btn } from './btn';
import { useNavigation } from "@react-navigation/native";
import { CardRegistro } from "./CardRegistro";
import { FAB } from 'react-native-paper'; // Importa FAB de react-native-paper
import { coloresTextos } from "./ColoresTextos";
import { colores } from "./Colores";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Propuestas = () => {
  const navegar = useNavigation();
  const [propuestas, setPropuestas] = useState([]);
  const [filtroTipoPropuesta, setFiltroTipoPropuesta] = useState("");

  useEffect(() => {
    // Realiza una solicitud a la API para obtener los datos de propuestas
    fetch("http://147.182.249.91/api/propuestas")
      .then(response => response.json())
      .then(data => {
        setPropuestas(data);
      })
      .catch(error => console.error(error));
  }, []);

  const filteredPropuestas = propuestas.filter(propuesta => {
    return propuesta.TipoPropuestaEnviada.toLowerCase().includes(filtroTipoPropuesta.toLowerCase());
  });

  return (
    <View style={styles.contenedor}>
      <View style={styles.cont_redondo}>
        <View style={styles.inputContainer}>
          <TextInput
            style={{
              ...styles.input,
              color: coloresTextos[4]
            }}
            placeholder="Buscar por tipo de propuesta"
            value={filtroTipoPropuesta}
            onChangeText={(text) => setFiltroTipoPropuesta(text)}
          />
          <MaterialCommunityIcons
            name="magnify"
            size={30}
            color={colores[2]}
          />
        </View>
        <ScrollView>
          {filteredPropuestas.map((propuesta, index) => (
            <CardRegistro
              key={index}
              onPress={()=>navegar.navigate("Editar Propuestas", {id:propuesta.id})}
              titulo={`${propuesta.TipoPropuestaEnviada}`}
              color="11"
              colorTexto="4"
              icono="clipboard-edit-outline"
              // Puedes mostrar más información de la propuesta aquí
              subtitulo={`${propuesta.cliente.nombre_empresa}`}
            />
          ))}
        </ScrollView>
        <FAB
          style={{
            ...styles.fab,
            backgroundColor: '#0052cc',
          }}
          small
          icon="plus"
          color="white"
          onPress={() => {
            navegar.navigate("Ingresar Propuesta");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    width: '100%',
    backgroundColor: '#0052cc'
  },
  cont_redondo: {
    marginTop: 15,
    padding: 10,
    height: '98%',
    backgroundColor: '#f3f6fc',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    borderWidth: 0,
    borderColor: coloresTextos[4],
    borderRadius: 30,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff'
  },
  input: {
    flex: 1,
    color: coloresTextos[4],
    marginLeft: 10,
    fontSize: 16
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    color: "white",
  },
});

export default Propuestas;
