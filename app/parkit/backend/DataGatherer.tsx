import { IParkingSpot, IPosition } from "../types/ParkingSpots";
import { Store } from "../Store";

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
    let earthRadius = 6371000; // The earths average radius in meters.
    if (pos1.latitude == pos2.latitude && pos1.longitude == pos2.longitude) {
        return 0;
    }

    let deltaLat = degToRad(Math.abs(pos1.latitude - pos2.latitude));
    let deltaLon = degToRad(Math.abs(pos1.longitude - pos2.longitude));
    let a =
        Math.pow(Math.sin(deltaLat / 2), 2) +
        Math.cos(degToRad(pos1.latitude)) *
            Math.cos(degToRad(pos2.latitude)) *
            Math.pow(Math.sin(deltaLon / 2), 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return c * earthRadius;
}

const defaultPosition: IPosition = {
    latitude: 57.7078,
    longitude: 11.9845
};

export async function getData(
    store: Store,
    currentPosition: IPosition = defaultPosition
) {
    let completeArray: IParkingSpot[] = Array<IParkingSpot>();
    await Promise.all([
        getParkingGothenburgData(),
        getQParkData(currentPosition)
    ]).then((result: (IParkingSpot[] | void)[]) => {
        result.forEach((data: IParkingSpot[] | void) => {
            completeArray = tryConcat(data, completeArray);
        });
        console.log(
            "Assigning " + completeArray.length + " parking spots to store."
        );
        store.assignParkingSpots(completeArray);

        store.parkingSpots.forEach(obj => {
            console.log("");
        });
    });
}

function tryConcat(
    data: IParkingSpot[] | void,
    completeArray: IParkingSpot[]
): IParkingSpot[] {
    try {
        if (typeof data === "object") {
            return completeArray.concat(data as IParkingSpot[]);
        }
    } catch (error) {
        console.log(error);
    }
    return completeArray;
}

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
            let arr = new Array<IParkingSpot>();

            data.forEach((obj: any) => {
                let pos: IPosition = {
                    longitude: obj.lng as number,
                    latitude: obj.lat as number
                };

                // The distance should possibly be calculated in the future.
                let newObj: IParkingSpot = {
                    name: obj.title,
                    position: pos,
                    id: obj.id,
                    description: obj.id,
                    distance: -1,
                    provider: "ParkeringGothenburg",
                    price: obj.regularPrice,
                    specialPrice: obj.otherPrice,
                    parkingSpots: obj.amountOfSpots
                };

                arr.push(newObj);
            });

            return arr;
        })
        .catch(error => {
            console.error(error);
        });
}

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
            let formattedArray = Array<IParkingSpot>();
            data.ParkingFacilities.forEach((obj: any) => {
                let pos: IPosition = {
                    longitude: obj.Longitude,
                    latitude: obj.Latitude
                };

                let parkingSpot: IParkingSpot = {
                    name: obj.Title,
                    position: pos,
                    id: obj.ID,
                    description: obj.Description,
                    distance: obj.Distance,
                    provider: "Q-Park",
                    price: "unknown",
                    specialPrice: "unknown",
                    parkingSpots: "unknown"
                };

                formattedArray.push(parkingSpot);
            });
            return formattedArray;
        })
        .catch(error => {
            console.log(error);
        });
}
