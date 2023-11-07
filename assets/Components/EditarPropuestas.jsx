import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, TextInput, Image, ScrollView, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ModalDropdown from 'react-native-modal-dropdown';
import Modal from 'react-native-modal'; // Importa Modal desde "react-native-modal"


import { Btn } from './btn';
const EditarPropuestas = () => {
  const route = useRoute();
  const { id } = route.params;
  const [propuesta, setPropuesta] = useState(null);
  const [cliente, setCliente] = useState(null);
  const [propuestaCopia, setPropuestaCopia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditable, setIsEditable] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    // Realiza una solicitud a la API para obtener los detalles de la propuesta
    fetch(`http://147.182.249.91/api/propuestas/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPropuesta(data);
        setPropuestaCopia(data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [id]);

  useEffect(() => {
    // Realiza una solicitud a la API para obtener los detalles del cliente
    fetch('http://147.182.249.91/api/clientes')
      .then((response) => response.json())
      .then((data) => {
        // Supongamos que el cliente que necesitas tiene un ID específico, por ejemplo, 11
        const cliente = data.find((cliente) => cliente.id === 11);
  
        // Aquí puedes almacenar el cliente en el estado si lo necesitas
        setCliente(cliente);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleEdit = () => {
    setIsEditable(true);
    console.log("Editar presionado");
  };

  const handleCancel = () => {
    setIsEditable(false);
    setPropuesta(propuestaCopia);
  };

  const handleSave = () => {
    if (
      !propuesta.FechaEnvioPropuesta ||
      !propuesta.TipoPropuestaEnviada ||
      !propuesta.MontoPropuesta ||
      !propuesta.Descuento ||
      !propuesta.EstadoPropuesta
    ) {
      // Mostrar un mensaje de error en la modal
      setErrorMessage('Complete todos los campos');
      setModalVisible(true);
    } else {
      // Realiza una solicitud a la API para guardar los cambios en la propuesta
      fetch(`http://147.182.249.91/api/propuestas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(propuesta),
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
      <ScrollView>
      <View style={styles.cont_redondo}>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="key-outline" size={26} color="#0052cc" />
          <TextInput
            style={styles.input}
            placeholder="ID"
            value={propuesta.id.toString()}
            editable={false}
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="shuffle-disabled" size={26} color="#0052cc" />
          <TextInput
            style={styles.input}
            placeholder="Tipo de Propuesta"
            value={propuesta.TipoPropuestaEnviada}
            onChangeText={(text) => setPropuesta({ ...propuesta, TipoPropuestaEnviada: text })}
            editable={isEditable}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="office-building" size={26} color="#0052cc" />
          <TextInput
            style={styles.input}
            placeholder="Estado de la Propuesta"
            value={propuesta.cliente.nombre_empresa}
            //onChangeText={(text) => setPropuesta({ ...propuesta, EstadoPropuesta: text })}
            editable={false}
          />
        </View>
        
        
        <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="card-text-outline" size={26} color="#0052cc" />
        {isEditable ? (
          <ModalDropdown
            options={['Pendiente', 'En Proceso', 'Ganada','Perdida', 'Otro' /* Agrega más opciones */]}
            defaultValue={propuesta.EstadoPropuesta}
            onSelect={(index, value) => {
              setPropuesta({ ...propuesta, EstadoPropuesta: value });
            }}
            renderButtonText={(text) => {
              return (
                <Text style={styles.input}>{text}</Text>
              );
            }}
            dropdownStyle={styles.dropdownStyle}
          />
        ) : (
          <TextInput
            style={styles.input}
            placeholder="Estado de la Propuesta"
            value={propuesta.EstadoPropuesta}
            editable={false}
          />
        )}
      </View>


        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="calendar" size={26} color="#0052cc" />
          <TextInput
            style={styles.input}
            placeholder="Fecha de Envío"
            value={propuesta.FechaEnvioPropuesta}
            onChangeText={(text) => setPropuesta({ ...propuesta, FechaEnvioPropuesta: text })}
            editable={isEditable}
          />
        </View>

        

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="currency-usd" size={26} color="#0052cc" />
          <TextInput
            style={styles.input}
            placeholder="Monto de la Propuesta"
            value={propuesta.MontoPropuesta}
            onChangeText={(text) => setPropuesta({ ...propuesta, MontoPropuesta: text })}
            editable={isEditable}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="percent" size={26} color="#0052cc" />
          <TextInput
            style={styles.input}
            placeholder="Descuento"
            value={propuesta.Descuento}
            onChangeText={(text) => setPropuesta({ ...propuesta, Descuento: text })}
            editable={isEditable}
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="clock" size={26} color="#0052cc" />
          <TextInput
            style={styles.input}
            placeholder="Fecha Actualización Seguimiento"
            value={propuesta.FechaActualizacionSeguimiento}
            onChangeText={(text) => setPropuesta({ ...propuesta, FechaActualizacionSeguimiento: text })}
            editable={isEditable}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="comment" size={26} color="#0052cc" />
          <TextInput
            style={styles.input}
            placeholder="Comentarios Seguimiento"
            value={propuesta.ComentariosSeguimiento}
            onChangeText={(text) => setPropuesta({ ...propuesta, ComentariosSeguimiento: text })}
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
      </ScrollView>
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
  },dropdownStyle:{
    fontSize:20
  }
});

export default EditarPropuestas;
