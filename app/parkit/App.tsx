import { ScreenOrientation } from "expo";
import { Provider } from "mobx-react";
import React from "react";
import { StyleSheet, View } from "react-native";
import { getData } from "./src/backend/datagatherer/DataGatherer";
import { Store } from "./src/backend/store/Store";
import SearchList from "./src/common/searchlist/SearchList";

export default class App extends React.Component {
    private store: Store;

    constructor(props: any) {
        super(props);
        this.store = new Store();
        getData(this.store);
        ScreenOrientation.allow("ALL");
    }

    public render() {
        return (
            // Makes it possible to inject any child components with the store object using @inject from mobx-react
            <Provider store={this.store}>
                <View style={styles.container}>
                    <SearchList />
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // alignItems: "center",
        backgroundColor: "#fff",
        flex: 1,
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
        paddingRight: 0,
        paddingTop: 20,
        width: "100%"
    },
    listContainer: {}
});
