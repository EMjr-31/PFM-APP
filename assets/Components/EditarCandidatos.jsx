import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, TextInput, Image, ScrollView, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Modal from 'react-native-modal'; // Importa Modal desde "react-native-modal"

import { Btn } from './btn';
const EditarCandidatos = () => {
    const route = useRoute();
    const { id } = route.params;
    const [candidato, setCandidato] = useState(null);
    const [candidatoCopia, setCandidatoCopia] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditable, setIsEditable] = useState(false);

    const [isModalVisible, setModalVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
  
    useEffect(() => {
      // Realiza una solicitud a la API para obtener los detalles del candidato
      fetch(`http://147.182.249.91/api/candidatos/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setCandidato(data);
          setCandidatoCopia(data);
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
      setCandidato(candidatoCopia)
    };
  
    
    const handleSave = () => {
      if (
        !candidato.nombre_candidato ||
        !candidato.fecha_nacimiento ||
        !candidato.telefono ||
        !candidato.correo_electronico ||
        !candidato.residencia
      ) {
        // Mostrar un mensaje de error en la modal
        setErrorMessage('Complete todos los campos');
        setModalVisible(true);
      } else {
        // Realiza una solicitud a la API para guardar los cambios en el candidato
        fetch(`http://147.182.249.91/api/candidatos/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(candidato),
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
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="key-outline" size={26} color="#0052cc" />
          <TextInput
            style={styles.input}
            placeholder="ID"
            value={candidato.id.toString()}
            editable={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="account" size={26} color="#0052cc" />
          <TextInput
            style={styles.input}
            placeholder="Nombre del Candidato"
            value={candidato.nombre_candidato}
            onChangeText={(text) => setCandidato({ ...candidato, nombre_candidato: text })}
            editable={isEditable}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="calendar" size={26} color="#0052cc" />
          <TextInput
            style={styles.input}
            placeholder="Fecha de Nacimiento"
            value={candidato.fecha_nacimiento}
            onChangeText={(text) => setCandidato({ ...candidato, fecha_nacimiento: text })}
            editable={isEditable}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="phone" size={26} color="#0052cc" />
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            value={candidato.telefono}
            onChangeText={(text) => setCandidato({ ...candidato, telefono: text })}
            editable={isEditable}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="email" size={26} color="#0052cc" />
          <TextInput
            style={styles.input}
            placeholder="Correo Electrónico"
            value={candidato.correo_electronico}
            onChangeText={(text) => setCandidato({ ...candidato, correo_electronico: text })}
            editable={isEditable}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="home" size={26} color="#0052cc" />
          <TextInput
            style={styles.input}
            placeholder="Residencia"
            value={candidato.residencia}
            onChangeText={(text) => setCandidato({ ...candidato, residencia: text })}
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

export default EditarCandidatos;
