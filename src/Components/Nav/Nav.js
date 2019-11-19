import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import userGroupService from '../../Services/user-group-service';
import Context from '../Context/Context';
import './Nav.css'

class Nav extends React.Component {
    static contextType = Context;

  constructor(props) {
    super(props)
    this.state = {
      userGroups: [],
      doneIds: []
    }
  }


  componentDidMount = () => {
    userGroupService.getAllofUsersGroups()
    .then(userGroups => this.setState({userGroups}))
  }

  handleClick = (group) => {
    console.log(group)
    this.context.saveSelectedGroupData(group)
    
  }

  

  calculateTimeLeft(group){
    let endDate = new Date(group.date_created)
    endDate.setDate(endDate.getDate() + 30)
    let now = new Date()
    const diffTime = Math.abs(endDate - now);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if(diffDays < 1){
      let newDoneIds = this.state.doneIds;
      newDoneIds.push(group.groupid);
      this.setState({doneIds: newDoneIds});
    }
  }
  
  chooseLink(group){
    if(this.state.doneIds.includes(group.groupid)){
      return `/rankings`;
    }

    return `/profile/${group.group_name}`;
  }

    render(){
      console.log(this.state.userGroups)
        return (
            <>
            <Menu>
            <Link to="/groups">Overview</Link>
            <div className="ChooseGroup">
                {this.state.userGroups.map(group => {
                return (
                <Link key={group.id} to={this.chooseLink(group)}>
                <div className="group" onClick={() => this.handleClick(group)}>
                    <h3>{group.group_name}</h3>
                    {this.calculateTimeLeft(group)}
                </div>
                </Link>
            );
            })}
            </div>
            </Menu>
            <div className="nav">
                <div className="logo-holder"></div>
            </div>
            </>
        );
    }
}

export default Nav;