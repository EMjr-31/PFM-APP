import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginPantalla from './assets/Components/LoginPantalla';
import RegistroPantalla from './assets/Components/RegistroPantalla';
import Navegacion from './assets/Components/navegacion';
export default function App() {

  
  return (
    <Navegacion/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
