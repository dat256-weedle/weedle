import { render } from "enzyme";
import React from "react";
import List from "../../use-cases/main/list/List";
import { IParkingSpot } from "../../types/ParkingSpots";

it("Should show a list with parking-elements ", () => {
    let data = new Array<IParkingSpot>();
    data.push(
        {
            position: { longitude: 0.5, latitude: 1.2 },
            name: "hej",
            distance: 5,
            city: "hallon",
            owner: "someDude"
        },
        {
            position: { longitude: 1.2, latitude: 1.7 },
            name: "då",
            distance: 15,
            city: "gbg",
            owner: "Derp"
        },
        {
            position: { longitude: 0.5, latitude: 1.2 },
            name: "!",
            distance: 25,
            city: "Göteborg",
            owner: "ASd"
        }
    );

    const app = render(<List array={data} />);
    expect(app.text()).toEqual(
        "ID: 0 Distance: 5 kmPrice: 0 kr/hID: 1 Distance: 15 kmPrice: 0 kr/hID: 2 Distance: 25 kmPrice: 0 kr/h"
    );
});
