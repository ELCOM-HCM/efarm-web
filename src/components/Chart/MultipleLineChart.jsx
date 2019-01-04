import React from "react";
import Chart from "react-google-charts";

class MultipleLineChart extends React.Component {
  render() {
    let { listHistogram } = this.props;

    let arr = ["--", "--"];
    let arrData = [];

    let data = [];
    let titleData = ["x"];
    let dataLength = [];
    if (listHistogram.length > 0) {
      listHistogram.map(c => {
        titleData.push(c.name);
      });
      data.push(titleData);
      listHistogram.map(c => {
        dataLength.push(c.data.length);
      });
      let arrObjData = listHistogram.map(c => c.data);
      let maxLength = Math.max.apply(Math, dataLength);
      for (let i = 0; i < maxLength; i++) {
        let dataChild = [];
        dataChild.push(i);
        for (let j = 0; j < titleData.length - 1; j++) {
          if (arrObjData[j][i] != undefined) {
            dataChild.push(parseFloat(Number(arrObjData[j][i].value)));
          } else {
            dataChild.push(0);
          }
        }
        data.push(dataChild);
      }
    }

    return (
      <div>
        {data.length > 1 && (
          <Chart
            width={"auto"}
            style={{ minHeight: "350px" }}
            chartType="Line"
            loader={<div>Loading Chart</div>}
            data={data}
            options={{
              chart: {
                title: "Lịch sử hoạt động của các thiết bị"
              }
            }}
            rootProps={{ "data-testid": titleData.length }}
          />
        )}
      </div>
    );
  }
}
export default MultipleLineChart;
