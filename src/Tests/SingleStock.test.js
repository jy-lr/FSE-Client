import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import SingleStock from '../Components/SingleStock/SingleStock';
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
  },
  updateBalance: {cash_balance: 10000}
}

it("SingleStock renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <BrowserRouter>
          <Context.Provider value = {contextValue}>
            <SingleStock match={{params: {id: 1}}}/>
          </Context.Provider>
        </BrowserRouter>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
})