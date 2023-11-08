import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, DatePickerAndroid, Button } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Btn} from './btn';
import Modal from 'react-native-modal'; // Importa Modal desde "react-native-modal"
import DatePickerComponente from './DatePickerComponente';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'; // Importa moment

const FormularioPropuesta = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [formData, setFormData] = useState({
    FechaEnvioPropuesta: null, // Cambiado a undefined
    UsuarioEjecutivoComercialID: 1,
    ClienteID: '',
    TipoPropuestaEnviada: '',
    MontoPropuesta: '',
    Descuento: '',
    EstadoPropuesta: 'Pendiente',
    FechaActualizacionSeguimiento: null,
    ComentariosSeguimiento: 'Sin Seguimientos',
  });;

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleDateChange = (event, date) => {
    if (event.type === 'set') {
      if (date instanceof Date) {
        setFormData({ ...formData, FechaEnvioPropuesta: date });
      }
      setShowDatePicker(false);
    }
  };

  const handleSubmit = async () => {
    const validationErrors = {};

    if (!formData.FechaEnvioPropuesta) {
      validationErrors.FechaEnvioPropuesta = 'Fecha de envío de propuesta es requerida';
    }
  
    if (!formData.ClienteID) {
      validationErrors.ClienteID = 'Cliente ID es requerido';
    }
  
    if (!formData.TipoPropuestaEnviada) {
      validationErrors.TipoPropuestaEnviada = 'Tipo de Propuesta Enviada es requerido';
    }
  
    if (!formData.MontoPropuesta) {
      validationErrors.MontoPropuesta = 'Monto de Propuesta es requerido';
    }
  
    if (!formData.Descuento) {
      validationErrors.Descuento = 'Descuento es requerido';
    } 

    if (Object.keys(validationErrors).length === 0) {
      // Formatea la fecha antes de enviarla
      formData.FechaEnvioPropuesta = moment(formData.FechaEnvioPropuesta).format('YYYY-MM-DD');
      formData.FechaActualizacionSeguimiento = moment(formData.FechaEnvioPropuesta).format('YYYY-MM-DD');

      console.log(formData)
      try {
        const response = await fetch('http://147.182.249.91/api/propuestas', {
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
      FechaEnvioPropuesta: null,
      UsuarioEjecutivoComercialID: null,
      ClienteID: null,
      TipoPropuestaEnviada: '',
      MontoPropuesta: '',
      Descuento: '',
      EstadoPropuesta: '',
      FechaActualizacionSeguimiento: null,
      ComentariosSeguimiento: '',
    });
  };

  return (
    <View style={{ ...styles.contenedor }}>
      <View style={styles.cont_redondo}>
        <View>
          <TouchableOpacity
            style={{ ...styles.inputContainer, flexDirection: 'row', alignItems: 'center' }}
            onPress={() => setShowDatePicker(true)}
          >
            <MaterialCommunityIcons name="calendar" size={26} color="#0052cc" style={{ marginRight: 10 }} />
            <TextInput
              style={styles.input}
              placeholder="Fecha de Envío de Propuesta"
              value={formData.FechaEnvioPropuesta ? moment(formData.FechaEnvioPropuesta).format('YYYY-MM-DD') : 'Fecha de Envío de Propuesta'}
              
            />
          </TouchableOpacity>
          {errors.FechaEnvioPropuesta ? <Text style={{ color: 'red' }}>{errors.FechaEnvioPropuesta}</Text> : null}
          {showDatePicker && (
            <DateTimePicker
              value={formData.FechaEnvioPropuesta || new Date()}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>
        <View style={{ ...styles.inputContainer, flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons name="office-building" size={26} color="#0052cc" style={{ marginRight: 10 }} />
          <TextInput
            style={styles.input}
            placeholder="Cliente ID"
            value={formData.ClienteID ? String(formData.ClienteID) : ''}
            onChangeText={(text) => setFormData({ ...formData, ClienteID: text })}
          />
        </View>
        {errors.ClienteID ? <Text style={{ color: 'red' }}>{errors.ClienteID}</Text> : null}
        <View style={{ ...styles.inputContainer, flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons name="shuffle-disabled" size={26} color="#0052cc" style={{ marginRight: 10 }} />
          <TextInput
            style={styles.input}
            placeholder="Tipo de Propuesta Enviada"
            value={formData.TipoPropuestaEnviada}
            onChangeText={(text) => setFormData({ ...formData, TipoPropuestaEnviada: text })}
          />
        </View>
        {errors.TipoPropuestaEnviada ? <Text style={{ color: 'red' }}>{errors.TipoPropuestaEnviada}</Text> : null}
        <View style={{ ...styles.inputContainer, flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons name="currency-usd" size={26} color="#0052cc" style={{ marginRight: 10 }} />
          <TextInput
            style={styles.input}
            placeholder="Monto de Propuesta"
            value={formData.MontoPropuesta}
            onChangeText={(text) => setFormData({ ...formData, MontoPropuesta: text })}
          />
        </View>
        {errors.MontoPropuesta ? <Text style={{ color: 'red' }}>{errors.MontoPropuesta}</Text> : null}
        <View style={{ ...styles.inputContainer, flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons name="percent" size={26} color="#0052cc" style={{ marginRight: 10 }} />
          <TextInput
            style={styles.input}
            placeholder="Descuento"
            value={formData.Descuento}
            onChangeText={(text) => setFormData({ ...formData, Descuento: text })}
          />
        </View>
        {errors.Descuento ? <Text style={{ color: 'red' }}>{errors.Descuento}</Text> : null}
        <Btn
          onPress={handleSubmit}
          texto="Enviar Propuesta"
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

export default FormularioPropuesta;