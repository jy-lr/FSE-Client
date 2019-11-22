import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
// import PrivateRoute from './Utilities/PrivateRoute';
// import PublicOnlyRoute from './Utilities/PublicOnlyRoute';
import Login from './Components/Login/Login';
import ChooseGroup from './Components/ChooseGroup/ChooseGroup';
import Profile from './Components/Profile/Profile';
import GroupRankings from './Components/GroupRankings/GroupRankings';
import SingleStock from './Components/SingleStock/SingleStock';
import CreateGroup from './Components/CreateGroup/CreateGroup';
import SearchUser from './Components/SearchUser/SearchUser';
import Register from './Components/Register/Register';
import Context from './Components/Context/Context';
import BuyStock from './Components/BuyStock/BuyStock';
import SellStock from './Components/SellStock/SellStock';
import userGroupService from './Services/user-group-service'
import Graph from './Components/Graph/linearGraph'

class App extends React.Component {
   

  constructor(props) {
    super(props)
    this.state = {
      selectedGroup: {},
      updateBalanceGroup: {},
    }
  }

  saveSelectedGroupData = (selectedGroupData) => {
    this.setState({
      selectedGroup: selectedGroupData,
      updateBalanceGroup: selectedGroupData
    })
  }

  updateSelectedGroupData = updatedBalance => {
    const id = parseInt(this.state.selectedGroup.id)
    const cashBalance = parseInt(updatedBalance)
    userGroupService.updateCashBalance(id, cashBalance)
      .then(data => data)
      
    this.setState(prevState => {
      let updateBalanceGroup = Object.assign({}, prevState.updateBalanceGroup)
      updateBalanceGroup.cash_balance = cashBalance
      return {updateBalanceGroup}
    })
    
  }

  updateSelectedGroupData() {
    userGroupService.getAllofUsersGroups()
    .then(userGroups => userGroups)
  }




  render () {

    const contextValue = {
      saveSelectedGroupData: this.saveSelectedGroupData,
      selectedGroup: this.state.selectedGroup,
      updateSelectedGroupData: this.updateSelectedGroupData,
      updateBalance: this.state.updateBalanceGroup
    }

    return (
      <main className='App'>
        <Context.Provider value = {contextValue}>
          <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/groups" component={ChooseGroup}/>
            <Route exact path="/profile/:groupid" component={(props) => <Profile key={props.match.params.groupid}/>}/>
            <Route exact path={"/rankings"} component={() => <GroupRankings />}/>
            <Route exact path="/stock/:id" component={SingleStock}/>
            <Route exact path={"/create-group"} component={() => <CreateGroup />}/>
            <Route exact path={"/search-user"} component={() => <SearchUser />}/>
            <Route exact path={"/buy"} component={() => <BuyStock />}/>
            <Route exact path={"/sell"} component={() => <SellStock />}/>
            <Route exact path={"/register"} component={Register}/>
            <Route exact path='/graph' component={Graph}/>
          </Switch>
        </Context.Provider>
      </main>
    );
  }
}

export default App;