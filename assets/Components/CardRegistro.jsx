import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { coloresTextos } from "./ColoresTextos";
import { colores } from "./Colores";

export function CardRegistro(props) {
  const { onPress, titulo, color, colorTexto, icono, subtitulo } = props;

  return (
    <TouchableOpacity
      style={{
        ...styles.cardContainer,
        backgroundColor:colores[color],
      }}
      onPress={onPress}
    >
      <View style={styles.cardContent}>
      <MaterialCommunityIcons
          name={icono}
          size={30}
          color={coloresTextos[colorTexto]}
        />
        <View style={styles.textContainer}>
          <Text style={{ ...styles.cardText, color: coloresTextos[colorTexto] }}>
            {titulo}
          </Text>
          <Text style={{ ...styles.cardNum, color: coloresTextos[colorTexto] }}>
            {subtitulo}
          </Text>
        </View>
        
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexBasis: "100%",
    height: 85,
    padding: 20,
    marginHorizontal: 5,
    marginVertical: 1,
    borderRadius:30, 
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft:20
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardNum: {
    fontSize: 16,
  },
});

