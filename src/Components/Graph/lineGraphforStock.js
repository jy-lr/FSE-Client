import React from 'react';
import {VictoryChart, VictoryLine, VictoryScatter, VictoryAxis} from 'victory'
import './linearGraph.css'

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

class stockChart extends React.Component {
  constructor() {
    super();
    this.state = {
      interpolation: "linear",
      polar: false,
      data: [],
    };
  }


  graphData() {
    console.log(this.props.stockData)

    console.log(this.props.stockData !== undefined)

    if (this.props.stockData !== undefined) {
      return this.props.stockData.map(data => {
        const date = data.date
        const close = data.close
        const newVal = {
          x: date,
          y: close
        }
        return newVal
      })
    }
    return [{x: 0, y:0}]
  }

  render() {

    return (
      <div className='testing'>
        <InterpolationSelect
          currentValue={this.state.interpolation}
          values={this.state.polar ? cartesianInterpolations : cartesianInterpolations }
          onChange={(event) => this.setState({ interpolation: event.target.value })}
        />

        <VictoryChart polar={this.state.polar} height={500} width={1000} style={{ tickLabels: {color: 'white'} }}>
        <VictoryAxis  dependentAxis style={{ axis: {stroke: "white"} }} />
        <VictoryAxis  style={{ axis: {stroke: "white"} }}/>
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

export default stockChart