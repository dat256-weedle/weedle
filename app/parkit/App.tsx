import { Provider } from "mobx-react";
import React from "react";
import { StyleSheet, View } from "react-native";
import Map from "./common/map/Map";
import { Store } from "./Store";

export default class App extends React.Component {

    private store: Store;

    constructor(props: any) {
        super(props);
        this.store = new Store();
    }

    public render() {
        return (
            // Makes it possible to inject any child components with the store object using @inject from mobx-react
            <Provider store={this.store}>
                <View style={styles.container}>
                    <Map></Map>
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        //alignItems: "center",
        backgroundColor: "#fff",
        flex: 1,
        justifyContent: "center",
    },
});
