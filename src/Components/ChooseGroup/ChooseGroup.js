import React from 'react';
import { Link } from 'react-router-dom';
import './ChooseGroup.css';
import Nav from '../Nav/Nav';
import userGroupService from '../../Services/user-group-service';
import Context from '../Context/Context';
import Graph from '../Graph/daysLeftGraph'

//api get usergroup

class ChooseGroup extends React.Component {
  static contextType = Context

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

    return (
      
      <h5>
        <Graph days={diffDays}/>
      </h5>
      
    )
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
      <Nav />
      <div className="ChooseGroup">
        <h1 className="group-title">Groups</h1>
        {this.state.userGroups.map(group => {
          return (
            <div className="group-container">
            <Link key={group.id} to={this.chooseLink(group)}>
              <div className="group" onClick={() => this.handleClick(group)}>
                <h3 className="group-name">{group.group_name}</h3>
                {this.calculateTimeLeft(group)}
              </div>
            </Link>
            </div>
          );
        })}
      </div>
      <div className="button-background">
      <Link to="/create-group"><button className="create-group-button">Create New Group</button></Link>
      </div>
      </>
    );
  }
}

export default ChooseGroup;