import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Asegúrate de importar MaterialCommunityIcons o la librería de iconos que estás utilizando
import DateTimePicker from '@react-native-community/datetimepicker';

function DatePickerComponent({ formData, setFormData, errors }) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, date) => {
    if (event.type === 'set') {
      setFormData({ ...formData, fecha_nacimiento: date });
    }
    setShowDatePicker(false);
  };

  return (
    <>
      <View>
        <TouchableOpacity
          style={{ ...styles.inputContainer, flexDirection: 'row', alignItems: 'center' }}
          onPress={() => setShowDatePicker(true)}
        >
          <MaterialCommunityIcons name="calendar" size={26} color="#0052cc" style={{ marginRight: 10 }} />
          <TextInput
            style={styles.input}
            placeholder="Fecha de Nacimiento"
            value={formData.fecha_nacimiento ? formData.fecha_nacimiento.toDateString() : 'Fecha de Nacimiento'}
            editable={false}
          />
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={formData.fecha_nacimiento || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>
      {errors.fecha_nacimiento ? <Text style={{ color: 'red' }}>{errors.fecha_nacimiento}</Text> : null}
    </>
  );
}

const styles = StyleSheet.create({
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

export default DatePickerComponent;
