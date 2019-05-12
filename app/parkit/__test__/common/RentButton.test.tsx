import { mount } from "enzyme";
import React from "react";
import { Button } from "react-native-material-ui";
import { Store } from "../../src/backend/store/Store";
import RentButton from "../../src/common/rentpage/RentButton";
import { IParkingSpot, Providers } from "../../src/types";

const id = (Math.random() * Number.MAX_VALUE).toString();
const store = new Store();
const parkingSpot: IParkingSpot = {id, name: "", position: {latitude: 0, longitude: 0}, description: "", price: "", specialPrice: "", parkingSpots: "", distance: 0, provider: Providers.EasyPark}
const app = mount(<RentButton  store={store} parkingSpot={parkingSpot} car="car" isParked={false} />);

it("Should add sessions to the store when clicked", () => {
    app.find(Button).props().onPress!();

    expect(store.currentParkingSessions.find((item) => item.parkingSpot.id === id)).toBeDefined();
});

it("Should remove sessions from the store when clicked again", () => {
    expect(store.currentParkingSessions.find((item) => item.parkingSpot.id === id)).toBeDefined();
    
    const app = mount(<RentButton  store={store} parkingSpot={parkingSpot} car="car" isParked={true} />);

    app.find(Button).props().onPress!();

    expect(store.currentParkingSessions.length).toEqual(0);
});
