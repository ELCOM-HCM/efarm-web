import React from "react";
import Thermometer from "react-thermometer";
class ThermometerChar extends React.Component {
  render() {
   
    return (
      <div style={{display:"flex", justifyContent:"center"}}>
        <Thermometer
          min={Number(this.props.valueMin)}
          max={Number(this.props.valueMax)}
          width={20}
          height={200}
          backgroundColor={"gray"}
          fillColor={"#e91e63"}
          current={Number(this.props.valueChart)}
        />
      </div>
    );
  }
}
export default ThermometerChar;
