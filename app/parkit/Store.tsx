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

    /**
     * Adds / updates parking spots to the store.
     * @param newParkingSpots parkingSpots to be added to the store.
     */
    @action
    public assignParkingSpots(newParkingSpots: IParkingSpot[]) {
        let numNew: number = newParkingSpots.length;
        let newIds = newParkingSpots.map(obj => {
            return obj.id;
        });
        this.parkingSpots.forEach(spot => {
            if (newIds.includes(spot.id) == false) {
                newParkingSpots.push(spot);
            }
        });

        this.parkingSpots = newParkingSpots;
        console.log(
            "added/updated " +
                numNew +
                " parkingSpots, total number of parkingSpots now at " +
                this.parkingSpots.length
        );
    }
}
