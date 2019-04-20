import { IParkingSpot, IPosition } from "../types/ParkingSpots";

const defaultPosition: IPosition = {
    latitude: 57.7078,
    longitude: 11.9845
};

export function getData(currentPosition: IPosition = defaultPosition) {
    let completeArray = Array<IParkingSpot>();
    completeArray.concat(getParkingGothenburgData());
    completeArray.concat(getQParkData(currentPosition));
    console.log("Complete data:::");
    console.log(completeArray);
}

function promiseToObject(
    promise: Promise<IParkingSpot[] | void>
): Array<IParkingSpot> {
    let result = Array<IParkingSpot>();
    promise.then(data => {
        try {
            if (data instanceof Array) {
                result = data as IParkingSpot[];
            } else {
                throw new Error("Invalid type");
            }
        } catch (error) {
            console.log("Unable to parse promise data to IParkingSpot array");
        }
    });
    console.log("result:");
    console.log(result);
    return result;
}

function getParkingGothenburgData(): Array<IParkingSpot> {
    console.log("Gathering data from parking gothenburg...");
    return promiseToObject(
        fetch(
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
            })
    );
}

function getQParkData(currentPosition: IPosition): Array<IParkingSpot> {
    console.log("Gathering data from q-park...");
    return promiseToObject(
        fetch("https://www.q-park.se/api/websitesearch/GetParkingFacilities", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                IsOnlineSales: false, // Settings this to true appears to only filter the list of parkingspots to a small subset.
                latitude: currentPosition.latitude,
                longitude: currentPosition.longitude
            })
        })
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
            })
    );
}
