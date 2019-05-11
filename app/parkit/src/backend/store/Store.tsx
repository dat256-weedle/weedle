import { action, computed, observable } from "mobx";
import { IParkingSpot, IParkingSession } from "./../../types";

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
     * List of all cars added in the UserPage
     */
    @observable
    public theCars: string[] = new Array();

    /**
     * The currently selected parking spot
     */
    @observable public selected: string;

    /**
     * List of all parking spots which are being rented by the user
     */
    @observable public oldParkingSessions: IParkingSession[] = new Array();


    @observable public currentParkingSessions: IParkingSession[] = new Array();

    constructor() {
        this.selected = "-1";
        this.theCars.push("abc12")
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
     * Adds a parking session to the parkingSessions list
     * @param parkingSession The parking spot to rent
     * @deprecated
     */
    @action
    public bookParkingSpot(parkingSession: IParkingSession) {
        this.currentParkingSessions.push(parkingSession);
    }

    /**
     * Removes a parking session from the parkingSessions list.
     * @param parkingSession The parking spot to finish renting
     * @throws If the parking spot is not already booked
     * @deprecated
     */
    @action
    public unBookParkingSpot(parkingSession: IParkingSession) {
        this.currentParkingSessions = this.currentParkingSessions.filter(
            (item) => parkingSession !== item
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
