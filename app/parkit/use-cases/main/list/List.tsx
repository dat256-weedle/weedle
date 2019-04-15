import React from "react";
import { View } from "react-native";
import ParkingElement from "../../../src/common/ParkingElement";
import { IParkingSpot } from "../../../types/ParkingSpots";

interface IProps {
    array: IParkingSpot[];
}

export default class List extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        const array = this.props.array;
        return (
            <View style={{display: "flex", flexDirection: "column"}}>
            {
                array.map((parkingspot, index) => (
                    <ParkingElement key={index}
                    distance={parkingspot.distance}
                    price={0}
                    id={"" + index}
                />
                ))
            }
            </View>
        );
    }
}
