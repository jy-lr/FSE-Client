import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import BuyStock from '../Components/BuyStock/BuyStock';

it("BuyStock renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <BrowserRouter>
            <BuyStock />
        </BrowserRouter>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
})