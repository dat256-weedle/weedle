import React from "react";
import { StyleSheet, Text, View } from "react-native";
import data from "./assets/temp.json";
import { IParkingSpot } from "./types/ParkingSpots.js";
import BookingButton from "./common/BookingButton";

export default class App extends React.Component {
    constructor(props: any) {
        super(props);

        let spots = data.parkingspots as Array<IParkingSpot>;
    }

    public render() {
        return (
            <View style={styles.container}>
                <BookingButton id={3}></BookingButton>
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
