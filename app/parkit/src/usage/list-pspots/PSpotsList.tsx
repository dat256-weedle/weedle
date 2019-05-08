import React from "react";
import List from "../../common/list/List";
import ParkingElement from "../../common/parkingelement/ParkingElement";
import { IParkingSpot } from "../../types";

interface IProps {
    array: IParkingSpot[];
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
                        price={0}
                        id={"" + index}
                    />
                ))}
            </List>
        );
    }
}
