import { observable, action } from "mobx"

interface IParkingSpot {
    id: number; 
} 
class Store {

    @observable 
    public bookedParkingSpots: IParkingSpot[] = new Array();

    @action
    bookParkingSpot (parkingSpot: IParkingSpot) {
        this.bookedParkingSpots.push(parkingSpot)
    }

    @action
    unBookParkingSpot (parkingSpot: IParkingSpot) {
        this.bookedParkingSpots.filter((item) => {return (parkingSpot != item)})
    }
}