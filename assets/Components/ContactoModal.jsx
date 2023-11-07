import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Button } from "react-native";

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
      <Text style={styles.cellHeader}>ID</Text>
      <Text style={styles.cellHeader}>Nombre de la Empresa</Text>
      <Text style={styles.cellHeader}>Nombre del Contacto</Text>
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
        <Text style={styles.cell}>{item.id}</Text>
        <Text style={styles.cell}>{item.nombre_empresa}</Text>
        <Text style={styles.cell}>{item.nombre_contacto}</Text>
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
              Nombre del Contacto: {selectedContact?.nombre_contacto}
            </Text>
            <Text style={styles.modalText}>
              Nombre de la Empresa: {selectedContact?.nombre_empresa}
            </Text>
            <Text style={styles.modalText}>
              Correo Electrónico: {selectedContact?.correo_electronico}
            </Text>
            <Text style={styles.modalText}>
              Teléfono: {selectedContact?.telefono}
            </Text>
            <Button
              title="Cerrar"
              onPress={() => {
                setModalVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabla: {
    width: "90%",
    backgroundColor: "#fff",
    marginTop: 40,
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
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default Contactos;
