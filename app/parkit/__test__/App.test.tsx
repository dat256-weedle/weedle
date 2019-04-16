import { mount } from "enzyme";
import React from "react";
import App from "../App";

it("Should render correctly", () => {
    const app = mount(<App />);
    expect(app.text()).toEqual("RENT");
});
