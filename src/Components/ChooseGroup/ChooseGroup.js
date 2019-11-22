import React from 'react';
import { Link } from 'react-router-dom';
import './ChooseGroup.css';
import Nav from '../Nav/Nav';
import userGroupService from '../../Services/user-group-service';
import Context from '../Context/Context';
import Graph from '../Graph/daysLeftGraph'
// import {Spinner} from 'react-bootstrap'
//api get usergroup

class ChooseGroup extends React.Component {
  static contextType = Context

  constructor(props) {
    super(props)
    this.state = {
      userGroups: [],
      doneIds: [],
      loading: true
    }
  }


  componentDidMount = () => {
    userGroupService.getAllofUsersGroups()
    .then(userGroups => this.setState({userGroups: userGroups, loading: false}))
  }

  // handleLoading = () => {
  //   const style = {
  //     "display": 'flex',
  //     "justify-content": 'center',
  //     "align-items": 'center',
  //     "height": '-webkit-fill-available',
  //     "background-color": "#343a42"
  //   }
  //   const spinner = {
  //     "width": "5rem",
  //     "height": "5rem"
  //   }
  //   return (
  //     <div classname="loading-icon" style={style}>
  //       {/* <Spinner animation="border" style={spinner} variant="warning" role="status"/> */}
  //     </div>
  //   )
  // }

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
    console.log(!this.state.loading)
    return (
      <>
      <Nav />
      {/* {(this.state.loading)? this.handleLoading(): null} */}
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