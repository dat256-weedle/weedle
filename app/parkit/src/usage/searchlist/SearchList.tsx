import { Store } from "backend/store/Store";
import { inject, observer } from "mobx-react";
import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { SearchBar } from "react-native-elements";
import { getListLogo } from "../../common/logoloader/LogoLoader";
import ParkingSpotMap from "../../common/map/ParkingSpotMap";
import { primarycolor, secondarycolor } from "../../styles";
import { IParkingSpot, IPosition } from "../../types";

const address = "https://nominatim.openstreetmap.org/search/";
const parameters = "?format=json&limit=1";

export async function getCoordsFromQuery(
    query: string
): Promise<void | IPosition> {
    return fetch(
        address + query + " Gothenburg, västra götaland, sweden" + parameters,
        {
            method: "GET"
        }
    )
        .then(response => {
            return response.json();
        })
        .then(data => {
            const arr = data as any[];

            // Try to get the position from the from the query result.
            if (arr.length > 0) {
                return {
                    latitude: arr[0].lat,
                    longitude: arr[0].lon
                } as IPosition;
            }

            return;
        })
        .catch(error => {
            console.log("Error in getCoordsFromQuery: ", error);
        });
}

interface IProps {
    store?: Store;
}

interface IState {
    searchText: string;
    viewMap: boolean;
    store: Store;
    searchResults: IParkingSpot[];
    refreshing: boolean;
}

@inject("store")
@observer
export default class SearchList extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            viewMap: true,
            searchText: "",
            store: props.store!,
            searchResults: new Array<IParkingSpot>(),
            refreshing: false
        };
    }

    /**
     * Main render method
     */
    public render() {
        return (
            <View style={styles.container}>
                <SearchBar
                    round
                    placeholder="Type here to search..."
                    value={this.state.searchText}
                    onChangeText={text => {
                        if (text === "") {
                            this.setState({ viewMap: true });
                        } else {
                            this.setState({ viewMap: false, searchText: text });
                            this.loadData();
                        }
                    }}
                    containerStyle={{
                        backgroundColor: secondarycolor
                    }}
                    style={{
                        color: "white"
                    }}
                    inputContainerStyle={{
                        backgroundColor: "white"
                    }}
                    textContentType="addressCity"
                    platform="ios"
                    cancelButtonProps={{
                        color: "white"
                    }}
                    onSubmitEditing={() => this.loadData()}
                />
                {this.ChooseRender()}
            </View>
        );
    }

    /**
     * Fetches coordinates and sets nearby parkingspots to state
     */
    private async loadData() {
        getCoordsFromQuery(this.state.searchText).then(
            (data: void | IPosition) => {
                if (typeof data === "object") {
                    this.setState({
                        searchResults: this.state.store.getParkingSpotsByDistance(
                            data,
                            25
                        )
                    });
                }
            }
        );
    }

    /**
     * Render method for each listItem
     * @param item is parkingspot top be rendered
     */
    private listItem(item: any) {
        const parkingSpot: IParkingSpot = item.item as IParkingSpot;

        let distance: string = "";
        const distanceNumber: number = parkingSpot.distance;
        if (distanceNumber > 1000) {
            distance = (distanceNumber / 1000).toFixed(2) + " km";
        } else {
            distance = distanceNumber + " m";
        }

        return (
            <View style={styles.listElement}>
                {getListLogo(parkingSpot.provider)}
                <View style={styles.centerTexts}>
                    <Text numberOfLines={1} style={styles.addressText}>
                        {parkingSpot.name}
                    </Text>
                    <Text>{parkingSpot.price}</Text>
                </View>
                <Text style={styles.distanceText}>{distance}</Text>
            </View>
        );
    }

    /**
     * Render method which returns the parkingspotlist of mapview
     */
    private ChooseRender() {
        if (this.state.viewMap) {
            return <ParkingSpotMap nightmode={false} />;
        } else {
            return (
                <FlatList
                    data={Array.from(this.state.searchResults)}
                    renderItem={this.listItem}
                    ItemSeparatorComponent={this.renderSeparator}
                    keyExtractor={item => item.id}
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
                        this.setState({ refreshing: true });
                        this.loadData();
                        this.setState({ refreshing: false });
                    }}
                />
            );
        }
    }

    /**
     * Render method for the separator between listItems
     */
    private renderSeparator() {
        return <View style={styles.seperator} />;
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%"
    },
    seperator: {
        height: 1,
        width: "72%",
        marginLeft: "14%",
        marginRight: "14%",
        backgroundColor: primarycolor
    },
    listElement: {
        height: 60,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingRight: 10
    },

    addressText: {
        fontSize: 18,
        fontWeight: "bold",
        maxWidth: "100%"
    },

    centerTexts: {
        display: "flex",
        flex: 1,
        flexDirection: "column"
    },

    icon: {
        width: 50,
        height: 50,
        marginRight: 10,
        marginLeft: 10
    },

    distanceText: {
        fontSize: 18,
        minWidth: 50,
        fontWeight: "bold",
        textAlign: "right",
        marginLeft: 10
    }
});
