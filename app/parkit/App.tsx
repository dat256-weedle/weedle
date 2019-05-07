import { Provider } from "mobx-react";
import React from "react";
import { StyleSheet, View } from "react-native";
// import data from "./assets/temp.json";
import Screen from "./src/userpage/Screen";
import { Store } from "./Store";
// import { IParkingSpot } from "./types/ParkingSpots.js";

export default class App extends React.Component {

    private store: Store;

    constructor(props: any) {
        super(props);
        this.store = new Store();
        // const spots = data.parkingspots as IParkingSpot[];
    }

    public render() {
        return (
            // Makes it possible to inject any child components with the store object using @inject from mobx-react
            <Provider store={this.store}>
                <View style={styles.container}>
                    <Screen/>
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
