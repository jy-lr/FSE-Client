import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import SellStock from '../Components/SellStock/SellStock';
import Context from '../Components/Context/Context';

const contextValue = {
  selectedGroup: {
      cash_balance: 7220,
      date_created: "2019-11-20T05:23:44.888Z",
      group_name: "cool",
      groupid: 1,
      id: 1,
      user_name: "admin",
      userid: 1 
  }
}


it("SellStock renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <BrowserRouter>
          <Context.Provider value = {contextValue}>
            <SellStock />
          </Context.Provider>
        </BrowserRouter>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
})