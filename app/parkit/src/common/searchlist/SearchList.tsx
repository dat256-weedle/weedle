import { IPosition, IParkingSpot } from "../../types";
import React from "react";
import { Text, View, StyleSheet, FlatList, Image } from "react-native";
import { SearchBar } from "react-native-elements";
import ParkingSpotMap from "../map/ParkingSpotMap";
import { Store } from "backend/store/Store";
import { inject, observer } from "mobx-react";
import { getListLogo } from "../logoloader/LogoLoader";

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
            let arr = data as Array<any>;

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

    public render() {
        return (
            <View style={styles.container}>
                <SearchBar
                    round
                    lightTheme
                    placeholder="Type here to search..."
                    value={this.state.searchText}
                    onChangeText={text => {
                        if (text == "") {
                            this.setState({ viewMap: true });
                        } else {
                            this.setState({ viewMap: false, searchText: text });
                            this.loadData();
                        }
                    }}
                    onSubmitEditing={() => this.loadData()}
                />
                {this.ChooseRender()}
            </View>
        );
    }

    private listItem(item: any) {
        let parkingSpot: IParkingSpot = item.item as IParkingSpot;

        let distance: string = "";
        let distanceNumber: number = parkingSpot.distance;
        if (distanceNumber > 1000) {
            distance = (distanceNumber / 1000).toFixed(2) + " km";
        } else {
            distance = distanceNumber + " m";
        }

        return (
            <View style={styles.listElement}>
                <Image
                    source={getListLogo(parkingSpot.provider)}
                    style={styles.icon}
                />
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

    private renderSeparator() {
        return (
            <View
                style={{
                    height: 1,
                    width: "72%",
                    marginLeft: "14%",
                    marginRight: "14%",
                    backgroundColor: "#CED0CE"
                }}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%"
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
