import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Graph from '../Components/Graph/daysLeftGraph';

it("Graph renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <BrowserRouter>
            <Graph />
        </BrowserRouter>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
})