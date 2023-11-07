import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from '@expo/vector-icons';


// Pantallas de inicio 
import Inicio from "./Inicio";
import Rrhh from "./Rrhh";
import Comercial from "./Comercial";

//Pantall RRHH
import Secundario from "./Secundario";
import FormularioClientes from "./FormularioClientes";
import Clientes from "./Clientes";
import EditarCliente from "./EditarCliente";

//Pantall Comercial 
import FormularioCandidatos from './FormularioCandidatos';
import Candidatos from "./Candidatos";
import EditarCandidatos from "./EditarCandidatos";


// Variable de TabNavigator
const Tab = createBottomTabNavigator();

///
const RrhhStack= createNativeStackNavigator();
const ComercialStack= createNativeStackNavigator();

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
            <Mistabs></Mistabs>
        </NavigationContainer>
    )
}
