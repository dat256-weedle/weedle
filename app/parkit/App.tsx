import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ParkingElement from "./src/common/ParkingElement";

export default class App extends React.Component {
    public render() {
        return (
            <View style={styles.container}>
                <Text>Open up App.tsx to start working on your app!</Text>
                <ParkingElement
                    distance={2}
                    address="guld 2"
                    price={20}
                    rules="max 2h"
                    provider="gbg park"
                    image="any src"
                    id="PA5252"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: "#fff",
        flex: 1,
        justifyContent: "center",
    },
});
