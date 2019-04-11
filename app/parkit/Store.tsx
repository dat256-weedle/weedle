import { observable, action } from "mobx"

/**
 * Store which contains the state of the whole application
 */
export class Store {

    /**
     * List of all parking spots which are being rented by the user
     */
    @observable 
    public bookedParkingSpots: Number[] = new Array();

    /**
     * Adds a parking spot to the bookedParkingSpots list
     * @param parkingSpot The parking spot to rent
     */
    @action
    public bookParkingSpot (parkingSpot: Number) {
        this.bookedParkingSpots.push(parkingSpot)
    }

    /**
     * Removes a parking spot from the bookedParkingsPots list
     * @param parkingSpot The parking spot to finish renting
     */
    @action
    public unBookParkingSpot (parkingSpot: Number) {
        this.bookedParkingSpots = this.bookedParkingSpots.filter((item) => {return (parkingSpot !== item)})
    }
}
