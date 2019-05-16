import { Store } from "backend/store/Store";
import { inject, observer } from "mobx-react";
import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { getListLogo } from "../../common/logoloader/LogoLoader";
import { IParkingSession, Providers } from "../../types";

interface IProps {
    store?: Store;
}

interface IState {
    store: Store;
}

@inject("store")
@observer
export default class ParkingHistory extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            store: props.store!
        };

        // TMP data, remove this later!!!
        this.state.store.oldParkingSessions.push({
            car: "Car 1",
            parkingSpot: {
                id: "1234",
                name: "Asd gatan 12",
                price: "BS",
                specialPrice: "BS?",
                position: {
                    latitude: 0,
                    longitude: 0
                },
                description: "asdasdasd",
                provider: Providers.ParkeringGothenburg,
                distance: 0,
                parkingSpots: "0"
            },
            startTime: new Date(2019, 5, 14, 15, 30, 0, 0),
            endTime: new Date(2019, 5, 14, 15, 45, 0, 0),
            cost: 57
        });
        this.state.store.oldParkingSessions.push({
            car: "Car 2",
            parkingSpot: {
                id: "1234",
                name: "Trevliga gatan 82",
                price: "BS",
                specialPrice: "BS?",
                position: {
                    latitude: 0,
                    longitude: 0
                },
                description: "asdasdasd",
                provider: Providers.ParkeringGothenburg,
                distance: 0,
                parkingSpots: "0"
            },
            startTime: new Date(2019, 6, 8, 12, 0, 0, 0),
            endTime: new Date(2019, 6, 10, 15, 0, 0, 0),
            cost: 192
        });
    }

    public render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleBar}>
                    <Text style={styles.titleText}>Parking History</Text>
                </View>
                <FlatList
                    data={this.state.store.oldParkingSessions}
                    renderItem={this.listItem}
                    ItemSeparatorComponent={this.renderSeparator}
                />
            </View>
        );
    }

    private listItem(item: any) {
        const parkingSession = item.item as IParkingSession;
        return (
            <View style={styles.listElement}>
                <Image
                    source={getListLogo(parkingSession.parkingSpot.provider)}
                    style={styles.icon}
                />
                <View style={styles.centerTexts}>
                    <Text style={styles.addressText}>
                        {parkingSession.parkingSpot.name}
                    </Text>
                    <Text>
                        {getFormattedTime(parkingSession.startTime) +
                            " - " +
                            getFormattedTime(parkingSession.endTime)}
                    </Text>
                </View>
            </View>
        );
    }

    /**
     * Render method for the separator between listItems
     */
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
        alignItems: "center"
    },

    paidText: {
        fontWeight: "bold",
        color: "#20FF55"
    },

    unPaidText: {
        fontWeight: "bold",
        color: "#FF002E"
    },

    titleBar: {
        backgroundColor: "#6200EE",
        width: "100%",
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },

    titleText: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#FFFFFF"
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
    }
});

function getFormattedTime(date: Date): string {
    return (
        date.getDay() +
        "/" +
        date.getMonth() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes()
    );
}
