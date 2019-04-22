import { action, observable } from "mobx";
import { IParkingSpot } from "./types/ParkingSpots";

/**
 * Store which contains the state of the whole application
 */
export class Store {
    /**
     * List of all the parkingspots
     */
    @observable
    public parkingSpots: IParkingSpot[] = Array<IParkingSpot>();

    /**
     * List of all parking spots which are being rented by the user
     */
    @observable
    public bookedParkingSpots: number[] = new Array();

    /**
     * Number of actions executed on the store
     */
    @observable
    public numActions: number = 0;

    /**
     * Adds a parking spot to the bookedParkingSpots list
     * @param parkingSpot The parking spot to rent
     * @throws If parking spot with the same id is already booked by user
     */
    @action
    public bookParkingSpot(parkingSpot: number) {
        if (this.bookedParkingSpots.includes(parkingSpot)) {
            throw new Error("Parking spot already booked");
        }
        this.bookedParkingSpots.push(parkingSpot);
        this.numActions++;
    }

    /**
     * Removes a parking spot from the bookedParkingsPots list.
     * @param parkingSpot The parking spot to finish renting
     * @throws If the parking spot is not already booked
     */
    @action
    public unBookParkingSpot(parkingSpot: number) {
        if (!this.bookedParkingSpots.includes(parkingSpot)) {
            throw new Error("Parking spot is not booked");
        }
        this.bookedParkingSpots = this.bookedParkingSpots.filter(
            item => parkingSpot !== item
        );
        this.numActions++;
    }

    @action
    public assignParkingSpots(parkingSpots: IParkingSpot[]) {
        this.parkingSpots = parkingSpots;
    }
}
