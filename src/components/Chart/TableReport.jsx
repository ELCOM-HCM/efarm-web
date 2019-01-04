import React from "react";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Table from "components/Table/Table.jsx";
import CardBody from "components/Card/CardBody.jsx";
class TableReport extends React.Component {
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
    if (arrHistogramOfThing.data.length > 0) {
      arrHistogramOfThing.data.map(c => {
        data.push([c.date_time, Number(c.value)]);
      });
    } else {
      data.push(arr);
    }

    return (
      <div>
        {data.length > 1 && (
          <Card>
            <CardBody style={{ marginTop: "20px" }}>
              <Table
                tableHeaderColor="warning"
                tableHead={titleData}
                tableData={data}
              />
            </CardBody>
          </Card>
        )}
      </div>
    );
  }
}
export default TableReport;
