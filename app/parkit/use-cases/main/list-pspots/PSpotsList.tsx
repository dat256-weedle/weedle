import React from "react";
import { View, StyleSheet } from "react-native";
import { IParkingSpot } from "../../../types/ParkingSpots";
import ParkingElement from "../../../src/common/ParkingElement";

interface IProps {
    array: Array<IParkingSpot>;
}

export default class List extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        const array = this.props.array;
        return (
            <View style={styles.listContainer}>
                {array.map((parkingspot, index) => (
                    <ParkingElement
                        key={index}
                        distance={parkingspot.distance}
                        address={
                            "" +
                            parkingspot.position.longitude +
                            ", " +
                            parkingspot.position.latitude
                        }
                        price={0}
                        rules="max 2h"
                        provider={parkingspot.owner}
                        image="any src"
                        id={"" + index}
                    />
                ))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listContainer: {
        display: "flex",
        flexDirection: "column",
        margin: 0,
        flexGrow: 1,
        width: "100%"
    }
});
