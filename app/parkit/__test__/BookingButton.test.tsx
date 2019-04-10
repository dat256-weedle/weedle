import { render } from "enzyme";
import React from "react";
import App from "../App";
import BookingButton from '../common/BookingButton';

it("Should render correctly", () => {
    const app = render(<BookingButton id = {3} />);
    expect(app.text()).toEqual("Open up App.tsx to start working on your app!");
});
