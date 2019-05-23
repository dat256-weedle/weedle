import { Store } from "backend/store/Store";
import { inject, observer } from "mobx-react";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { getListLogo } from "../../common/logoloader/LogoLoader";
import { secondarycolor } from "../../styles";
import { IParkingSession } from "../../types";
interface IProps {
    store?: Store;
}

@inject("store")
@observer
export default class ParkingHistory extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleBar}>
                    <Text style={styles.titleText}>Parking History</Text>
                </View>
                <FlatList
                    data={this.props.store!.sortedParkingHistory}
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
                {getListLogo(parkingSession.parkingSpot.provider)}
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
                <Text />
                <Text style={styles.paidText}>
                    {getPrice(parkingSession.parkingSpot.price) + " kr Paid"}
                </Text>
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

function getFormattedTime(date: Date): string {
    const hours = (date.getHours() < 10 ? "0" : "") + date.getHours();
    const minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();

    return date.getDay() + "/" + date.getMonth() + " " + hours + ":" + minutes;
}

function getPrice(text: string): number {
    return parseFloat(text.substring(0, text.length - 3)) as number;
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
        color: "#20DD55",
        marginRight: 10,
        fontSize: 24
    },

    unPaidText: {
        fontWeight: "bold",
        color: "#FF002E",
        marginRight: 10,
        fontSize: 32
    },

    titleBar: {
        backgroundColor: secondarycolor,
        width: "100%",
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },

    titleText: {
        fontSize: 32,
        fontWeight: "bold",
        color: "white"
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
