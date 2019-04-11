import React from "react";
import { StyleSheet, Text, View } from "react-native";
import data from "./assets/temp.json";
import { IParkingSpot } from "./types/ParkingSpots.js";
import List from "./use-cases/main/list/List.js";

export default class App extends React.Component {
    private spots: Array<IParkingSpot>;

    constructor(props: any) {
        super(props);

        this.spots = data.parkingspots as Array<IParkingSpot>;
    }

    public render() {
        return (
            <View style={styles.container}>
                <Text>Open up App.tsx to start working on your app!</Text>
                <List props={this.spots} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: "#fff",
        flex: 1,
        justifyContent: "center"
    }
});
