import { IParkingSpot, IPosition } from "../types/ParkingSpots";
import { Store } from "../Store";

const defaultPosition: IPosition = {
    latitude: 57.7078,
    longitude: 11.9845
};

export async function getData(
    currentPosition: IPosition = defaultPosition,
    store: Store
) {
    let completeArray: IParkingSpot[] = Array<IParkingSpot>();
    await Promise.all([
        getParkingGothenburgData(),
        getQParkData(currentPosition)
    ]).then((result: (IParkingSpot[] | void)[]) => {
        result.forEach((data: IParkingSpot[] | void) => {
            completeArray = tryConcat(data, completeArray);
        });
        store.assignParkingSpots(completeArray);
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
