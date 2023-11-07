import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import { Btn } from './btn';
import { useNavigation } from "@react-navigation/native";
import { CardRegistro } from "./CardRegistro";
import { FAB } from 'react-native-paper'; // Importa FAB de react-native-paper
import { coloresTextos } from "./ColoresTextos";
import { colores } from "./Colores";
import { MaterialCommunityIcons } from '@expo/vector-icons';


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
       <View style={styles.cont_redondo}>
            <View style={styles.inputContainer}>
                <TextInput
                style={{
                    ...styles.input,
                    color: coloresTextos[4]
                }}
                placeholder="Buscar por nombre de empresa"
                value={filtroNombre}
                onChangeText={(text) => setFiltroNombre(text)}
                />
                <MaterialCommunityIcons
                name="magnify" // Nombre del ícono de lupa
                size={30} // Tamaño del ícono
                color={colores[2]} // Color del ícono
                />
            </View>
            <ScrollView>
                {filteredClientes.map((cliente, index) => (
                <CardRegistro
                    key={index}
                    onPress={()=>navegar.navigate("Editar Cliente", {id:cliente.id})}
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
                    backgroundColor: '#0052cc',
                    }}
                small
                icon="plus"
                color="white"
                onPress={() => { navegar.navigate("Ingresar Clientes")
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
    backgroundColor:'#f3f6fc',
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

export default Clientes;
