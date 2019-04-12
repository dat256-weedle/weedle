import React from "react";
import { View } from "react-native";
import { IParkingSpot } from "../../../types/ParkingSpots";
import ParkingElement from '../../../src/common/ParkingElement';


interface IProps {
    array: Array<IParkingSpot>
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
                    distance={2}
                    address="guld 2"
                    price={20}
                    rules="max 2h"
                    provider="gbg park"
                    image="any src"
                    id="PA5252"
                />
                ))
            }
            </View>
        );
    }
}
