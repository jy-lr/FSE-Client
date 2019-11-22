import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import userGroupService from '../../Services/user-group-service';
import Context from '../Context/Context';
import './Nav.css'
import icon from '../../pic/icon3.png'

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
        return (
            <>
            <Menu>
            <Link to="/groups"><h1 className="overview">Overview</h1></Link>
            <div className="nav-choose-group">
                {this.state.userGroups.map(group => {
                return (
                <Link key={group.id} to={this.chooseLink(group)} >
                <div onClick={() => this.handleClick(group)} className="nav-groups">
                    <h3 className="nav-group">{group.group_name}</h3>
                    {this.calculateTimeLeft(group)}
                </div>
                </Link>
            );
            })}
            </div>
            </Menu>
            <div className="nav">
                <Link to="/groups"><img className="logo-holder" src={icon} alt="logo"></img></Link>
            </div>
            </>
        );
    }
}

export default Nav;