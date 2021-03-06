import React from "react";
import Chart from "react-google-charts";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
class MultipleChartReport extends React.Component {
  render() {
    let arr = ["--", "--"];
    let column=[];
    let arrTitle = [];
    let { arrReportHistogram } = this.props;
    let dataReport=[];

    if(Object.keys(arrReportHistogram).length>1 && arrReportHistogram.keys!=undefined)
    {
        dataReport = arrReportHistogram.keys.map((key, index) => {
            let obj = [key];
           
            arrReportHistogram[key].map((c, index) => {
                obj.push(Number(c.value));
            });
            return obj;
          });
          
          column= arrReportHistogram.keys.map(key => {
            arrTitle = [];
            let date = "Thời gian cập nhật";
            arrTitle.push(date);
            arrReportHistogram[key].map((c, index) => {
             
              arrTitle.push( c.name);
            });
            return arrTitle;
          });
    }
   dataReport.unshift(column[0]);

    return (
        Object.keys(arrReportHistogram).length>1 ? (
        <Chart
                
                width={'100%'}
               style={{minHeight:"350px"}}
                chartType="Histogram"
                position="relative"
                loader={<div>Loading Chart</div>}
                data={dataReport}
                options={{
                    title:"",
                    legend: { position: 'none' },
                    colors: ['green'],
                }}
                rootProps={{ 'data-testid': '2' }}
                />
      ):<SnackbarContent
      message={
        'Bạn đang chọn chưa có dữ liệu. Vui lòng chọn ngày khác hoặc thiết bị khác để xem báo cáo'
      }
      close
      color="warning"
    />
    );
  }
}
export default MultipleChartReport;
