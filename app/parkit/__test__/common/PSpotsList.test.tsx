import { render } from "enzyme";
import React from "react";
import { IParkingSpot, Providers } from "../../src/types";
import PSpotsList from "../../src/usage/list-pspots/PSpotsList";

it("Should show a list with parking-elements ", () => {
    const data = new Array<IParkingSpot>();
    data.push(
        {
            id: "000001",
            position: { longitude: 0.5, latitude: 1.2 },
            name: "hej",
            description: "In some guys basement!",
            parkingSpots: "1, only for small vehicles.",
            distance: 5,
            provider: Providers.ParkeringGothenburg,
            price: "15kr / h",
            specialPrice: "150kr / h",
            specialDistance: 5
        },
        {
            id: "000002",
            position: { longitude: 1.5, latitude: 2.9 },
            name: "då",
            description: "The largest parking house in the world",
            parkingSpots: "221 million cars",
            distance: 15000,
            provider: Providers.QPark,
            price: "1$ / year",
            specialPrice: "2$ / year, for americans only!",
            specialDistance: 5
        },
        {
            id: "000003",
            position: { longitude: 29000, latitude: 1400 },
            name: "some fun place",
            description: "Parking for some fun place",
            parkingSpots: "42 cars",
            distance: 150,
            provider: Providers.EasyPark,
            price: "195kr / h",
            specialPrice: "250kr / h during christmas",
            specialDistance: 5
        }
    );

    const app = render(<PSpotsList array={data} />);
    expect(app.text()).toEqual(
        "ID: 0 Distance: 5 kmPrice: 0 kr/hID: 1 Distance: 15000 kmPrice: 0 kr/hID: 2 Distance: 150 kmPrice: 0 kr/h"
    );
});
