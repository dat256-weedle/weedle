import { IParkingSpot, IPosition, Providers } from "./../../types";
import { Store } from "./../store/Store";

/**
 * Converts degrees to radians.
 * @param degrees The degrees to be converted.
 * @returns The radian conversion of the given degrees.
 */
function degToRad(degrees: number): number {
    return (degrees * Math.PI) / 180;
}

/**
 * Calculates the distance between two positions
 * @param pos1 an IPosition coordinate
 * @param pos2 another IPosition coordinate
 * @returns The distance in meters
 */
export function getDistance(pos1: IPosition, pos2: IPosition): number {
    const earthRadius = 6371000; // The earths average radius in meters.
    if (pos1.latitude === pos2.latitude && pos1.longitude === pos2.longitude) {
        return 0;
    }

    const deltaLat = degToRad(Math.abs(pos1.latitude - pos2.latitude));
    const deltaLon = degToRad(Math.abs(pos1.longitude - pos2.longitude));
    const a =
        Math.pow(Math.sin(deltaLat / 2), 2) +
        Math.cos(degToRad(pos1.latitude)) *
            Math.cos(degToRad(pos2.latitude)) *
            Math.pow(Math.sin(deltaLon / 2), 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return c * earthRadius;
}

const defaultPosition: IPosition = {
    latitude: 57.7078,
    longitude: 11.9845
};

/**
 * Gathers parkingspotdata from different sources and adds them to the given store.
 * @param store The programs mobx store.
 * @param currentPosition The current position of the user.
 */
export function getData(
    store: Store,
    currentPosition: IPosition = defaultPosition
) {
    assignToStore(getParkingGothenburgData(), store);
    assignToStore(getQParkData(currentPosition), store);
}

/**
 * Tries to extract the relevant data from the promise and assign it to the store.
 * @param data The parkingspots to be assigned to the store.
 * @param store The projects shared store.
 */
function assignToStore(data: Promise<IParkingSpot[] | void>, store: Store) {
    data.then((result: IParkingSpot[] | void) => {
        if (result instanceof Array) {
            store.assignParkingSpots(result);
        }
    }).catch(error => {
        console.log(error);
    });
}

/**
 * Tries to retrieve parkingspot-data from parkingGothenburg.
 * @returns A promise of either a IParkingSpot[] or void if an error occured.
 */
function getParkingGothenburgData(): Promise<IParkingSpot[] | void> {
    console.log("Gathering data from parking gothenburg...");
    return fetch(
        "https://www.parkeringgoteborg.se/api/parkings/besoksomraden?parkingtype=1&vehicletype=1",
        {
            method: "GET"
        }
    )
        .then(response => {
            return response.json();
        })
        .then(data => {
            const arr = new Array<IParkingSpot>();
            if (data) {
                data.forEach((obj: any) => {
                    const pos: IPosition = {
                        longitude: obj.lng as number,
                        latitude: obj.lat as number
                    };

                    // The distance should possibly be calculated in the future.
                    const newObj: IParkingSpot = {
                        name: obj.title,
                        position: pos,
                        id: obj.id,
                        description: obj.id,
                        distance: -1,
                        provider: Providers.ParkeringGothenburg,
                        price: obj.regularPrice,
                        specialPrice: obj.otherPrice,
                        parkingSpots: obj.amountOfSpots
                    };

                    if (newObj.price) {
                        let price: string = "";
                        for (let i: number = 0; i < newObj.price.length; i++) {
                            if ("0123456789".indexOf(newObj.price[i]) !== -1) {
                                price = price + newObj.price[i];
                            } else {
                                break;
                            }
                        }

                        if (price.length > 0) {
                            price += " kr/h";
                        } else {
                            price = "Okänd kostnad";
                        }
                        newObj.price = price;
                    }

                    arr.push(newObj);
                });
            }

            console.log(
                "Loaded:: " +
                    arr.length +
                    " parkingspots from Parking Gothenburg"
            );
            return arr;
        })
        .catch(error => {
            console.error(error);
        });
}

/**
 * Tries to retrieve parkingspot-data from Q-Park.
 * @returns A promise of either a IParkingSpot[] or void if an error occured.
 */
function getQParkData(
    currentPosition: IPosition
): Promise<IParkingSpot[] | void> {
    console.log("Gathering data from q-park...");
    return fetch(
        "https://www.q-park.se/api/websitesearch/GetParkingFacilities",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                IsOnlineSales: false, // Settings this to true appears to only filter the list of parkingspots to a small subset.
                latitude: currentPosition.latitude,
                longitude: currentPosition.longitude
            })
        }
    )
        .then(response => {
            return response.json();
        })
        .then(data => {
            const formattedArray = Array<IParkingSpot>();

            if (data && data.ParkingFacilities) {
                data.ParkingFacilities.forEach((obj: any) => {
                    const pos: IPosition = {
                        longitude: obj.Longitude,
                        latitude: obj.Latitude
                    };

                    const parkingSpot: IParkingSpot = {
                        name: obj.Title,
                        position: pos,
                        id: obj.ID,
                        description: obj.Description,
                        distance: obj.Distance,
                        provider: Providers.QPark,
                        price: "unknown",
                        specialPrice: "unknown",
                        parkingSpots: "unknown"
                    };

                    formattedArray.push(parkingSpot);
                });
            }
            console.log();
            return formattedArray;
        })
        .catch(error => {
            console.log(error);
        });
}
