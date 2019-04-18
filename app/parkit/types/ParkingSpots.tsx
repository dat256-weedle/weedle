import React from "react";

export interface IPosition {
    longitude: number;
    latitude: number;
}

export interface IParkingSpot {
    position: IPosition;
    name: String;
    description: String;
    parkingSpots: number;
    distance: number;
    provider: String;
    price: number;
    specialPrice: number;
}
