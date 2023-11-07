import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView ,SafeAreaView} from 'react-native';
import { Btn } from './btn';

const RegistroPantalla = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');

  const handleRegistration = () => {
    // Aquí puedes agregar la lógica de registro, como validar los datos y enviarlos a un servidor.
    alert('Registro exitoso');
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.cont_logo}>
        <Image
          source={require('../img/LogoPFC.png')}
          style={styles.cont_logo_img}
        />
      </View>
      <View style={styles.cont_textos}>
        <Text style={styles.cont_textos_titulo}>Registro</Text>
        <Text style={styles.cont_textos_subtitulo}>Ingrese sus Credenciales</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Verificar contraseña"
        secureTextEntry={true}
        value={verifyPassword}
        onChangeText={(text) => setVerifyPassword(text)}
      />
      <Btn onPress={handleRegistration} texto='REGISTRARSE' color='3' colorTexto='10'/>
      <View style={styles.cont_opcs}>
        <Text style={styles.cont_opcs_op}>Login</Text>
        <Text style={styles.cont_opcs_op}>  |  </Text>
        <Text style={styles.cont_opcs_op}>Ayuda</Text>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor:'#f3f6fc'
  },
  input: {
    height: 60,
    borderColor: '#f3f6fc',
    backgroundColor:'#fff',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius:100,
    fontSize:16
  },
  btn_login:{
    width: 200, // Modificar el ancho del botón
    height: 60,  // Modificar la altura del botón
    borderRadius: 100, // Modificar el radio de borde del botón
    backgroundColor: 'blue', // Modificar el color de fondo del botón
  },
  cont_logo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:50
  },
  cont_logo_img: {
    width: 280,
    height:160,
  },
  cont_textos: {
    alignItems: 'center', // Centrar horizontalmente
  },
  cont_textos_titulo:{
    fontSize:25,
    fontWeight:"bold",
    marginBottom:5
  },
  cont_textos_subtitulo:{
    fontSize:18,
    marginBottom:40
  },
  cont_opcs:{
    flexDirection: 'row',
    alignItems: 'center', // Asegúrate de que 'alignItems' esté configurado como 'center'
    justifyContent: 'center', // Añade 'justifyContent' para centrar horizontalmente
    width:'100%',
    height:'auto',
    padding:10,
   

  },
  cont_opcs_op:{
    color:'#9ba5b7',
    fontSize:14,
    marginHorizontal: 5, 
  }
  
});

export default RegistroPantalla;
