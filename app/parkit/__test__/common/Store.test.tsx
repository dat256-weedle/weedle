import { Store } from "../../src/backend/store/Store";
import { IParkingSpot, IPosition, Providers } from "../../src/types";

const store: Store = new Store();
const parkingSpots: IParkingSpot[] = new Array<IParkingSpot>();

parkingSpots.push(
    {
        id: "0",
        position: {
            latitude: 10.0,
            longitude: 10.0
        },
        name: "Närmgatan",
        description: "Some beskrivning",
        distance: 5.2,
        provider: Providers.ParkeringGothenburg,
        price: "25 kr/h",
        specialPrice: "25 kr/h",
        parkingSpots: "I don't know"
    },
    {
        id: "1",
        position: {
            latitude: 12.0,
            longitude: 12.0
        },
        name: "Andra Närmgatan",
        description: "Some beskrivning",
        distance: 5.2,
        provider: Providers.ParkeringGothenburg,
        price: "25 kr/h",
        specialPrice: "25 kr/h",
        parkingSpots: "I have made you pay for it"
    },
    {
        id: "2",
        position: {
            latitude: 15.0,
            longitude: 15.0
        },
        name: "Tredje Närmgatan",
        description: "Some beskrivning",
        distance: 5.2,
        provider: Providers.ParkeringGothenburg,
        price: "25 kr/h",
        specialPrice: "25 kr/h",
        parkingSpots: "I don't know"
    }
);

store.assignParkingSpots(parkingSpots);
const searchPosition: IPosition = {
    latitude: 15,
    longitude: 15
};

it("should be sorted by distance", () => {
    expect(
        store
            .getParkingSpotsByDistance(searchPosition, 3)
            .map((obj: IParkingSpot) => {
                return obj.id;
            })
    ).toEqual(["2", "1", "0"]);
});
