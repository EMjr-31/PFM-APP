import React from "react";
import { View, Text, StyleSheet, Button} from "react-native";
import { Btn } from "./btn";
import { useNavigation } from "@react-navigation/native";

const Rrhh =()=>{
    const navegar=useNavigation();
    return(
        <View>
            <Text>RRHH</Text>
            <Btn 
                onPress={()=>navegar.navigate("Secundario", {EjemploProps:"Soy una props desde RRHH"})} 
                texto='Secundario' 
                color='#0052cc'
            />
        </View>
    )
}

export default Rrhh;