import { render } from "enzyme";
import React from "react";
import App from "../App";

it("Should render correctly", () => {
    const app = render(<App />);
    expect(app.text()).toEqual("Open up App.tsx to start working on your app!")
});
