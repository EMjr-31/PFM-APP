import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from '@expo/vector-icons';


// Pantallas de inicio 
import Inicio from "./Inicio";
import Rrhh from "./Rrhh";
import Comercial from "./Comercial";
import Candidatos from "./Candidatos";

//Pantall Secundarias
import Secundario from "./Secundario";
import FormularioClientes from "./FormularioClientes";

// Variable de TabNavigator
const Tab = createBottomTabNavigator();

///
const RrhhStack= createNativeStackNavigator();
const ComercialStack= createNativeStackNavigator();

function RrhhStackPantallas(){
    return(
        <RrhhStack.Navigator
            initialRouteName="Recursos Humanos"
        >
            <RrhhStack.Screen
                name="Recursos Humanos"
                component={Rrhh}
            />
             <RrhhStack.Screen
                name="Secundario"
                component={Secundario}
            />
        </RrhhStack.Navigator>
    )
}

function ComercialStackPantallas(){
  return(
      <ComercialStack.Navigator
          initialRouteName="Administrador Comercial"
      >
          <ComercialStack.Screen
              name="Administrador Comercial"
              component={Comercial}
          />
           <ComercialStack.Screen
              name="Clientes"
              component={FormularioClientes}
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
        tabBarActiveBackgroundColor: '#0052cc',
        tabBarActiveTintColor: '#fff'
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
        name="Candidatos"
        component={Candidatos}
        options={{
          tabBarLabel: "Candidatos",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-supervisor-outline" size={size} color={color} />
          ),
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
