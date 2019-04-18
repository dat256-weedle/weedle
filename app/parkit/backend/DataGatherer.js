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
            console.log(response);
        })
        .catch(error => {
            console.error(error);
        });
}
