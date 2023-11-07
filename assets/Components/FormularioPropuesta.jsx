import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Btn} from './btn';
import Modal from 'react-native-modal'; // Importa Modal desde "react-native-modal"
import moment from 'moment'; // Importa moment

const Formulario = () => {
  const [formData, setFormData] = useState({
    nombre_empresa: '',
    rubro: '',
    nombre_contacto: '',
    telefono: '',
    correo_electronico: '',
    ubicacion: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSubmit = async () => {
    const validationErrors = {};

    // Validación de campos
    if (!formData.nombre_empresa) {
      validationErrors.nombre_empresa = 'Nombre de la empresa es requerido';
    }
    if (!formData.rubro) {
      validationErrors.rubro = 'Rubro es requerido';
    }
    if (!formData.nombre_contacto) {
      validationErrors.nombre_contacto = 'Nombre del contacto es requerido';
    }
    if (!formData.telefono || !/^\d{8}$/.test(formData.telefono)) {
      validationErrors.telefono = 'Teléfono debe ser un número de 8 dígitos';
    }
    if (!formData.correo_electronico || !/^\S+@\S+\.\S+(\.\S+)?$/.test(formData.correo_electronico)) {
      validationErrors.correo_electronico = 'Correo electrónico debe tener un formato válido';
    }

    if (Object.keys(validationErrors).length === 0) {
      // Formatea la fecha antes de enviarla
      formData.fecha_nacimiento = moment(formData.fecha_nacimiento).format('YYYY-MM-DD');
      // Realiza la solicitud POST a la API
      try {
        const response = await fetch('http://147.182.249.91/api/clientes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.status === 201) {
          setSuccessMessage('Formulario enviado exitosamente');
          setErrors({});
          toggleModal();
          clearForm();
        } else {
          setErrors({ general: 'Error al enviar el formulario' });
        }
      } catch (error) {
        setErrors({ general: 'Error al enviar el formulario' });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const clearForm = () => {
    setFormData({
      nombre_empresa: '',
      rubro: '',
      nombre_contacto: '',
      telefono: '',
      correo_electronico: '',
      ubicacion: '',
    });
  };

  return (
    <View style={{...styles.contenedor}}>
      <View style={styles.cont_redondo}>
      <View style={{ ...styles.inputContainer, flexDirection: 'row', alignItems: 'center' }}>
        <MaterialCommunityIcons name="domain" size={26} color="#0052cc" style={{ marginRight: 10 }} />
        <TextInput
          style={styles.input}
          placeholder="Nombre de la Empresa"
          value={formData.nombre_empresa}
          onChangeText={(text) => setFormData({ ...formData, nombre_empresa: text })}
        />
      </View>
      {errors.nombre_empresa ? <Text style={{ color: 'red' }}>{errors.nombre_empresa}</Text> : null}
  
      <View style={{ ...styles.inputContainer, flexDirection: 'row', alignItems: 'center' }}>
        <MaterialCommunityIcons name="briefcase" size={26} color="#0052cc" style={{ marginRight: 10 }} />
        <TextInput
          style={styles.input}
          placeholder="Rubro"
          value={formData.rubro}
          onChangeText={(text) => setFormData({ ...formData, rubro: text })}
        />
      </View>
      {errors.rubro ? <Text style={{ color: 'red' }}>{errors.rubro}</Text> : null}
  
      <View style={{ ...styles.inputContainer, flexDirection: 'row', alignItems: 'center' }}>
        <MaterialCommunityIcons name="account" size={26} color="#0052cc" style={{ marginRight: 10 }} />
        <TextInput
          style={styles.input}
          placeholder="Nombre del Contacto"
          value={formData.nombre_contacto}
          onChangeText={(text) => setFormData({ ...formData, nombre_contacto: text })}
        />
      </View>
      {errors.nombre_contacto ? <Text style={{ color: 'red' }}>{errors.nombre_contacto}</Text> : null}
  
      <View style={{ ...styles.inputContainer, flexDirection: 'row', alignItems: 'center' }}>
        <MaterialCommunityIcons name="phone" size={26} color="#0052cc" style={{ marginRight: 10 }} />
        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          value={formData.telefono}
          onChangeText={(text) => setFormData({ ...formData, telefono: text })}
        />
      </View>
      {errors.telefono ? <Text style={{ color: 'red' }}>{errors.telefono}</Text> : null}
  
      <View style={{ ...styles.inputContainer, flexDirection: 'row', alignItems: 'center' }}>
        <MaterialCommunityIcons name="email" size={26} color="#0052cc" style={{ marginRight: 10 }} />
        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          value={formData.correo_electronico}
          onChangeText={(text) => setFormData({ ...formData, correo_electronico: text })}
        />
      </View>
      {errors.correo_electronico ? <Text style={{ color: 'red' }}>{errors.correo_electronico}</Text> : null}
  
      <View style={{ ...styles.inputContainer, flexDirection: 'row', alignItems: 'center' }}>
        <MaterialCommunityIcons name="map-marker" size={26} color="#0052cc" style={{ marginRight: 10 }} />
        <TextInput
          style={styles.input}
          placeholder="Ubicación"
          value={formData.ubicacion}
          onChangeText={(text) => setFormData({ ...formData, ubicacion: text })}
        />
      </View>
      <Btn
        onPress={handleSubmit}
        texto='Registrar'
        color="1"
        colorTexto="11"
      />
       {errors.general ? <Text style={{ color: 'red' }}>{errors.general}</Text> : null}
  
      <Modal isVisible={isModalVisible}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
            <Text>{successMessage || errors.general}</Text>
            <Btn
              onPress={toggleModal}
              texto='Cerrar'
              color="1"
              colorTexto="11"
            />
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
    height: '100%',
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
export default Formulario;