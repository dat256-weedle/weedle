import { ScreenOrientation } from "expo";
import { LoremIpsum } from "lorem-ipsum";
import { Provider } from "mobx-react";
import React from "react";
import { StyleSheet, View } from "react-native";
import { getData } from "./src/backend/datagatherer/DataGatherer";
import { Store } from "./src/backend/store/Store";
import RentPage from "./src/common/rentpage/RentPage";
import { Providers } from "./src/types";
import ParkingSpotMap from './src/common/map/ParkingSpotMap';
import { snapshotMap } from './src/common/mapsnapshotter/MapSnapshotter';

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  });

export default class App extends React.Component {
    private store: Store;

    constructor(props: any) {
        super(props);
        this.store = new Store();
        getData(this.store);
        //snapshotMap({id: "lolid", name: "lolname", position: {latitude: 3, longitude: 3}, description: lorem.generateParagraphs(1),  parkingSpots: "3", distance: 3, provider: Providers.EasyPark, price: "3kr", specialPrice: "3skr"})
    }

    public render() {
        return (
            // Makes it possible to inject any child components with the store object using @inject from mobx-react
                    //<RentPage parkingSpot = {{id: "lolid", name: "lolname", position: {latitude: 3, longitude: 3}, description: lorem.generateParagraphs(1),  parkingSpots: "3", distance: 3, provider: Providers.EasyPark, price: "3kr", specialPrice: "3skr"}}/>
            <Provider store={this.store}>
                <View style={styles.container}>
                    <ParkingSpotMap></ParkingSpotMap>
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
