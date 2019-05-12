export interface IPosition {
    longitude: number;
    latitude: number;
}

export interface IParkingSpot {
    id: string;
    position: IPosition;
    name: string;
    description: string;
    parkingSpots: string;
    distance: number;
    provider: Providers;
    price: string;
    specialPrice: string;
}

export enum Providers {
    ParkeringGothenburg,
    EasyPark,
    QPark
}
