import React from "react";
import { StyleSheet, Text, View } from "react-native";
import data from "./assets/temp.json";
import { IParkingSpot } from "./types/ParkingSpots.js";
import RentButton from "./common/RentButton";
import { Provider } from 'mobx-react';
import { Store } from './Store';

export default class App extends React.Component {

    private store: Store;

    constructor(props: any) {
        super(props);
        this.store = new Store();
        let spots = data.parkingspots as Array<IParkingSpot>;

        console.log(this.store);
    }

    public render() {
        return (
            // Makes it possible to inject any child components with the store object using @inject from mobx-react
            <Provider store={this.store}>
                <View style={styles.container}>
                    <RentButton id={3}></RentButton>
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
