import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import { Btn } from './btn';
import { useNavigation } from "@react-navigation/native";
import { CardRegistro } from "./CardRegistro";
import { FAB } from 'react-native-paper'; // Importa FAB de react-native-paper
import { coloresTextos } from "./ColoresTextos";
import { colores } from "./Colores";

const Clientes = () => {
  const navegar = useNavigation();
  const [clientes, setClientes] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState("");

  useEffect(() => {
    // Realiza una solicitud a la API para obtener los datos
    fetch("http://147.182.249.91/api/clientes")
      .then(response => response.json())
      .then(data => {
        // Mapea los datos para mostrar solo el id, nombre y el rubro
        const mappedClientes = data.map(cliente => ({
          id: cliente.id,
          nombre: cliente.nombre_empresa,
          rubro: cliente.rubro,
        }));
        setClientes(mappedClientes);
      })
      .catch(error => console.error(error));
  }, []);

  const filteredClientes = clientes.filter(cliente => {
    return cliente.nombre.toLowerCase().includes(filtroNombre.toLowerCase());
  });

  return (
    <View style={styles.contenedor}>
      <TextInput
        style={{
            ...styles.input,
            color: coloresTextos[4]
        }}
        placeholder="Buscar por nombre de empresa"
        value={filtroNombre}
        onChangeText={(text) => setFiltroNombre(text)}
      />
      <ScrollView>
        {filteredClientes.map((cliente, index) => (
          <CardRegistro
            key={index}
            onPress={() => {
              alert(cliente.id);
            }}
            titulo={cliente.nombre}
            color="11"
            colorTexto="4"
            icono="office-building"
            subtitulo={cliente.rubro}
          />
        ))}
      </ScrollView>
      <FAB
        style={{ 
            ...styles.fab,
             backgroundColor: colores[8],
            }}
        small
        icon="plus"
        onPress={() => { navegar.navigate("Ingresar Clientes")
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 10,
    width: '100%',
  },
  input: {
    height: 60,
    borderWidth: 0,
    marginBottom: 10,
    borderRadius: 30,
    padding: 18,
    backgroundColor: '#fff'
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    color:"white"
  },
});

export default Clientes;
