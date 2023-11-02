import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { useRoute } from "@react-navigation/native";

const Secundario =()=>{
    const route = useRoute();
    const ejemploProps = route.params.EjemploProps;
    
    return(
        <View>
            <Text>Secundario</Text>
            <Text>{ejemploProps}</Text>
        </View>
    )
}

export default Secundario;