import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, TextInput, Image, ScrollView, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Modal from 'react-native-modal'; // Importa Modal desde "react-native-modal"

import { Btn } from './btn';
const EditarSeguimientos = () => {
  const route = useRoute();
  const { id } = route.params;
  const [plaza, setPlaza] = useState(null);
  const [plazaCopia, setPlazaCopia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditable, setIsEditable] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    // Realiza una solicitud a la API para obtener los detalles de la plaza de trabajo
    fetch(`http://147.182.249.91/api/plazas-trabajo/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPlaza(data);
        setPlazaCopia(data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [id]);

  const handleEdit = () => {
    setIsEditable(true);
    console.log("Editar presionado");
  };

  const handleCancel = () => {
    setIsEditable(false);
    setPlaza(plazaCopia);
  };

  const handleSave = () => {
    if ( !plaza.nombre_plaza ||
      !plaza.salario ) {
      // Mostrar un mensaje de error en la modal
      setErrorMessage('Complete todos los campos');
      setModalVisible(true);
    } else {
      // Realiza una solicitud a la API para guardar los cambios en la plaza de trabajo
      fetch(`http://147.182.249.91/api/plazas-trabajo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(plaza),
      })
        .then((response) => response.json())
        .then((data) => {
          setIsEditable(false);
          setSuccessMessage('Cambios guardados con éxito');
          setModalVisible(true);
        })
        .catch((error) => console.error(error));
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0052cc" />
      </View>
    );
  }

  return (
    <View style={styles.contenedor}>
      <View style={styles.cont_redondo}>
        <ScrollView>
            
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="key-outline" size={26} color="#0052cc" />
          <TextInput
            style={styles.input}
            placeholder="ID"
            value={plaza.id.toString()}
            editable={false}
          />
        </View>
  
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="account" size={26} color="#0052cc" />
          <TextInput
            style={styles.input}
            placeholder="Nombre de la Plaza"
            value={plaza.nombre_plaza}
            onChangeText={(text) => setPlaza({ ...plaza, nombre_plaza: text })}
            editable={false}
          />
        </View>
  
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="currency-usd" size={26} color="#0052cc" />
          <TextInput
            style={styles.input}
            placeholder="Salario"
            value={plaza.salario}
            onChangeText={(text) => setPlaza({ ...plaza, salario: text })}
            editable={isEditable}
          />
        </View>
  
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="calendar" size={26} color="#0052cc" />
          <TextInput
            style={styles.input}
            placeholder="Fecha de Recepción"
            value={plaza.fecha_recepcion_validacion_perfil}
            onChangeText={(text) => setPlaza({ ...plaza, fecha_recepcion_validacion_perfil: text })}
            editable={isEditable}
          />
        </View>
  
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="numeric" size={26} color="#0052cc" />
          <TextInput
            style={styles.input}
            placeholder="Cantidad Solicitada"
            value={plaza.cantidad_solicitada.toString()}
            onChangeText={(text) => setPlaza({ ...plaza, cantidad_solicitada: text })}
            editable={isEditable}
          />
        </View>
  
        {/* Agrega más campos para otros atributos de la plaza según tu API */}
        
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="calendar-clock" size={26} color="#0052cc" />
          <TextInput
            style={styles.input}
            placeholder="Fecha de Modificación"
            value={plaza.fecha_modificacion_perfil}
            onChangeText={(text) => setPlaza({ ...plaza, fecha_modificacion_perfil: text })}
            editable={isEditable}
          />
        </View>
  
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="calendar-text" size={26} color="#0052cc" />
          <TextInput
            style={styles.input}
            placeholder="Fecha de Publicación"
            value={plaza.fecha_publicacion_perfil}
            onChangeText={(text) => setPlaza({ ...plaza, fecha_publicacion_perfil: text })}
            editable={isEditable}
          />
        </View>
  
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="card-text-outline" size={26} color="#0052cc" />
          <TextInput
            style={styles.input}
            placeholder="Estatus"
            value={plaza.estatus}
            onChangeText={(text) => setPlaza({ ...plaza, estatus: text })}
            editable={isEditable}
          />
        </View>
  
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="calendar-remove" size={26} color="#0052cc" />
          <TextInput
            style={styles.input}
            placeholder="Fecha de Finalización"
            value={plaza.fecha_finalizacion}
            onChangeText={(text) => setPlaza({ ...plaza, fecha_finalizacion: text })}
            editable={isEditable}
          />
        </View>
  
        {!isEditable ? (
          <View style={styles.editButtons}>
            <Btn onPress={handleEdit} texto='Editar' color="2" colorTexto="10" />
          </View>
        ) : (
          <View style={styles.editButtons}>
            <Btn onPress={handleSave} texto='Guardar' color="2" colorTexto="10" />
            <View style={styles.buttonSpacing}></View>
            <Btn onPress={handleCancel} texto='Cancelar' color="6" colorTexto="10" />
          </View>
        )}
  
        {/* Ventana modal */}
        <Modal isVisible={isModalVisible}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
              <Text>{successMessage || errorMessage}</Text>
              <Btn onPress={toggleModal} texto='Cerrar' color="1" colorTexto="11" />
            </View>
          </View>
        </Modal>
        </ScrollView>
      </View>
    </View>
  );
  }
  

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
    borderColor: '#f3f6fc',
    backgroundColor: '#fff',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 100,
  },
  input: {
    flex: 1,
    height:20,
    fontSize: 18,
    marginLeft: 15
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonSpacing: {
    height:5, // Separate the "Cancelar" button from the "Guardar" button
  },
});

export default EditarSeguimientos;
