import React from 'react';
import { Link } from 'react-router-dom';
import './ChooseGroup.css'
import Nav from '../Nav/Nav';

class ChooseGroup extends React.Component {
    state = {
        userGroups: [
            {id: 1, name: 'fse-a', timeLeft: 15},
            {id: 2, name: 'fse-b', timeLeft: 10}, 
            {id: 3, name: 'fse-c', timeLeft: 11}, 
        ]
    }

    render(){
        return (
            <>
            <Nav />
            <div className="ChooseGroup">
                {this.state.userGroups.map(group => {
                    return (
                        <Link key={group.id} to={`/profile/${group.name}`}>
                            <div className="group">
                                <h3>{group.name}</h3>
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