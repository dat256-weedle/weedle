import { action, computed, observable } from "mobx";
import { getDistance } from "../datagatherer/DataGatherer";
import {
    asyncStorageKeys,
    getObjectFromAsyncStorage,
    setObjectInAsyncStorage
} from "../storage/Asyncstorage";
import {
    ICreditCard,
    IParkingSession,
    IParkingSpot,
    IPosition
} from "./../../types";

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
     * CreditCard used in Userpage
     */
    @observable
    public creditCard: ICreditCard = { number: "", expiry: "", cvc: "" };

    /**
     * List of all cars added in the UserPage
     */
    @observable
    public cars: string[] = new Array();

    /**
     * The email added in the UserPage
     */
    @observable
    public email: string = "";

    /**
     * The currently selected parking spot
     */
    @observable public selected: string = "-1";

    /**
     * List of all parking spots which are being rented by the user
     */
    @observable public oldParkingSessions: IParkingSession[] = new Array();

    @observable public currentParkingSessions: IParkingSession[] = new Array();

    constructor() {
        this.initializeStoreFromStorage();
    }
    /**
     * @returns the coordinates of the currently selected parking spot
     */
    @computed
    get selectedParkingSpot() {
        return this.allParkingSpots.get(this.selected);
    }

    /**
     * Unmapped version of the 'allParkingSpots' map
     */
    @computed
    get allParkingSpotsList() {
        return Array.from(this.allParkingSpots.values());
    }

    /**
     * Returns the parking history sorted based on the date when they were added
     */
    @computed
    public get sortedParkingHistory(): IParkingSession[] {
        return this.oldParkingSessions.slice().sort(
            (a: IParkingSession, b: IParkingSession): number => {
                return b.endTime.getTime() - a.endTime.getTime();
            }
        );
    }

    /**
     * Initializes the store from previously stored items in AsyncStorage
     */
    @action
    public initializeStoreFromStorage() {
        getObjectFromAsyncStorage(asyncStorageKeys.CREDITCARD).then(
            (card: ICreditCard | undefined) =>
                typeof card === "object" ? this.setCreditCard(card) : {}
        );
        getObjectFromAsyncStorage(asyncStorageKeys.EMAIL).then(
            (email: string | undefined) =>
                typeof email === "string" ? this.setEmail(email) : {}
        );

        getObjectFromAsyncStorage(asyncStorageKeys.CARS).then(
            (cars: string[] | undefined) =>
                typeof cars === "object"
                    ? cars.map(car => this.addCar(car))
                    : {}
        );
    }

    @action
    public setCreditCard(card: ICreditCard) {
        this.creditCard = card;
        setObjectInAsyncStorage(asyncStorageKeys.CREDITCARD, card);
    }

    /**
     * Set email and stores new email in AsyncStorage
     */
    @action
    public setEmail(email: string) {
        this.email = email;
        setObjectInAsyncStorage(asyncStorageKeys.EMAIL, email);
    }

    /**
     * Adds car to this.cars and saves updated list of cars to AsyncStorage
     * @param value car regnumber to be stored
     */
    @action
    public addCar(value: string) {
        this.cars.push(value);
        setObjectInAsyncStorage(asyncStorageKeys.CARS, this.cars);
    }

    /**
     * Removes car from this.cars and saves the updated list of cars to AsyncStorage
     * @param value car regnumber to be removed
     */
    @action
    public removeCar(value: string) {
        const index = this.cars.indexOf(value);
        this.cars.splice(index, 1);
        setObjectInAsyncStorage(asyncStorageKeys.CARS, this.cars);
        // console.log(index, this.cars);
    }

    /**
     * Adds/updates parkingspots to the store.
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
