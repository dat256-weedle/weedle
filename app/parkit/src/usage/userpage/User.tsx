import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { Store } from "../../backend/store/Store";


export default class User extends Component<any> {
    public render() {
        return(
        <View style={{ alignItems: "center", backgroundColor: "rgb(100,210,110)" }}>
                    <Image source={require("../../../assets/user.png")} style={{
                        height: 70, width: 70, marginTop: 10, marginBottom: 10}}/>
                    <View style= {{alignItems: "center", marginTop: 10, marginBottom: 10}}>
                        <Text style={{color: "black", fontSize: 30, fontWeight: "bold"}}>John Doe </Text>
                    </View>
                </View>
        )}      
}