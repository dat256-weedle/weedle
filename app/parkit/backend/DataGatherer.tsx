import { IParkingSpot, IPosition } from "../types/ParkingSpots";

export function getData() {
    getParkingGothenburgData();
}

function getParkingGothenburgData() {
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
            var arr = new Array<IParkingSpot>();

            data.map(obj => {
                const position: IPosition = {
                    lat: obj.lat as number,
                    lng: obj.lng as number
                };

                const newObj: IParkingSpot = {
                    name: obj.title,
                    pos: position
                };
                /*
                var newObj = {
                    id: obj.id,
                    pos: {
                        lat: obj.lat,
                        lng: obj.lng
                    },
                    parkingSpots: obj.amountOfSpots,
                    provider: "ParkingGothenburg",
                    price: obj.regularPrice,
                    specialPrice: obj.otherPrice
                };
                */

                arr.push(newObj);
            });

            return arr;
        })
        .catch(error => {
            console.error(error);
        });
}
