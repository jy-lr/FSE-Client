import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
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

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedGroup: {}
    }
  }

  saveSelectedGroupData = (selectedGroupData) => {
    this.setState({selectedGroup: selectedGroupData})
  }


  render () {

    const contextValue = {
      saveSelectedGroupData: this.saveSelectedGroupData,
      selectedGroup: this.state.selectedGroup,
    }

    return (
      <main className='App'>
        <Context.Provider value = {contextValue}>
          <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path='/groups' component={ChooseGroup}/>
            <Route path={"/profile/:group"} component={() => <Profile />}/>
            <Route path={"/rankings"} component={() => <GroupRankings />}/>
            <Route path={"/stock/:id"} component={() => <SingleStock />}/>
            <Route path={"/create-group"} component={() => <CreateGroup />}/>
            <Route path={"/search-user"} component={() => <SearchUser />}/>
            <Route path={"/register"} component={Register}/>
          </Switch>
        </Context.Provider>
      </main>
    );
  }
}

export default App;