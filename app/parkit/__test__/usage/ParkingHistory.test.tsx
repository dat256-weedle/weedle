import { render } from "enzyme";
import { Provider } from "mobx-react";
import React from "react";
import { Store } from "../../src/backend/store/Store";
import { Providers } from "../../src/types";
import ParkingHistory from "../../src/usage/parking-session-history/ParkingHistory";

const store: Store = new Store();

// TMP data, remove this later!!!
store.oldParkingSessions.push({
    car: "Car 1",
    parkingSpot: {
        id: "1234",
        name: "Asd gatan 12",
        price: "BS",
        specialPrice: "BS?",
        position: {
            latitude: 0,
            longitude: 0
        },
        description: "asdasdasd",
        provider: Providers.ParkeringGothenburg,
        distance: 0,
        parkingSpots: "0",
        specialDistance: 5
    },
    startTime: new Date(2019, 5, 14, 15, 30, 0, 0),
    endTime: new Date(2019, 5, 14, 15, 45, 0, 0),
    cost: 57
});

store.oldParkingSessions.push({
    car: "Car 2",
    parkingSpot: {
        id: "1234",
        name: "Trevliga gatan 82",
        price: "BS",
        specialPrice: "BS?",
        position: {
            latitude: 0,
            longitude: 0
        },
        description: "asdasdasd",
        provider: Providers.ParkeringGothenburg,
        distance: 0,
        parkingSpots: "0",
        specialDistance: 5
    },
    startTime: new Date(2019, 6, 8, 12, 0, 0, 0),
    endTime: new Date(2019, 6, 10, 15, 0, 0, 0),
    cost: 192
});

it("Should show two previous parkingsessions", () => {
    const app = render(
        <Provider store={store}>
            <ParkingHistory />
        </Provider>
    );
    expect(app.find("Trevliga gatan 82"));
});
