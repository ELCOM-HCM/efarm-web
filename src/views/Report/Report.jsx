import React from "react";
import PropTypes from "prop-types";
// import pdfMake from 'pdfmake';
import $ from "jquery";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
// react plugin for creating charts
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Accessibility from "@material-ui/icons/Accessibility";
import { Typography } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import IconButton from "@material-ui/core/IconButton";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import Grid from "@material-ui/icons/Dashboard";
import Chart from "@material-ui/icons/InsertChart";
import InputLabel from "@material-ui/core/InputLabel";
import CardAvatar from "components/Card/CardAvatar.jsx";
import html2canvas from 'html2canvas'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
// core components
import Table from "components/Table/Table.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import ChartLiquidFillGauge from "components/Chart/ChartLiquidFillGauge.jsx";
import ReactSpeedometer from "react-d3-speedometer";
import CardBody from "components/Card/CardBody.jsx";
import dashboardStyle from "assets/jss/common-styles/views/dashboardStyle.jsx";
import DateRangePicker from "components/DateRangePicker/DateRangePicker.jsx";
import ThermometerChar from "components/Chart/ThermometerChar.jsx";
import Histogram from "components/Chart/HistogramChart.jsx";
import LineChart from "components/Chart/LineChart.jsx";
import MultipleChartReport from "components/Chart/MultipleChartReport.jsx";
import GaugeChart from "components/Chart/GaugeChart.jsx";
import Map from "components/Chart/Map.jsx";
import CustomSlider from "components/Slider/Slider.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import BarChart from "components/Chart/BarChart.jsx";
import ReportBarChart from "components/Chart/ReportBarChart.jsx";
import ReportHistogram from "components/Chart/ReportHistogram.jsx";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
// api
import Common from "../../utils/Common";
import API from "../../utils/API";
import moment from "moment";
import reportStyle from "assets/jss/common-styles/views/reportStyle.jsx";
// import * as pdfMake from 'pdfmake';
class Report extends React.Component {
 constructor(props){
   super(props)
   {
    this.today=new Date();
    this.state = {
      value: 0,
      arrDeviceFarm: [],
      selectThing: [],
      arrReportHistogram: []
    };
   }

 }
  _handleExportExcel() {
    let dateRange = $("#report_daterangepicker").data("daterangepicker");
    let date_from =moment(today).subtract(1, 'weeks').startOf('isoWeek')
    .format("YYYY/MM/DD hh:mm:ss");
    let date_to = moment(today).subtract(1, 'weeks').endOf('isoWeek')
        .format("YYYY/MM/DD hh:mm:ss");
       
    if(dateRange !=undefined)
   {
     date_from = dateRange.startDate.format("YYYY/MM/DD hh:mm:ss");
     date_to = dateRange.endDate.format("YYYY/MM/DD hh:mm:ss");
   }
    let typeDate = $("#typeDate").val();
    let { selectThing } = this.state;
    let objExcel={
      method: "GET",
      url: API.getAPI().reportExcel,
      data: {
        _id: selectThing,
        date_from: date_from,
        date_to: date_to,
        type: typeDate || "Days"
      }
    };
 
    Common.requestDownload(objExcel).then(blob => {
      let url = window.URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.href = url;
      a.download = "filename.xlsx";
      // we need to append the element to the dom -> otherwise it will not work in firefox
      document.body.appendChild(a);
      a.click();
      a.remove(); //afterwards we remove the element again
    });
  }
async  _handleExportPdf() {
    // try{
      let dateRange = $("#report_daterangepicker").data("daterangepicker");
      let date_from =moment(today).subtract(1, 'weeks').startOf('isoWeek')
      .format("YYYY/MM/DD hh:mm:ss");
      let date_to = moment(today).subtract(1, 'weeks').endOf('isoWeek')
          .format("YYYY/MM/DD hh:mm:ss");
      if(dateRange !=undefined)
     {
       date_from = dateRange.startDate.format("YYYY/MM/DD hh:mm:ss");
       date_to = dateRange.endDate.format("YYYY/MM/DD hh:mm:ss");
     }
      var docDefinition = {
        header: {
          text: JSON.parse(localStorage.getItem("user")).name,
          alignment: "left",
          margin: [10, 0, 10, 0]
        },
        footer: function() {
          return {
            columns: [
              {
                text:JSON.parse(localStorage.getItem("farm")).name,
                alignment: "left",
                margin: [10, 0, 10, 0]
              },
              {
                text:date_from + " đến " + date_to,
                alignment: "right",
                margin: [10, 0, 10, 0]
              }
            ]
          };
        },
        info: {
          author: "elcom",
          creator: "elcom",
          producer: "elcom"
        },
        content: [],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            fillColor: "#1ebfae",
            color: "#ffffff"
          }
        }
      };
      let column=[];
      let arrTitle = [];
      let { arrReportHistogram } = this.state;
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
      let content = [
        {text:"BÁO CÁO THỐNG KÊ CÁC THIẾT BỊ SỬ DỤNG TRONG " + JSON.parse(localStorage.getItem("farm")).name,alignment:"center", margin: 20 },
        {
          widths : ["*"],
          alignment: 'center',
          table: {
            
            headerRows: 1,
            body:dataReport,
            layout: {
              hLineWidth: function (i, node) {
                return (i === 0 || i === node.table.body.length) ? 2 : 1;
              },
              vLineWidth: function (i, node) {
                return (i === 0 || i === node.table.widths.length) ? 2 : 1;
              },
              hLineColor: function (i, node) {
                return 'black';
              },
              vLineColor: function (i, node) {
                return 'black';
              },
              hLineStyle: function (i, node) {
                if (i === 0 || i === node.table.body.length) {
                  return null;
                }
                return {dash: {length: 10, space: 4}};
              },
              vLineStyle: function (i, node) {
                if (i === 0 || i === node.table.widths.length) {
                  return null;
                }
                return {dash: {length: 4}};
              },
            }
            
          },
         
        }
      ];
      docDefinition.content.push(content);
   
    //   html2canvas.Preload(document.getElementById('chartReport'), {
    //     onrendered: function (canvas) {
    //         var data = canvas.toDataURL();
    //         console.log(data);
    //       //   docDefinition.content.push({
    //       //     image: data,
    //       //     width: 500,
    //       // })
    //     }
    // });
    let $this=this;
  await html2canvas(document.querySelector("#chartReport")).then(canvas => {
        document.body.appendChild(canvas)
        console.log(canvas.toDataURL());
         docDefinition.content.push(
          {
            image: canvas.toDataURL(),
            width: 500,
            alignItems:"center"
          }

        )
       
    });
    await html2canvas(document.querySelector("#tableReport")).then(canvas => {
      document.body.appendChild(canvas)
      console.log(canvas.toDataURL());
       docDefinition.content.push(
        {
          image: canvas.toDataURL(),
          width: 500,
           alignItems:"center"
        }

      )
     
  });
    pdfMake.createPdf(docDefinition).download("report.pdf");
   
    // catch{

    // }
  }
  componentWillMount() {}
  componentDidMount() {
    this._getDeviceFarm();
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleChangeThing(event) {
    this.setState({
      selectThing: event.target.value
    });
  }
  async handleReport(selectThing) {
    let dateRange = $("#report_daterangepicker").data("daterangepicker");
    let date_from = dateRange.startDate.format("YYYY/MM/DD hh:mm:ss");
    let date_to = dateRange.endDate.format("YYYY/MM/DD hh:mm:ss");
    let typeDate = $("#typeDate_1").val();
    let objReport = {
      method: "POST",
      data: {
        _id: selectThing,
        date_from: date_from,
        date_to: date_to,
        type: typeDate || "Days"
      },
      url: API.getAPI().getReportHistogram
    };
    console.log(JSON.stringify(objReport));

    await Common.request(objReport)
      .then(arr => {
        this.setState({ arrReportHistogram: arr });
      })
      .catch(err => {
        console.log(err);
      });
  }
  async handleReportDate() {
    let dateRange = $("#report_daterangepicker").data("daterangepicker");
    let date_from = dateRange.startDate.format("YYYY/MM/DD hh:mm:ss");
    let date_to = dateRange.endDate.format("YYYY/MM/DD hh:mm:ss");
    let typeDate = $("#typeDate").val();
    let { selectThing } = this.state;
    let objReport = {
      method: "POST",
      data: {
        _id: selectThing,
        date_from: date_from,
        date_to: date_to,
        type: typeDate || "Days"
      },
      url: API.getAPI().getReportHistogram
    };

    await Common.request(objReport)
      .then(arr => {
        this.setState({ arrReportHistogram: arr });
      })
      .catch(err => {
        console.log(err);
      });
  }
  async _getDeviceFarm() {
    let objDeviceFarm = {
      method: "POST",
      data: {},
      url:
        API.getAPI().getDeviceFarm +
        JSON.parse(localStorage.getItem("farm"))._id
    };

    await Common.request(objDeviceFarm)
      .then(arr => {
        let _idDevice = arr.map(c => c._id).slice(0, 1);
        this.handleReport(_idDevice);
        this.setState({ arrDeviceFarm: arr, selectThing: _idDevice });
      })
      .catch(err => {
        console.log(err);
      });
  }
  // handleChangeIndex = index => {
  //   this.setState({ value: index });
  // };
  render() {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250
        }
      }
    };
    const { classes } = this.props;
    let { selectThing, arrDeviceFarm, arrReportHistogram } = this.state;

    return (
      <div>
        <GridContainer id="testid">
          <GridItem
            xs={12}
            sm={12}
            md={12}
            className={classes.parent}
            style={{ marginTop: "-1em" }}
          >
            <CardHeader color="rose" className={classes.headerBox3} stats icon>
              <GridContainer alignItems="flex-end" justify="flex-end">
                <GridItem xs={12} sm={2} md={2}>
                  <FormControl className={classes.formControl}>
                    <InputLabel className={classes.customInputLable}>
                      Chọn thiết bị
                    </InputLabel>
                    <Select
                      multiple
                      value={selectThing}
                      onChange={this.handleChangeThing.bind(this)}
                      className={classes.customSelect}
                      input={
                        <Input
                          id="select-multiple-device"
                          className={classes.customInput}
                        />
                      }
                      renderValue={selected => {
                        let arr = [];
                        selected.map(c => {
                          arrDeviceFarm.map(m => {
                            if (c == m._id) {
                              arr.push(m.name);
                            }
                          });
                        });
                        return arr.join(", ");
                      }}
                      MenuProps={MenuProps}
                    >
                      {arrDeviceFarm.map((device, index) => (
                        <MenuItem key={index} value={device._id}>
                          <Checkbox
                            checked={selectThing.indexOf(device._id) > -1}
                          />
                          <ListItemText primary={device.name} />
                        </MenuItem>
                      ))}
                      {arrDeviceFarm.length <= 0 && (
                        <MenuItem>
                          <ListItemText primary={"Thiết bị đã sử dụng hết"} />
                        </MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={4} md={4} className={classes.parent}>
                  <div className="btn-group keep-open-calender">
                    <DateRangePicker
                      id="report_daterangepicker"
                      ref={date => (this.Date = date)}
                      timePicker={true}
                      onChange={this.handleReportDate.bind(this)}
                    />
                  </div>
                </GridItem>
                <GridItem xs={12} sm={2} md={2}>
                  <FormControl className={classes.formControl}>
                    <NativeSelect
                      className={classes.customSelect}
                      id="typeDate"
                      onChange={this.handleReportDate.bind(this)}
                    >
                      <option value="" disabled>
                        Loại hiển thị
                      </option>
                      <option value={"Days"}>Ngày</option>
                      <option value={"Hours"}>Giờ</option>
                      <option value={"Minutes"}>Phút</option>
                      <option value={"Raw"}>Giây</option>
                    </NativeSelect>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={2} md={2}>
                  <Button
                    variant="extendedFab"
                    aria-label="Delete"
                    color="secondary"
                    onClick={this.handleReportDate.bind(this)}
                  >
                    Xem báo cáo
                  </Button>
                </GridItem>
              </GridContainer>
            </CardHeader>

            <CardBody className={classes.containerTabTable}>
              <CustomTabs
                title={"Báo cáo"}
                headerColor="rose"
                tabs={[
                  // {
                  //   tabName: "ĐƯỜNG",
                  //   tabIcon: BugReport,
                  //   tabContent: (
                  //     <Card>
                  //       <CardBody>
                  //         <BarChart />
                  //       </CardBody>
                  //     </Card>
                  //   )
                  // },
                  {
                    tabName: "CỘT",
                    tabIcon: Chart,
                    tabContent: (
                      <Card>
                        <CardBody
                        
                         
                        >
                          <h4
                            style={{
                              margin: "0px",
                              alignSelf: "flex-start",
                              padding: "10px"
                            }}
                          >
                            Biểu đồ thể hiện sự phân bố giá trị của thiết bị
                          </h4>
                          <div  id="chartReport"  style={{
                            width:"100%",
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            alignItems: "center"
                          }}>
                          <MultipleChartReport
                           
                           arrReportHistogram={arrReportHistogram}
                         />
                          </div>
                          
                          <h4
                            style={{
                              margin: "0px",
                              alignSelf: "flex-start",
                              padding: "10px"
                            }}
                          >
                            Biểu đồ thể hiện giá trị thiết bị theo thời gian
                          </h4>
                          <div  id="tableReport"  style={{
                            width:"100%",
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            alignItems: "center"
                          }}>
                          <ReportBarChart
                            arrReportHistogram={arrReportHistogram}
                          />
                          </div>
                        </CardBody>
                      </Card>
                    )
                  },
                  {
                    tabName: "BẢNG",
                    tabIcon: Grid,
                    tabContent: (
                      <div
                       id="tableReport"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                          alignItems: "center"
                        }}
                      >
                          <ReportHistogram
                            arrReportHistogram={arrReportHistogram}
                          />
                       
                      </div>
                    )
                  }
                ]}
              />
              <div className={classes.containerIconReport}>
                <Icon
                  className={classes.customIcon}
                  onClick={this._handleExportExcel.bind(this)}
                >
                  explicit
                </Icon>
                <Icon
                  className={classes.customIcon}
                  onClick={this._handleExportPdf.bind(this)}
                >
                  picture_as_pdf
                </Icon>
              </div>
            </CardBody>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Report.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(reportStyle)(Report);
