import { IParkingSpot } from "types";

const googleAPIKey = "AIzaSyAcE3_PtX7wAF5E9haD9SOKWp97PnSB_o0";
const zoomLevel = 15;

/**
 * Returns a URL to an image of the parking spot with a marker in the middle
 * @param parkingSpot the parking spot
 */
export function snapshotMap(parkingSpot: IParkingSpot) {

    const address = `https://maps.googleapis.com/maps/api/staticmap?center=${parkingSpot.position.latitude},${parkingSpot.position.longitude}&zoom=${zoomLevel}&size=300x300&maptype=roadmap&markers=color:red%7Clabel:P%7C${parkingSpot.position.latitude},${parkingSpot.position.longitude}&key=${googleAPIKey}`;

    return(address);

}