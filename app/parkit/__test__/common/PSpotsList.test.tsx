import { render } from "enzyme";
import React from "react";
import { IParkingSpot } from "../../types/ParkingSpots";
import PSpotsList from "../../use-cases/main/list-pspots/PSpotsList";

it("Should show a list with parking-elements ", () => {
    let data = new Array<IParkingSpot>();
    data.push(
        {
            id: 0,
            position: { longitude: 0.5, latitude: 1.2 },
            name: "hej",
            distance: 5,
            city: "hallon",
            owner: "someDude"
        },
        {
            id: 1,
            position: { longitude: 1.2, latitude: 1.7 },
            name: "då",
            distance: 15,
            city: "gbg",
            owner: "Derp"
        },
        {
            id: 2,
            position: { longitude: 0.5, latitude: 1.2 },
            name: "!",
            distance: 25,
            city: "Göteborg",
            owner: "ASd"
        }
    );

    const app = render(<PSpotsList array={data} />);
    expect(app.text()).toEqual(
        "ID: 0 Distance: 5 kmPrice: 0 kr/hID: 1 Distance: 15 kmPrice: 0 kr/hID: 2 Distance: 25 kmPrice: 0 kr/h"
    );
});
