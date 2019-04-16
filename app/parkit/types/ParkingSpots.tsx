export interface IPosition {
    longitude: number;
    latitude: number;
}

export interface IParkingSpot {
    id: Number;
    position: IPosition;
    name: string;
    distance: number;
    city: string;
    owner: string;
}
