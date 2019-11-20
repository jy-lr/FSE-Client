import React from 'react';
import {VictoryPie, VictoryAnimation, VictoryLabel} from 'victory'

class Graph extends React.Component {
  constructor() {
    super();
    this.state = {
      percent: 0, data: this.getData(100)
    };
  }

  componentDidMount() {
    const conversion = 100/30
    const daysLeftConverted = conversion*this.props.days
    let percent = 0;
    this.setStateInterval = window.setInterval(() => {
      percent += (100-daysLeftConverted);
      this.setState({
        percent, data: this.getData(daysLeftConverted)
      });
    }, 1000);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  getData(percent) {
    return [{ x: 1, y: percent }, { x: 2, y: 100 - percent }];
  }

  render() {
    return (
      <div>
        <svg viewBox="0 0 400 400" width="10rem" height="10rem">
          <VictoryPie
            standalone={false}
            animate={{ duration: 1000 }}
            width={400} height={400}
            data={this.state.data}
            innerRadius={120}
            cornerRadius={25}
            labels={() => null}
            style={{
              data: { fill: ({ datum }) => {
                const color = datum.y > 30 ? "green" : "red";
                return datum.x === 1 ? color : "transparent";
              }
              }
            }}
          />
          <VictoryAnimation duration={25} data={this.state}>
            {(newProps) => {
              return (
                <VictoryLabel
                  textAnchor="middle" verticalAnchor="middle"
                  x={200} y={200}
                  text={`${this.props.days} Days Left`}
                  style={{ fontSize: 30, fill: "#ddad6b" }}
                />
              );
            }}
          </VictoryAnimation>
        </svg>
      </div>
    );
  }
}

export default Graph