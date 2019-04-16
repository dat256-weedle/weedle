import React from "react";

export interface IPosition {
    longitude: number;
    latitude: number;
}

export interface IParkingSpot {
    id: number;
    position: IPosition;
    name: string;
    distance: number;
    city: string;
    owner: string;
}
