import { action, computed, observable } from "mobx";
import data from "./assets/temp.json";
import { IParkingSpot } from "./types/ParkingSpots.js";

/**
 * Store which contains the state of the whole application
 */
// configure({ enforceActions: "always" });

export class Store {

    /**
     * All parking spots which have been loaded by the application mapped by their id
     * When this is made dynamic it should probably be made @observable
     */
    public allParkingSpots: Map<number, IParkingSpot> = new Map<number, IParkingSpot>();

    /**
     * The currently selected parking spot
     */
    @observable public selected: number;

    /**
     * List of all parking spots which are being rented by the user
     */
    @observable public bookedParkingSpots: number[] = new Array();

    constructor() {
        (data.parkingspots as IParkingSpot[])
        .forEach((parkingSpot) => this.allParkingSpots.set(parkingSpot.id, parkingSpot));
        this.selected = -1;
    }
    /**
     * @returns the coordinates of the currently selected parking spot
     */
    @computed
    get selectedParkingSpot() {
        return this.allParkingSpots.get(this.selected);
    }

    /**
     * * Unmapped version of the 'allParkingSpots' map
     */
    @computed
    get allParkingSpotsList() {
        return Array.from(this.allParkingSpots.values());
    }

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
        this.bookedParkingSpots = this.bookedParkingSpots.filter((item) => parkingSpot !== item);
    }

}
