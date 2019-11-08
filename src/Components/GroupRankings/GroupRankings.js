import React from 'react';
import './GroupRankings.css'
import Nav from '../Nav/Nav';

class GroupRankings extends React.Component {
    state = {
        group: [
            {name: 'Jun', equity: 10400},
            {name: 'Steve', equity: 8400},
            {name: 'Lance', equity: 9400},
            {name: 'Isaac', equity: 7400},
            {name: 'Marissa', equity: 6400},
        ],
        timeRemaining: 15
    }

    render(){
        return (
            <>
            <Nav />
            <div className="group-rankings">
                <h2>Group Rankings</h2>
                {this.state.group.sort((a,b) => {
                    return b.equity - a.equity
                }).map((member, i) => {
                    return (
                    <div key={i} className="member-holder">
                        <p>{i + 1}</p>
                        <p>{member.name}</p>
                        <p>${member.equity}</p>
                    </div>)
                })}
                <h3>Time Remaining: {this.state.timeRemaining} days</h3>
            </div>
            </>
        );
    }
}

export default GroupRankings;