export interface IPosition {
    longitude: number;
    latitude: number;
}

export interface IParkingSpot {
    id: number;
    position: IPosition;
    name: string;
    description: string;
    parkingSpots: number;
    distance: number;
    provider: string;
    price: string;
    specialPrice: string;
}
