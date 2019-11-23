import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Login from '../Components/Login/Login';

it("Login renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
})