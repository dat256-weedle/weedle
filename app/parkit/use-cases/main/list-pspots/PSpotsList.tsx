import React from "react";
import { View, StyleSheet } from "react-native";
import { IParkingSpot } from "../../../types/ParkingSpots";
import ParkingElement from "../../../src/common/ParkingElement";
import List from '../../../common/list/List';

interface IProps {
    array: Array<IParkingSpot>;
}

export default class PSpotsList extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        const array = this.props.array;
        return (
            <List>
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
            </List>
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
