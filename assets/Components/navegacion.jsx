import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from '@expo/vector-icons';


///Login y Registro 
import LoginPantalla from "./LoginPantalla";
import RegistroPantalla from "./RegistroPantalla";

// Pantallas de inicio 
import Inicio from "./Inicio";
import Rrhh from "./Rrhh";
import Comercial from "./Comercial";

//Pantall RRHH
import Secundario from "./Secundario";
import FormularioClientes from "./FormularioClientes";
import Clientes from "./Clientes";
import EditarCliente from "./EditarCliente";
import Seguimientos from "./Seguimientos";
import EditarSeguimientos from "./EditarSeguimientos";
import ReporteRRHH from "./ReporteRRHH";



//Pantall Comercial 
import FormularioCandidatos from './FormularioCandidatos';
import Candidatos from "./Candidatos";
import EditarCandidatos from "./EditarCandidatos";
import Contactos from "./Contactos";
import Propuestas from "./Propuestas";
import FormularioPropuesta from "./FormularioPropuesta";
import EditarPropuestas from "./EditarPropuestas"
import ReporteComercial from "./ReporteComercial";


// Variable de TabNavigator
const Tab = createBottomTabNavigator();

//// Stack Navihgation
const InicioStack= createNativeStackNavigator();
const RrhhStack= createNativeStackNavigator();
const ComercialStack= createNativeStackNavigator();

function InicioStackPantallas(){
  return(
      <InicioStack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false, // Oculta el encabezado
          }}
      >
          <InicioStack.Screen
              name="Login"
              component={LoginPantalla}
          />
          <InicioStack.Screen
              name="Registro"
              component={RegistroPantalla}
          />
          <InicioStack.Screen
              name="Menu"
              component={Mistabs}
          />
      </InicioStack.Navigator>
  )
}


function RrhhStackPantallas(){
    return(
        <RrhhStack.Navigator
            initialRouteName="Recursos Humanos"
            screenOptions={{
              headerStyle: {
                backgroundColor: "#0052cc", // Color de fondo de la barra de navegación
              },
              headerTintColor: "#fff", // Color del texto de la barra de navegación
            }}
        >
            <RrhhStack.Screen
                name="Recursos Humanos"
                component={Rrhh}
            />
             <RrhhStack.Screen
                name="Candidatos"
                component={Candidatos}
            />
            <RrhhStack.Screen
                name="Ingresar Candidato"
                component={FormularioCandidatos}
            />
            <RrhhStack.Screen
                name="Editar Candidato"
                component={EditarCandidatos}
            />
            <RrhhStack.Screen
                name="Seguimientos"
                component={Seguimientos}
            />
            <RrhhStack.Screen
                name="Editar Seguimientos"
                component={EditarSeguimientos}
            />
             <RrhhStack.Screen
                name="Reporte RRHH"
                component={ReporteRRHH}
            />
        </RrhhStack.Navigator>
    )
}


function ComercialStackPantallas(){
  return(
      <ComercialStack.Navigator
          initialRouteName="Administrador Comercial"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#0052cc", // Color de fondo de la barra de navegación
            },
            headerTintColor: "#fff", // Color del texto de la barra de navegación
          }}
      >
          <ComercialStack.Screen
              name="Administrador Comercial"
              component={Comercial}
          />
           <ComercialStack.Screen
              name="Clientes"
              component={Clientes}
          />
          <ComercialStack.Screen
              name="Ingresar Clientes"
              component={FormularioClientes}
          />
          <ComercialStack.Screen
              name="Editar Cliente"
              component={EditarCliente}
          />
          <ComercialStack.Screen
              name="Propuestas"
              component={Propuestas}
          />
          <ComercialStack.Screen
              name="Contactos"
              component={Contactos}
          />
          <ComercialStack.Screen
              name="Editar Propuestas"
              component={EditarPropuestas}
          />
          <ComercialStack.Screen
              name="Reporte Comercial"
              component={ReporteComercial}
          />
          <ComercialStack.Screen
              name="Ingresar Propuesta"
              component={FormularioPropuesta}
          />
      </ComercialStack.Navigator>
  )
}

// Función con las tabs
function Mistabs() {
  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        tabBarActiveTintColor: '#0052cc',
        headerStyle: {
          backgroundColor: "#0052cc", // Color de fondo de la barra de navegación
        },
        headerTintColor: "#fff", // Color del texto de la barra de navegación
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={Inicio}
        options={{
          tabBarLabel: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-variant-outline" size={size} color={color} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Comercial"
        component={ComercialStackPantallas}
        options={{
          tabBarLabel: "Comercial",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="storefront-outline" size={size} color={color} />
          ),
          headerShown: false
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="RRHH"
        component={RrhhStackPantallas}
        options={{
          tabBarLabel: "RRHH",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="folder-multiple-outline" size={size} color={color} />
          ),
          headerShown: false
        }}
      ></Tab.Screen>

    </Tab.Navigator>
  );
}


export default function Navegacion(){
    return(
        <NavigationContainer>
          <InicioStackPantallas/>
        </NavigationContainer>
    )
}
