import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import CreateGroup from '../Components/CreateGroup/CreateGroup';

it("CreateGroup renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <BrowserRouter>
            <CreateGroup />
        </BrowserRouter>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
})