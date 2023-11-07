import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Button ,Linking} from "react-native";
import { Btn } from './btn';

const apiUrl = "http://147.182.249.91/api/clientes";

const Contactos = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    // Realiza una solicitud HTTP a la API para obtener los datos
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error al obtener datos:", error));
  }, []);

  const EncabezadoTabla = () => (
    <View style={styles.row}>
      <Text style={styles.cellHeader}>Contacto</Text>
      <Text style={styles.cellHeader}>Empresa</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedContact(item);
        setModalVisible(true);
      }}
    >
      <View style={styles.row}>
        <Text style={styles.cell}>{item.nombre_contacto}</Text>
        <Text style={styles.cell}>{item.nombre_empresa}</Text>

      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.centered}>
        <View style={styles.tabla}>
          <EncabezadoTabla />
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            ¿Quieres contactar a {selectedContact?.nombre_contacto}?
          </Text>
            <Btn onPress={() => {
                setModalVisible(false);
                Linking.openURL(`mailto:${selectedContact?.correo_electronico}`);
              }} texto={selectedContact?.correo_electronico}color="4" colorTexto="11" />
               <View style={styles.buttonSpacing}></View>
            <Btn onPress={() => {
                setModalVisible(false);
                Linking.openURL(`tel:${selectedContact?.telefono}`);
              }} texto={selectedContact?.telefono} color="5" colorTexto="11" />
               <View style={styles.buttonSpacing}></View>
            <Btn onPress={() => {
                setModalVisible(false);
              }} texto='Cerrar' color="1" colorTexto="11" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#0052cc'
  },
  centered: {
    flex: 1,
    alignItems: "center",
    marginTop: 15,
    padding: 10,
    height: '98%',
    backgroundColor: '#f3f6fc',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25
  },
  tabla: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 2,
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  cellHeader: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    fontSize: 16,
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Elevación para sombra en Android
  },
  modalText: {
    fontSize: 16,
    fontWeight:'bold',
    marginBottom: 10,
  },
  buttonSpacing: {
    height:5, // Separate the "Cancelar" button from the "Guardar" button
  },
});

export default Contactos;
