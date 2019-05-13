import React from "react";
import {Image, Text, View } from "react-native";
import Email from "./Email";
import MyCars from "./MyCars";

export default class Screen extends React.Component {
    public render() {
        return (
            <View style= {{flex: 2, flexDirection: "column"}}>
                <View style= {{alignItems: "center", backgroundColor: "rgb(100,210,110)"}}>
                    <Image source={require("../../../assets/user.png")} style={{
                        height: 100, marginLeft: 10, marginTop: 100, width: 100}}/>
                    <View style= {{alignItems: "center", marginTop: 10, marginBottom: 20}}>
                        <Text style={{color: "black", fontSize: 30, fontWeight: "bold"}}>John Doe </Text>
                    </View>
                </View>
                <View style ={{flex: 3, backgroundColor: "lightgrey"}}>
                    <Email/>
                    <MyCars/>
                </View>
            </View>
        );
    }
}
