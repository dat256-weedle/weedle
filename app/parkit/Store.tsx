import { action, observable, configure, computed, ObservableMap } from 'mobx';
import data from './assets/temp.json';
import { IParkingSpot } from './types/ParkingSpots.js';
import { number } from 'prop-types';

/**
 * Store which contains the state of the whole application
 */
configure({ enforceActions: "always" })

export class Store {
	/**
     * All parking spots which have been loaded by the application mapped by their id
	* When this is made dynamic it should probably be made @observable
     */
	public allParkingSpots = new Map<number, IParkingSpot>((data.parkingspots as IParkingSpot[]).map((item) => [item.id, item]))

	/**
	 * The currently selected parking spot
	 */
	@observable public selected: number = -1;

	/**
     * List of all parking spots which are being rented by the user
     */
	@observable public bookedParkingSpots: number[] = new Array();

	/**
	 *@returns the coordinates of the currently selected parking spot
	 */
	@computed
	get selectedParkingSpot() {
		return this.allParkingSpots.get(this.selected)	
	}

	/**
	 * Unmapped version of the 'allParkingSpots' map
	 */
	@computed
	get allParkingSpotsList() {
		return Array.from(this.allParkingSpots.values())
	}

	/**
     * Adds a parking spot to the bookedParkingSpots list
     * @param parkingSpot The parking spot to rent
     * @throws If parking spot with the same id is already booked by user
     */
	@action
	public bookParkingSpot(parkingSpot: number) {
		if (this.bookedParkingSpots.includes(parkingSpot)) {
			throw new Error('Parking spot already booked');
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
			throw new Error('Parking spot is not booked');
		}
		this.bookedParkingSpots = this.bookedParkingSpots.filter((item) => parkingSpot !== item);
	}

}
