import { mount } from "enzyme";
import moment from "moment";
import React from "react";
import DatePicker from "react-native-datepicker";
import { Store } from "../../src/backend/store/Store";
import RentPage from "../../src/common/rentpage/RentPage";
import { IParkingSpot, Providers } from "../../src/types";


const id = (Math.random() * Number.MAX_VALUE).toString();
const store = new Store();
const parkingSpot: IParkingSpot = {id, name: "", position: {latitude: 0, longitude: 0}, description: "", price: "", specialPrice: "", parkingSpots: "", distance: 0, provider: Providers.EasyPark}
const app = mount(<RentPage  store={store} parkingSpot={parkingSpot} onCloseButtonPress={() => null} />);

it("Date picker should not be disabled if parking spot is rented", () => {
    expect(app.find(DatePicker).props().disabled).toBeFalsy();
});

it("Date picker should be disabled if parking spot is rented", () => {
    store.currentParkingSessions.push({parkingSpot, car: "aaa", startTime: moment().toDate(), endTime: moment().toDate()})
    expect(app.find(DatePicker).props().disabled).toBeTruthy();
});