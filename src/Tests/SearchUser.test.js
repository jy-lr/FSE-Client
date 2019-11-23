import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import SearchUser from '../Components/SearchUser/SearchUser';

it("SearchUser renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <BrowserRouter>
            <SearchUser />
        </BrowserRouter>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
})