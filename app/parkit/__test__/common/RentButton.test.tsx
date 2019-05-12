import { mount } from "enzyme";
import React from "react";
import { Button } from "react-native-material-ui";
import { Store } from "../../src/backend/store/Store";
import RentButton from "../../src/common/rentpage/RentButton";

const id = (Math.random() * Number.MAX_VALUE).toString();
const store = new Store();
let app = mount(<RentButton  store={store} />);

it("Should add ids to the store when clicked", () => {
    app.find(Button).props().onPress!();

    expect(store.bookedParkingSpots).toContain(id);
});

it("Should remove ids from the store when clicked again", () => {
    expect(store.bookedParkingSpots).toContain(id);
    app = mount(<RentButton disabled ={false} id={id} store={store} />);

    app.find(Button).props().onPress!();

    expect(store.bookedParkingSpots.length).toEqual(0);
});
