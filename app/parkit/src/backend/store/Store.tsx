import { action, computed, observable } from "mobx";
import { IParkingSpot } from "./../../types";

/**
 * Store which contains the state of the whole application
 */
// configure({ enforceActions: "always" });

export class Store {
    /**
     * All parking spots which have been loaded by the application mapped by their id
     * When this is made dynamic it should probably be made @observable
     */
    @observable.shallow
    public allParkingSpots: Map<string, IParkingSpot> = new Map<
        string,
        IParkingSpot
    >();

    /**
     * The currently selected parking spot
     */
    @observable public selected: string;

    /**
     * List of all parking spots which are being rented by the user
     */
    @observable public bookedParkingSpots: string[] = new Array();

    constructor() {
        this.selected = "-1";
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
    public bookParkingSpot(parkingSpot: string) {
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
    public unBookParkingSpot(parkingSpot: string) {
        if (!this.bookedParkingSpots.includes(parkingSpot)) {
            throw new Error("Parking spot is not booked");
        }
        this.bookedParkingSpots = this.bookedParkingSpots.filter(
            item => parkingSpot !== item
        );
        this.bookedParkingSpots = this.bookedParkingSpots.filter(
            item => parkingSpot !== item
        );
    }

    /**
     * Adds / updates parking spots to the store.
     * @param newParkingSpots parkingSpots to be added to the store.
     */
    @action
    public assignParkingSpots(newParkingSpots: IParkingSpot[]) {
        const numNew: number = newParkingSpots.length;
        const newAllParkingSpots = new Map<string, IParkingSpot>();

        newParkingSpots.forEach((obj: IParkingSpot) => {
            newAllParkingSpots.set(obj.id, obj);
        });

        if (this.allParkingSpots) {
            this.allParkingSpots.forEach((value: IParkingSpot, key: string) => {
                if (newAllParkingSpots.has(key) === false) {
                    newAllParkingSpots.set(key, value);
                }
            });
        }

        this.allParkingSpots = newAllParkingSpots;
        console.log(
            "added/updated " +
                numNew +
                " parkingSpots, total number of parkingSpots now at " +
                this.allParkingSpots.size
        );
    }
}
