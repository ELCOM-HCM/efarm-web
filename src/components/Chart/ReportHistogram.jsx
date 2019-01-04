import React from "react";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Table from "components/Table/Table.jsx";
import CardBody from "components/Card/CardBody.jsx";
import ReactTable from 'react-table';
import "react-table/react-table.css";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
// import ReactTable from 'react-table'
class ReportHistogram extends React.Component {
  render() {
   
    let { arrReportHistogram } = this.props;
    let dataReport=[];
    let column=[];
      if(Object.keys(arrReportHistogram).length>1){
        console.log("arrReportHistogram.keys");
        console.log(arrReportHistogram.keys);
        if(arrReportHistogram.keys.length>0)
        {
          dataReport = arrReportHistogram.keys.map((key, index) => {
            let obj={
                date:key
            };
            arrReportHistogram[key].map((c,index)=>{
                obj[`value_${index}`]=Number(c.value);
  
            });
            return obj
        })
        column= arrReportHistogram.keys.map((key) => {
            let arrTitle=[];
            let date={
              Header: 'Thời gian cập nhật',
              accessor: 'date'
            }
            arrTitle.push(date);
            arrReportHistogram[key].map((c,index)=>{
              let objTitle={}
              objTitle.Header=c.name;
              objTitle.accessor=`value_${index}`;
              arrTitle.push(objTitle)
          
  
          });
          return arrTitle;
        
        });
        }
       
    }
    return (
      Object.keys(arrReportHistogram).length>1?
      <Card style={{marginTop:"0 !important"}}  >
        <CardBody  >
          {/* <Table
            tableHeaderColor="warning"
            tableHead={concatTitle}
            tableData={arr}
          /> */}
           <ReactTable
          
           defaultPageSize={10}
            data={dataReport}
             columns={column[0]}
             getTheadProps={
              () => {
                return {
                  style: {
                    fontSize:"1.2em",
                    textAlign:"left",
                    fontWeight:"bold",
                    padding:"10px 4px"
                  }
                };
              }
             }
             getTdProps={
              () => {
                return {
                  style: {
                   
                    textAlign:"center",
                    padding:"10px 4px"
                  }
                }
              }
             }
          />
        </CardBody>
      </Card>
      :<SnackbarContent
      style={{marginLeft:"25%"}}
      message={
        'Bạn đang chọn chưa có dữ liệu. Vui lòng chọn ngày khác hoặc thiết bị khác để xem báo cáo'
      }
      close
      color="warning"
    />
   );
  }
}
export default ReportHistogram;
