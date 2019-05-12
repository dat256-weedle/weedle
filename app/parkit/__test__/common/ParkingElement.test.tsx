import { render } from "enzyme";
import React from "react";
import ParkingElement from "../../src/common/parkingelement/ParkingElement";

it("should render correctly", () => {
    const app = render(<ParkingElement distance={10} price={20} id={"id"}/>);
    expect(app.text()).toEqual("ID: id Distance: 10 kmPrice: 20 kr/h");
});
