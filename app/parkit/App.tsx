import React from "react";
import { StyleSheet, Text, View } from "react-native";
import data from "./assets/temp.json";
import { IParkingSpot } from "./types/ParkingSpots";
import BookingButton from "./common/BookingButton";
import { Store, store } from './Store';
import { InjectionProvider } from './utils/InjectionProvider';

export default class App extends React.Component {

    private store: Store;

    constructor(props: any) {
        super(props);
        this.store = new Store();
        let spots = data.parkingspots as Array<IParkingSpot>;
    }

    public render() {
        return (
            <InjectionProvider Store ={store}>
                    <BookingButton id={3}></BookingButton>
            </InjectionProvider>
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
