import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import { Btn } from './btn';
import { useNavigation } from "@react-navigation/native";
import { CardRegistro } from "./CardRegistro";
import { FAB } from 'react-native-paper'; // Importa FAB de react-native-paper
import { coloresTextos } from "./ColoresTextos";
import { colores } from "./Colores";
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Candidatos = () => {
    const navegar = useNavigation();
    const [candidatos, setCandidatos] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState("");

  useEffect(() => {
    // Realiza una solicitud a la API para obtener los datos
    fetch("http://147.182.249.91/api/candidatos")
      .then(response => response.json())
      .then(data => {
        // Mapea los datos para mostrar solo el nombre del candidato
        const mappedCandidatos = data.map(candidato => ({
          id: candidato.id,
          nombre: candidato.nombre_candidato,
          residencia:candidato.residencia
        }));
        setCandidatos(mappedCandidatos);
      })
      .catch(error => console.error(error));
  }, []);
  
  const filteredCandidatos = candidatos.filter(candidato => {
    return candidato.nombre.toLowerCase().includes(filtroNombre.toLowerCase());
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
            placeholder="Buscar por nombre de candidato"
            value={filtroNombre}
            onChangeText={(text) => setFiltroNombre(text)}
          />
          <MaterialCommunityIcons
            name="magnify"
            size={30}
            color={colores[2]}
          />
        </View>
        <ScrollView>
          {filteredCandidatos.map((candidato, index) => (
            <CardRegistro
              key={index}
              onPress={() => navegar.navigate("Editar Candidato", { id: candidato.id })}
              titulo={candidato.nombre}
              color="11"
              colorTexto="4"
              icono="account-box-outline" 
              // Puedes mostrar más información del candidato aquí
              subtitulo={`Residencia: ${candidato.residencia}`}
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
            navegar.navigate("Ingresar Candidato");
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
    backgroundColor:'#0052cc'
  },
  cont_redondo:{
    marginTop:15,
    padding: 10,
    height:'98%',
    backgroundColor:'#fff',
    borderTopRightRadius:25,
    borderTopLeftRadius:25
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height:60,
    borderWidth: 0,
    borderColor: coloresTextos[4],
    borderRadius: 30,
    padding: 10,
    marginBottom: 10,
    backgroundColor:'#fff'
  },
  input: {
    flex: 1,
    color: coloresTextos[4],
    marginLeft: 10,
    fontSize:16
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    color:"white",
  },
});

export default Candidatos;
