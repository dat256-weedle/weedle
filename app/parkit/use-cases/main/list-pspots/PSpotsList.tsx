import React from "react";
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
                        price={0}
                        id={"" + index}
                    />
                ))}
            </List>
        );
    }
}
