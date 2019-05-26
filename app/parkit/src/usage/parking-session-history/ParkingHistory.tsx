import { Store } from "backend/store/Store";
import { inject, observer } from "mobx-react";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { getListLogo } from "../../common/logoloader/LogoLoader";
import { primarycolor, secondarycolor } from "../../styles";
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
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Parking sessions</Text>
                </View>
                {/*
                 */}
                <FlatList
                    data={this.getList()}
                    renderItem={this.listItem}
                    ItemSeparatorComponent={this.renderSeparator}
                    keyExtractor={item => item.id}
                />
            </View>
        );
    }

    private getList(): any[] {
        const arr: any[] = new Array<any>();

        arr.push({ isTitle: true, name: "active", id: 0 });
        if (this.props.store!.currentParkingSessions.length > 0) {
            this.props.store!.sortedActiveSessions.forEach(element => {
                arr.push({
                    isTitle: false,
                    isEmpty: false,
                    item: element,
                    isActive: true,
                    id: arr.length
                });
            });
        } else {
            arr.push({
                isTitle: false,
                isEmpty: true,
                id: arr.length,
                text: "No active parking sessions"
            });
        }

        arr.push({
            isTitle: true,
            isEmpty: false,
            id: arr.length,
            name: "history"
        });
        if (this.props.store!.oldParkingSessions.length > 0) {
            this.props.store!.sortedParkingHistory.forEach(element => {
                arr.push({
                    isTitle: false,
                    isEmpty: false,
                    item: element,
                    id: arr.length,
                    isActive: false
                });
            });
        } else {
            arr.push({
                isTitle: false,
                isEmpty: true,
                text: "No previous parking sessions",
                id: arr.length
            });
        }
        return arr;
    }

    private listItem(item: any) {
        if (item.item.isTitle) {
            return (
                <View>
                    <View style={styles.titleBar}>
                        <Text style={styles.titleText}>
                            {item.item.name === "history"
                                ? "Parking Session History"
                                : "Active Parking Sessions"}
                        </Text>
                    </View>
                </View>
            );
        }

        if (item.item.isEmpty) {
            return (
                <View>
                    <Text style={styles.emptyText}>{item.item.text}</Text>
                </View>
            );
        }

        const parkingSession = item.item.item as IParkingSession;

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
                            (item.item.isActive
                                ? "> ..."
                                : getFormattedTime(parkingSession.endTime))}
                    </Text>
                </View>
                <Text />
                {item.item.isActive ? (
                    <Text style={styles.activeText}>Active</Text>
                ) : (
                    <Text style={styles.paidText}>
                        {getPrice(parkingSession) + " kr Paid"}
                    </Text>
                )}
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

function getPrice(parkingSession: IParkingSession): number {
    const text: string = parkingSession.parkingSpot.price;
    const pricePerH: number = parseFloat(
        text.substring(0, text.length - 3)
    ) as number;

    // One hour represented in milliseconds
    const hourInMs = 3600000;
    // Convert the time interval between the start and endtime to hours, rounded up.
    const time = Math.ceil(
        (parkingSession.endTime.getTime() -
            parkingSession.startTime.getTime()) /
            hourInMs
    );

    return time * pricePerH;
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

    activeText: {
        fontWeight: "bold",
        color: "#00af0e",
        marginRight: 10,
        fontSize: 24
    },

    paidText: {
        fontWeight: "bold",
        color: "#F3C900",
        marginRight: 10,
        fontSize: 24
    },

    unPaidText: {
        fontWeight: "bold",
        color: "#FF002E",
        marginRight: 10,
        fontSize: 32
    },

    headerContainer: {
        backgroundColor: primarycolor,
        width: "100%",
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },

    headerText: {
        fontSize: 32,
        fontWeight: "bold",
        color: "white"
    },

    titleBar: {
        width: "100%",
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },

    titleText: {
        fontSize: 24,
        fontWeight: "bold",
        color: secondarycolor
    },

    addressText: {
        fontSize: 18,
        fontWeight: "bold",
        maxWidth: "100%"
    },

    dividerContainer: {
        height: 30,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },

    centerTexts: {
        display: "flex",
        flex: 1,
        flexDirection: "column"
    },

    emptyText: {
        textAlign: "center",
        margin: 10
    },

    icon: {
        width: 50,
        height: 50,
        marginRight: 10,
        marginLeft: 10
    },

    bigDivider: {
        height: 3,
        width: "100%",
        backgroundColor: "#CED0CE"
    }
});
