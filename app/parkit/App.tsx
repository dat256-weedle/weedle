import { Provider } from "mobx-react";
import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { getData } from "./src/backend/datagatherer/DataGatherer";
import { Store } from "./src/backend/store/Store";
import { primarycolor, secondarycolor } from "./src/styles";
import { IPosition } from "./src/types";
import Menu from "./src/usage/menu/Menu";

export default class App extends React.Component {
    private store: Store;

    constructor(props: any) {
        super(props);
        this.store = new Store();
        navigator.geolocation.getCurrentPosition(position => {
            const pos: IPosition = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
            getData(this.store, pos);
        });
    }

    public render() {
        return (
            // Makes it possible to inject any child components with the store object using @inject from mobx-react
            <Provider store={this.store}>
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.container}>
                        <StatusBar
                            backgroundColor={secondarycolor}
                            barStyle="light-content"
                        />
                        <Menu />
                    </View>
                </SafeAreaView>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
        paddingRight: 0,
        width: "100%"
    },
    safeArea: {
        flex: 1,
        backgroundColor: primarycolor
    }
});
