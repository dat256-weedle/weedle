import React from "react";
import { StyleSheet, Text, View } from "react-native";
import data from "./assets/temp.json";
import { IParkingSpot } from "./types/ParkingSpots.js";
import BookingButton from "./common/BookingButton";
import { Provider } from 'mobx-react';
import { Store } from './Store';

export default class App extends React.Component {

    private store: Store;

    constructor(props: any) {
        super(props);
        this.store = new Store();
        let spots = data.parkingspots as Array<IParkingSpot>;
    }

    public render() {
        return (
            <Provider store={this.store}>
                <View style={styles.container}>
                    <BookingButton id={3}></BookingButton>
                </View>
            </Provider>
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
