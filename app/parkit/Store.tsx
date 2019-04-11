import { observable, action } from "mobx"
import { IParkingSpot } from './types/ParkingSpots'


export class Store {

    constructor(){

    }

    @observable 
    public bookedParkingSpots: Number[] = new Array();

    @action
    public bookParkingSpot (parkingSpot: Number) {
        this.bookedParkingSpots.push(parkingSpot)
    }

    @action
    public unBookParkingSpot (parkingSpot: Number) {
        this.bookedParkingSpots = this.bookedParkingSpots.filter((item) => {return (parkingSpot !== item)})
    }
}
export const store = new Store()
