import React from 'react';
import {VictoryChart, VictoryLine, VictoryScatter} from 'victory'
import './linearGraph.css'

// const data = [
//   { x: 0, y: 0 },
//   { x: 1, y: 2 },
//   { x: 2, y: 1 },
//   { x: 3, y: 4 },
//   { x: 4, y: 3 },
//   { x: 5, y: 5 }
// ];

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
      let hour = date.getHours()
      let min = date.getMinutes()
      let combine = `${month}/${day}`
      let newData = {x: combine, y: storedData.equity}
      return newData
    })
    return data
  }

  render() {
    const componentStyle = {
      stroke: "#c43a31",

    }
    return (
      <div className='testing'>
        <InterpolationSelect
          currentValue={this.state.interpolation}
          values={this.state.polar ? cartesianInterpolations : cartesianInterpolations }
          onChange={(event) => this.setState({ interpolation: event.target.value })}
        />

        <VictoryChart polar={this.state.polar} height={500} width={1000}>
          <VictoryLine
            interpolation={this.state.interpolation} data={this.graphData()}
            style={{ data: { stroke: "#c43a31" } }}
          />
          <VictoryScatter data={this.graphData()}
            size={2}
            style={{ data: { fill: "#c43a31" } }}
          />
        </VictoryChart>
      </div>
    );
  }
}

export default LinearChart