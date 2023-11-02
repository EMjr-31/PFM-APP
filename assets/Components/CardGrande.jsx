import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { coloresTextos } from "./ColoresTextos";
import { colores } from "./Colores";

export function CardGrande(props) {
  const { onPress, titulo, color, colorTexto, icono, numero } = props;

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
          size={70}
          color={coloresTextos[colorTexto]}
        />
        <View style={styles.textContainer}>
          <Text style={{ ...styles.cardText, color: coloresTextos[colorTexto] }}>
            {titulo}
          </Text>
          <Text style={{ ...styles.cardNum, color: coloresTextos[colorTexto] }}>
            {numero}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexBasis: "94%",
    height: 200,
    borderRadius: 35,
    padding: 16,
    marginHorizontal: 5,
    marginVertical: 8,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cardText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  cardNum: {
    fontSize: 20,
  },
});

