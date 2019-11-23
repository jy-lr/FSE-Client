import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import ChooseGroup from '../Components/ChooseGroup/ChooseGroup';

it("ChooseGroup renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <BrowserRouter>
            <ChooseGroup />
        </BrowserRouter>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
})