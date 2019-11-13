import React from 'react';
import { Link } from 'react-router-dom';
import './ChooseGroup.css';
import Nav from '../Nav/Nav';
import userGroupService from '../../Services/user-group-service';
import Context from '../Context/Context';

//api get usergroup

class ChooseGroup extends React.Component {
  static contextType = Context

  state = {
    userGroups: []
  }

  componentDidMount = () => {
    userGroupService.getAllofUsersGroups()
    .then(userGroups => this.setState({userGroups}))
  }

  handleClick = (group) => {
    this.context.saveSelectedGroupData(group)
  }

  calculateTimeLeft(date_created){
    let endDate = new Date(date_created)
    endDate.setDate(endDate.getDate() + 30)
    let now = new Date()
    const diffTime = Math.abs(endDate - now);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays
  }

  render(){
    return (
      <>
      <Nav />
      <div className="ChooseGroup">
        {this.state.userGroups.map(group => {
          return (
            <Link key={group.id} to={`/profile/${group.group_name}`}>
              <div className="group" onClick={() => this.handleClick(group)}>
                <h3>{group.group_name}</h3>
                <h5>{this.calculateTimeLeft(group.date_created)} days left</h5>
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