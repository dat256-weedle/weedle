import { observable, action } from "mobx"

interface IParkingSpot {
    id: number; 
}

export class Store {

    constructor(){

    }

    @observable 
    public bookedParkingSpots: IParkingSpot[] = new Array();

    @action
    public bookParkingSpot (parkingSpot: IParkingSpot) {
        this.bookedParkingSpots.push(parkingSpot)
    }

    @action
    public unBookParkingSpot (parkingSpot: IParkingSpot) {
        this.bookedParkingSpots.filter((item) => {return (parkingSpot != item)})
    }
}
export const store = new Store()
