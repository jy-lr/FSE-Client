import React from 'react';
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
                        <div className="group">
                            <h3>{group.name}</h3>
                            <p>{group.timeLeft} days left</p>
                        </div>
                    );
                })}
            </div>
            </>
        );
    }
}

export default ChooseGroup;