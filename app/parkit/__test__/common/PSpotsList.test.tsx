import { render } from "enzyme";
import React from "react";
import { IParkingSpot } from "../../types/ParkingSpots";
import PSpotsList from "../../use-cases/main/list-pspots/PSpotsList";

it("Should show a list with parking-elements ", () => {
    let data = new Array<IParkingSpot>();
    data.push(
        {
            id: "000001",
            position: { longitude: 0.5, latitude: 1.2 },
            name: "hej",
            description: "In some guys basement!",
            parkingSpots: "1, only for small vehicles.",
            distance: 5,
            provider: "Some_guy",
            price: "15kr / h",
            specialPrice: "150kr / h"
        },
        {
            id: "000002",
            position: { longitude: 1.5, latitude: 2.9 },
            name: "då",
            description: "The largest parking house in the world",
            parkingSpots: "221 million cars",
            distance: 15000,
            provider: "WPO, the World Parking Organization",
            price: "1$ / year",
            specialPrice: "2$ / year, for americans only!"
        },
        {
            id: "000003",
            position: { longitude: 29000, latitude: 1400 },
            name: "some fun place",
            description: "Parking for some fun place",
            parkingSpots: "42 cars",
            distance: 150,
            provider: "Some Fun Place Inc",
            price: "195kr / h",
            specialPrice: "250kr / h during christmas"
        }
    );

    const app = render(<PSpotsList array={data} />);
    expect(app.text()).toEqual(
        "ID: 0 Distance: 5 kmPrice: 0 kr/hID: 1 Distance: 15000 kmPrice: 0 kr/hID: 2 Distance: 150 kmPrice: 0 kr/h"
    );
});
