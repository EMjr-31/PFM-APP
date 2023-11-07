import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, DatePickerAndroid, Button } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Btn} from './btn';
import Modal from 'react-native-modal'; // Importa Modal desde "react-native-modal"
import DatePickerComponente from './DatePickerComponente';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'; // Importa moment


const Formulario = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleDateChange = (event, date) => {
    if (event.type === 'set') {
      // Comprueba si date es una instancia de Date
      if (date instanceof Date) {
        setFormData({ ...formData, fecha_nacimiento: date });
      }
    }
    setShowDatePicker(false);
  };
  
  

  const [formData, setFormData] = useState({
    nombre_candidato: '',
    fecha_nacimiento: null, // Inicializa como null
    telefono: '', 
    correo_electronico: '',
    residencia: '',
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
    if (!formData.nombre_candidato) {
      validationErrors.nombre_candidato = 'Nombre del candidato es requerido';
    }
    if (!formData.fecha_nacimiento) {
      validationErrors.fecha_nacimiento = 'Fecha de nacimiento es requerida';
    }
    if (!formData.telefono) {
      validationErrors.telefono = 'Teléfono es requerido';
    }
    if (!formData.correo_electronico || !/^\S+@\S+\.\S+(\.\S+)?$/.test(formData.correo_electronico)) {
      validationErrors.correo_electronico = 'Correo electrónico debe tener un formato válido';
    }
    console.log(formData)
    if (Object.keys(validationErrors).length === 0) {
      // Formatea la fecha antes de enviarla
      formData.fecha_nacimiento = moment(formData.fecha_nacimiento).format('YYYY-MM-DD');
      console.log(formData.fecha_nacimiento)
      // Realiza la solicitud POST a la API
      try {
        const response = await fetch('http://147.182.249.91/api/candidatos', {
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
        console.error('Error de solicitud:', error);
        setErrors({ general: 'Error al enviar el formulario' });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const clearForm = () => {
    setFormData({
      nombre_candidato: '',
      fecha_nacimiento: '',
      telefono: '',
      correo_electronico: '',
      residencia: '',
    });
  };

  return (
    <View style={{ ...styles.contenedor }}>
      <View style={styles.cont_redondo}>
        <View style={{ ...styles.inputContainer, flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons name="account" size={26} color="#0052cc" style={{ marginRight: 10 }} />
          <TextInput
            style={styles.input}
            placeholder="Nombre del Candidato"
            value={formData.nombre_candidato}
            onChangeText={(text) => setFormData({ ...formData, nombre_candidato: text })}
          />
        </View>
        {errors.nombre_candidato ? <Text style={{ color: 'red' }}>{errors.nombre_candidato}</Text> : null}

        <View>
        <TouchableOpacity
          style={{ ...styles.inputContainer, flexDirection: 'row', alignItems: 'center' }}
          onPress={() => setShowDatePicker(true)}
        >
          <MaterialCommunityIcons name="calendar" size={26} color="#0052cc" style={{ marginRight: 10 }} />
          <TextInput
              style={styles.input}
              placeholder="Fecha de Nacimiento"
              value={formData.fecha_nacimiento ? moment(formData.fecha_nacimiento).format('YYYY-MM-DD') : 'Fecha de Nacimiento'}
              editable={false}
            />
        </TouchableOpacity>
        {errors.fecha_nacimiento ? <Text style={{ color: 'red' }}>{errors.fecha_nacimiento}</Text> : null}
        {showDatePicker && (
          <DateTimePicker
            value={formData.fecha_nacimiento || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>

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
            placeholder="Residencia"
            value={formData.residencia}
            onChangeText={(text) => setFormData({ ...formData, residencia: text })}
          />
        </View>

        <Btn
          onPress={handleSubmit}
          texto="Registrar"
          color="1"
          colorTexto="11"
        />

        <Modal isVisible={isModalVisible}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
              <Text>{successMessage || errors.general}</Text>
              <Btn
                onPress={toggleModal}
                texto="Cerrar"
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
    backgroundColor: '#0052cc',
  },
  cont_redondo: {
    marginTop: 15,
    padding: 10,
    height: '100%',
    backgroundColor: '#f3f6fc',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
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
    height: 20,
    fontSize: 18,
    marginLeft: 15,
  },
});

export default Formulario;