import React from "react";
import Chart from "react-google-charts";
class Histogram extends React.Component {
  render() {
    let arr = ["--", "--"];
    let arrData = [];
    let { listDashBoardHead, arrHistogramOfThing } = this.props;

    let data = [];
    let titleData = [
      "Ngày tháng năm / Giờ phút giây",
      listDashBoardHead.value_name + "(đơn vị:" + listDashBoardHead.unit + ")"
    ];
    data.push(titleData);
    if (
      Object.keys(arrHistogramOfThing).length > 0 &&
      arrHistogramOfThing.data.length > 0
    ) {
      arrHistogramOfThing.data.map(c => {
        data.push([c.date_time, Number(c.value)]);
      });
    } else {
      data.push(arr);
    }
    return (
      <div>
        {data.length > 1 && (
          <Chart
            width={"100%"}
            style={{ minHeight: "350px" }}
            chartType="Histogram"
            position="relative"
            loader={<div>Loading Chart</div>}
            data={data}
            options={{
              title:
                listDashBoardHead.value_name +
                "(đơn vị:" +
                listDashBoardHead.unit +
                ")",
              legend: { position: "none" },
              colors: ["green"]
            }}
            rootProps={{ "data-testid": "2" }}
          />
        )}
      </div>
    );
  }
}
export default Histogram;
