import React from "react";
import Chart from "react-google-charts";

class GaugeChart extends React.Component {
    constructor(props){
        super(props)
        this.state={
            memory:80,
            intervalID: null,
        }
    }
    componentWillMount(component){
        if (this.state.intervalID !== null) {
            clearInterval(this.state.intervalID)
          }
    }
    componentDidMount(){
        const intervalID = setInterval(() => {
            this.setState({
              memory: Math.random() * 100,
              intervalID,
            })
          }, 1000)
    }
  render() {
   
    return (
        <Chart
        style={{display:"flex", justifyContent:"center"}}
        // width={650}
        // height={210}
        chartType="Gauge"
        loader={<div>Loading Chart</div>}
        data={[
          ['Label', 'Value'],
          ['Memory', Number(this.props.valueChart)]
    
        ]}
        options={{
          redFrom: 90,
          redTo: 100,
          yellowFrom: 75,
          yellowTo: 90,
          minorTicks: 5,
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    );
  }
}
export default GaugeChart;
