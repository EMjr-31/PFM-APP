import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import {Btn} from './btn';
import Modal from 'react-native-modal'; // Importa Modal desde "react-native-modal"

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
      // Realiza la solicitud POST a la API
      try {
        const response = await fetch('http://147.182.249.91/api/clientes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre_empresa: formData.nombre_empresa,
            rubro: formData.rubro,
            nombre_contacto: formData.nombre_contacto,
            telefono: formData.telefono,
            correo_electronico: formData.correo_electronico,
            ubicacion: formData.ubicacion,
          }),
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
    <View style={{ padding: 16 }}>
        
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <FontAwesome5 name="building" size={24} color="#333" style={{ marginRight: 10 }} />
        <TextInput
          placeholder="Nombre de la Empresa"
          value={formData.nombre_empresa}
          onChangeText={(text) => setFormData({ ...formData, nombre_empresa: text })}
          style={{ flex: 1, height: 40 }}
        />
      </View>
      {errors.nombre_empresa ? <Text style={{ color: 'red' }}>{errors.nombre_empresa}</Text> : null}

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <FontAwesome5 name="industry" size={24} color="#333" style={{ marginRight: 10 }} />
        <TextInput
          placeholder="Rubro"
          value={formData.rubro}
          onChangeText={(text) => setFormData({ ...formData, rubro: text })}
          style={{ flex: 1, height: 40 }}
        />
      </View>
      {errors.rubro ? <Text style={{ color: 'red' }}>{errors.rubro}</Text> : null}

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <FontAwesome5 name="user" size={24} color="#333" style={{ marginRight: 10 }} />
        <TextInput
          placeholder="Nombre del Contacto"
          value={formData.nombre_contacto}
          onChangeText={(text) => setFormData({ ...formData, nombre_contacto: text })}
          style={{ flex: 1, height: 40 }}
        />
      </View>
      {errors.nombre_contacto ? <Text style={{ color: 'red' }}>{errors.nombre_contacto}</Text> : null}

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <FontAwesome5 name="phone" size={24} color="#333" style={{ marginRight: 10 }} />
        <TextInput
          placeholder="Teléfono"
          value={formData.telefono}
          onChangeText={(text) => setFormData({ ...formData, telefono: text })}
          style={{ flex: 1, height: 40 }}
        />
      </View>
      {errors.telefono ? <Text style={{ color: 'red' }}>{errors.telefono}</Text> : null}

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <FontAwesome5 name="envelope" size={24} color="#333" style={{ marginRight: 10 }} />
        <TextInput
          placeholder="Correo Electrónico"
          value={formData.correo_electronico}
          onChangeText={(text) => setFormData({ ...formData, correo_electronico: text })}
          style={{ flex: 1, height: 40 }}
        />
      </View>
      {errors.correo_electronico ? <Text style={{ color: 'red' }}>{errors.correo_electronico}</Text> : null}

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <FontAwesome5 name="map-marker-alt" size={24} color="#333" style={{ marginRight: 10 }} />
        <TextInput
          placeholder="Ubicación"
          value={formData.ubicacion}
          onChangeText={(text) => setFormData({ ...formData, ubicacion: text })}
          style={{ flex: 1, height: 40 }}
        />
      </View>
      <Btn
        onPress={handleSubmit}
        texto='Registrar'
        color="1"
        colorTexto="11"
      />

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
  );
};
export default Formulario;