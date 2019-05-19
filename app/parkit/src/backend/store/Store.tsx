import { action, computed, observable } from "mobx";
import { getDistance } from "../datagatherer/DataGatherer";
import { IParkingSession, IParkingSpot, IPosition } from "./../../types";

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
        this.theCars.push("abc12");
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
        return Array.from(this.allParkingSpots.values()).slice(0, 5);
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

    /**
     * Returns an array of parkingspots of max length limit, sorted in order of distance to the given position.
     * Also sets the distance property of the parkingSpot to the distance to the given position.
     */
    public getParkingSpotsByDistance(
        position: IPosition,
        limit: number
    ): IParkingSpot[] {
        const parkingSpotToDistMap: Map<IParkingSpot, number> = new Map<
            IParkingSpot,
            number
        >();

        // Map all the parkingspots to their distance to the 'position'.
        Array.from(this.allParkingSpots.values()).forEach(
            (parkingSpot: IParkingSpot) => {
                const distance: number = getDistance(
                    parkingSpot.position,
                    position
                );
                parkingSpot.distance = Math.trunc(distance as number);
                parkingSpotToDistMap.set(parkingSpot, distance);
            }
        );

        // Now convert the map back to an array and sort it on distance.
        const pSpots: IParkingSpot[] = Array.from(
            parkingSpotToDistMap.keys()
        ).sort((a: IParkingSpot, b: IParkingSpot) => {
            const valA = parkingSpotToDistMap.get(a);
            const valB = parkingSpotToDistMap.get(b);
            if (typeof valA === "number" && typeof valB === "number") {
                if (valA > valB) {
                    return 1;
                } else if (valA < valB) {
                    return -1;
                }
            }

            return 0;
        });

        if (limit > 0 && pSpots.length > 0) {
            // Filter out the 'limit' highest results.
            const result: IParkingSpot[] = new Array<IParkingSpot>();
            for (let i = 0; i < pSpots.length && i < limit; i++) {
                result[i] = pSpots[i];
            }

            return result;
        } else {
            return pSpots;
        }
    }
}
