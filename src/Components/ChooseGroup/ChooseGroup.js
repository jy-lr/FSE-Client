import React from 'react';
import { Link } from 'react-router-dom';
import './ChooseGroup.css'
import Nav from '../Nav/Nav';
import UserService from '../../Services/UserService'
import Context from '../Context/Context'

//api get usergroup

class ChooseGroup extends React.Component {
  static contextType = Context

  state = {
    userGroups: []
  }

  componentDidMount = () => {
    UserService.getAllofUsersGroups()
    .then(userGroups => this.setState({userGroups}))
  }

  handleClick = (group) => {
    this.context.saveSelectedGroupData(group)
  }

  render(){
    return (
      <>
      <Nav />
      <div className="ChooseGroup">
        {this.state.userGroups.map(group => {
          return (
            <Link to={`/profile/${group.group_name}`}>
              <div className="group" onClick={() => this.handleClick(group)}>
                <h3>{group.group_name}</h3>
                <h5>{group.timeLeft} days left</h5>
              </div>
            </Link>
          );
        })}
      </div>
      </>
    );
  }
}

export default ChooseGroup;