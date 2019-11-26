import React from 'react';
import {VictoryChart, VictoryLine, VictoryScatter, VictoryAxis} from 'victory'


const cartesianInterpolations = [
  "basis",
  "bundle",
  "cardinal",
  "catmullRom",
  "linear",
  "monotoneX",
  "monotoneY",
  "natural",
  "step",
  "stepAfter",
  "stepBefore"
];


const InterpolationSelect = ({ currentValue, values, onChange }) => (
  <select onChange={onChange} value={currentValue} style={{ width: 80 }}>
    {values.map(
      (value) => <option value={value} key={value}>{value}</option>
    )}
  </select>
);

class LinearChart extends React.Component {
  constructor() {
    super();
    this.state = {
      interpolation: "linear",
      polar: false,
      data: [],
    };
  }


  graphData() {

    const data = this.props.data.map(storedData => {
      let date = new Date(storedData.date_created)
      let month = date.getMonth() + 1
      let day = date.getDate()
      let combine = `${month}/${day}`
      let newData = {x: combine, y: storedData.equity}
      return newData
    })

    // const data = [
    //   {x: 1, y: 5},
    //   {x: 2, y: 6},
    //   {x: null, y: null},
    //   {x: 3, y: 9}
    // ]
    let newData = data.sort((a,b) => (a.x > b.x)? 1: -1)
    console.log(newData)
    return newData
  }

// {group by date_trunc('hour', created)

// where created > given_date

// and created < given_date}

// {date_trunc('hour', interval '2 hours 30 minutes')}

  render() {

    return (
      <div className='testing'>
        <InterpolationSelect
          currentValue={this.state.interpolation}
          values={this.state.polar ? cartesianInterpolations : cartesianInterpolations }
          onChange={(event) => this.setState({ interpolation: event.target.value })}
        />

        <VictoryChart polar={this.state.polar} height={500} width={1000} theme={{axis: {style: {tickLabels: {fill: "white"}, grid: {fill: "none", stroke: "none"}}}}}>
        <VictoryAxis  dependentAxis style={{ axis: {stroke: "white"} }} />
        <VictoryAxis style={{ axis: {stroke: "white"} }}/>
          <VictoryLine
            interpolation={this.state.interpolation} data={this.graphData()}
            style={{ data: { stroke: "#c43a31" } }}
          />
          <VictoryScatter data={this.graphData()}
            size={4}
            style={{ data: { fill: "#ddad6b" } }}
          />
        </VictoryChart>
      </div>
    );
  }
}

export default LinearChart