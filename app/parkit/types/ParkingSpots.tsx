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
    provider: string;
    price: string;
    specialPrice: string;
}
