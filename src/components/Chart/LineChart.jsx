import React from "react";
import Chart from "react-google-charts";
class LineChart extends React.Component {
  render() {
    let arr = [0, 0];
   
    let { listDashBoardHead, arrHistogramOfThing } = this.props;

    let data = [];
    let titleData = [
      "Ngày tháng năm / Giờ phút giây",
      listDashBoardHead.value_name + "(đơn vị:" + listDashBoardHead.unit + ")"
    ];
    data.push(titleData);
    if (arrHistogramOfThing.data.length > 0) {
      arrHistogramOfThing.data.map((c, index) => {
        data.push([index, Number(c.value)]);
      });
    } else {
      data.push(arr);
    }
    console.log(data);
    return (
      <div>
        {data.length > 1 && (
          <Chart
            width={"auto"}
            style={{ minHeight: "350px" }}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={data}
            options={{
              hAxis: {
                title: "Ngày tháng năm"
              },
              vAxis: {
                title: "Giá trị"
              }
            }}
            rootProps={{ "data-testid": "1" }}
          />
        )}
      </div>
    );
  }
}
export default LineChart;
