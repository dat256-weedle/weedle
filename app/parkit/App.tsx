import React from "react";
import { StyleSheet, Text, View } from "react-native";
import data from "./assets/temp.json";
import { IParkingSpot } from "./types/ParkingSpots.js";
import PSpotsList from "./use-cases/main/list-pspots/PSpotsList";

export default class App extends React.Component {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <View style={styles.container}>
                <Text>Open up App.tsx to start working on your app!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        paddingTop: 20,
        paddingRight: 0
    },
    listContainer: {}
});
