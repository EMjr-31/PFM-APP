import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { BarChart } from 'react-native-chart-kit';
import axios from 'axios';

const apiUrl = "http://147.182.249.91/api/propuestas";

const ReporteComercial = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [propuestasPorEstado, setPropuestasPorEstado] = useState({});

  useEffect(() => {
    // Realiza una solicitud HTTP para obtener los datos de la API
    axios.get(apiUrl)
      .then((response) => {
        setData(response.data);
        calcularDatosGrafica(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos de la API", error);
      });
  }, []);

  const calcularDatosGrafica = (datos) => {
    const propuestasCount = {};

    // Procesa los datos para contar la cantidad de propuestas por estado
    datos.forEach((item) => {
      const estado = item.EstadoPropuesta;
      if (propuestasCount[estado]) {
        propuestasCount[estado]++;
      } else {
        propuestasCount[estado] = 1;
      }
    });

    setPropuestasPorEstado(propuestasCount);
  };

  // Convierte los datos del objeto en un formato que la librería de gráficos pueda utilizar
  const chartData = {
    labels: Object.keys(propuestasPorEstado),
    datasets: [
      {
        data: Object.values(propuestasPorEstado),
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        barPercentage: 0.7,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.cont_redondo}>
      <Text style={styles.titulo}>Reporte por estados</Text>
        <BarChart
            data={chartData}
            width={300}
            height={200}
            yAxisLabel=""
            chartConfig={{
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            strokeWidth: 2,
            }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor:'#0052cc'
  },
  cont_redondo:{
    marginTop:15,
    padding: 10,
    height:'98%',
    alignItems: "center",
    backgroundColor:'#f3f6fc',
    borderTopRightRadius:25,
    borderTopLeftRadius:25,
  },titulo:{
    fontSize:20,
    fontWeight:'bold',
    marginBottom:10,
    marginTop:10,
  }
});

export default ReporteComercial;
