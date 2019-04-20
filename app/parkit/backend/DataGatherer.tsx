import { IParkingSpot, IPosition } from "../types/ParkingSpots";
import console = require("console");

export function getData() {
    console.log("Gathering data from parking gothenburg...");
    getParkingGothenburgData().then(data => console.log(data));
    getQParkData().then(data => console.log(data));
}

function getParkingGothenburgData() {
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
            var arr = new Array<IParkingSpot>();

            data.map((obj: any) => {
                const pos: IPosition = {
                    longitude: obj.lng as number,
                    latitude: obj.lat as number
                };

                // The distance should possibly be calculated in the future.
                const newObj: IParkingSpot = {
                    name: obj.title as string,
                    position: pos,
                    id: obj.id as number,
                    description: obj.id as string,
                    distance: -1,
                    provider: "ParkeringGothenburg",
                    price: obj.regularPrice,
                    specialPrice: obj.otherPrice,
                    parkingSpots: obj.amountOfSpots as number
                };

                arr.push(newObj);
            });

            return arr;
        })
        .catch(error => {
            console.error(error);
        });
}
