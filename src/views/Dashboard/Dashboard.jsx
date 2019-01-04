import React from "react";
import PropTypes from "prop-types";
import $ from "jquery";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import SweetAlert from "react-bootstrap-sweetalert";
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
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/icons/Dashboard";
import Chart from "@material-ui/icons/InsertChart";
import Button from "@material-ui/core/Button";

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
import MultipleLineChart from "components/Chart/MultipleLineChart.jsx";
import GaugeChart from "components/Chart/GaugeChart.jsx";
import Map from "components/Chart/Map.jsx";
import CustomSlider from "components/Slider/Slider.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import BarChart from "components/Chart/BarChart.jsx";
import TableReport from "components/Chart/TableReport.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

// api
import Common from "../../utils/Common";
import API from "../../utils/API";
import moment from "moment";
import { Success } from "components/Typography/Success.jsx";
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.today = new Date();
    this.loopSocket=null;
    this.iconColor = [
      "primary",
      "danger",
      "success",
      "info",
      "rose",
      "primary",
      "danger",
      "success",
      "info",
      "rose"
    ];

    this.state = {
      value: 0,
      listDashBoardHead: [],
      arrHistogramOfThing: [],
      infoFarm: [],
      listHistogram: [],
      arrDeviceFarm: [],
      objDateInfo: {},
      valueDevice: "",
      typeDateTime: "",
      showNotifyDelete: false,
      idDevice: "",
      showNotify: false,
      typeNotify: "",
      titleNotify: "",
      objThingId: {},
      isShowModal: false,
      arrSwitchControl: [],
      typeWarning: false,
      typeSuccess: false,
      arrswitch:[],
      arrThingControl:[]
    };
  }
  converStringToArray(string)
  {
   
      return Array.from(string).filter(c=>c!="," && c!="[" && c!="]");
   
  
  }
  handleCloseModal() {
    this.setState({ showNotify: false });
  }
  handleDeviceControl(id_thing, method, index) {
    let methodUpdate="OFF";
    if(method==true)
    {
      methodUpdate="On"
    }
    else
    {
      methodUpdate="Off";
    }
    let objSwitchControl = {
      method: "POST",
      data: {id: id_thing, method: methodUpdate, index: index},
      url: API.getAPI().deviceControl
    };

  Common.request(objSwitchControl)
      .then(arr => {
        
       
      })
      .catch(err => {
        console.log(err);
      });
  }
  async handleUpdateSwitch(idThing, objThingId, valueSwitch) {
    if (idThing == null || idThing == "" || idThing == undefined) {
      this.setState({
        showNotify: true,
        showNotifyDelete: false,
        typeWarning: true,
        typeSuccess: false,
        titleNotify: "Chỉnh sửa thông tin thiết bị thất bại. Vui lòng thử lại."
      });
      return;
    }

    let value = valueSwitch;
    let threshold_special = objThingId.threshold_special;
    let threshold_max = objThingId.threshold_max;
    let threshold_min = objThingId.threshold_min;
    let name = objThingId.name;
    let status = objThingId.status;
    let description = objThingId.description;
    let type = objThingId.type;
    let objThing = {
      method: "PUT",
      data: {
        name: name,
        status: status,
        description: description,
        threshold_max: threshold_max,
        threshold_min: threshold_min,
        threshold_special: threshold_special,
        status: status,
        description: description,
        type: type,
        value: value
      },
      url: API.getAPI().editDevice + idThing
    };

    await Common.request(objThing)
      .then(arr => {
        this._getDeviceFarm();
        this._getListDashBoardHead();
        this.handleShowDevice(idThing);
        this.setState({
          showNotify: false,
          showNotifyDelete: false,
          typeWarning: false,
          typeSuccess: true,
          titleNotify: "Chỉnh sửa thông tin thiết bị thành công"
        });
      })
      .catch(err => {
        this.setState({
          showNotify: false,
          showNotifyDelete: false,
          typeWarning: true,
          typeSuccess: false,
          titleNotify:
            "Chỉnh sửa thông tin thiết bị thất bại. Vui lòng thử lại."
        });
        console.log(err);
      });
  }
  async handleEditThing() {
    let { idThing, objThingId } = this.state;
    if (idThing == null || idThing == "" || idThing == undefined) {
      this.setState({
        showNotify: true,
        showNotifyDelete: false,
        typeWarning: true,
        typeSuccess: false,
        titleNotify: "Chỉnh sửa thông tin thiết bị thất bại. Vui lòng thử lại."
      });
      return;
    }
    let threshold_special = $("#txtThresholdSpecial").val();
    let threshold_max = $("#txtThresholdMax").val();
    let threshold_min = $("#txtThresholdMin").val();
    let name = objThingId.name;
    let status = objThingId.status;
    let description = objThingId.description;
    let type = objThingId.type;
    let objThing = {
      method: "PUT",
      data: {
        name: name,
        status: status,
        description: description,
        threshold_max: threshold_max,
        threshold_min: threshold_min,
        threshold_special: threshold_special,
        description: description,
        type: type
      },
      url: API.getAPI().editDevice + idThing
    };

    await Common.request(objThing)
      .then(arr => {
        this._getDeviceFarm();
        this._getListDashBoardHead();
        this.handleShowDevice(idThing);
        this.setState({
          showNotify: false,
          showNotifyDelete: false,
          typeWarning: false,
          typeSuccess: true,
          titleNotify: "Chỉnh sửa thông tin thiết bị thành công"
        });
      })
      .catch(err => {
        this.setState({
          showNotify: false,
          showNotifyDelete: false,
          typeWarning: true,
          typeSuccess: false,
          titleNotify:
            "Chỉnh sửa thông tin thiết bị thất bại. Vui lòng thử lại."
        });
        console.log(err);
      });
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleCancel() {
    this.setState({
      showNotifyDelete: false
    });
  }
  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  handleChangeType(_id) {
    let time = $("#" + _id).val();
    this.setState({ typeDateTime: time });
  }
  _getFarm() {
    let objFarm = {
      method: "POST",
      url: API.getAPI().getFarmId + JSON.parse(localStorage.getItem("farm"))._id 
    };
    Common.request(objFarm)
      .then(arr => {
        this.setState({ infoFarm: arr });
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleSwitchControl(index, _id) {
    let { arrSwitchControl, arrDeviceFarm } = this.state;
    arrSwitchControl.map((c, postion) => {
      if (index == postion) {
        arrSwitchControl[postion] = !c;
        let objDevice = arrDeviceFarm.filter(c => c._id == _id);
        // alert(JSON.stringify(objDevice));
        this.handleUpdateSwitch(_id, objDevice[0], arrSwitchControl[postion]);
        this.setState({ arrSwitchControl: arrSwitchControl });
      }
    });
  }
  handleChangeDatePicker(idDate, idThing) {
    let { arrHistogramOfThing, typeDateTime } = this.state;
    let dateRange = $("#" + idDate).data("daterangepicker");
    let date_from =moment(this.today).subtract(1, 'weeks').startOf('isoWeek')
    .format("YYYY/MM/DD hh:mm:ss");
    let date_to = moment(this.today).subtract(1, 'weeks').endOf('isoWeek')
        .format("YYYY/MM/DD hh:mm:ss");
       
    if(dateRange !=undefined)
   {
    date_from = dateRange.startDate.format("YYYY/MM/DD hh:mm:ss");
    date_to = dateRange.endDate.format("YYYY/MM/DD hh:mm:ss");
   }
    let typeDate = "";
    if (
      typeDateTime == "" ||
      typeDateTime == null ||
      typeDateTime == undefined
    ) {
      typeDate = "Days";
    } else {
      typeDate = typeDateTime;
    }

    let objHistogramOfThing = {
      method: "POST",
      data: {
        date_from: date_from,
        date_to: date_to,
        type: typeDate || "Days"
      },
      url: API.getAPI().getHistogramOfThing + idThing
    };

    Common.request(objHistogramOfThing)
      .then(arr => {
        arrHistogramOfThing.forEach((element, index) => {
          if (element._id == arr._id) {
            arrHistogramOfThing[index] = arr;
          }
        });

        this.setState({ arrHistogramOfThing });
      })
      .catch(err => {
        console.log(err);
      });
  }
  async handleDeleteThing() {
    let { idDevice } = this.state;

    let objThing = {
      method: "DELETE",
      data: {},
      url: API.getAPI().deleteDevice + idDevice
    };

    await Common.request(objThing)
      .then(arr => {
        this._getDeviceFarm();
        this._getListDashBoardHead();
        this.setState({
          showNotifyDelete: false,
          showNotify: false,
          typeWarning: false,
          typeSuccess: true,
          titleNotify: "Xóa thiết bị thành công"
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          showNotifyDelete: false,
          showNotify: false,
          typeWarning: true,
          typeSuccess: false,
          titleNotify: "Xóa thiết bị không thành công."
        });
      });
  }
  _getHistogramOfThing(_idThing) {
    let { arrHistogramOfThing } = this.state;
    let dateRange = $("#report_daterangepicker").data("daterangepicker");
    let date_from =moment(this.today).subtract(1, 'weeks').startOf('isoWeek')
    .format("YYYY/MM/DD hh:mm:ss");
  
    let date_to = moment(this.today).subtract(1, 'weeks').endOf('isoWeek')
        .format("YYYY/MM/DD hh:mm:ss");
    if(dateRange !=undefined)
   {
    date_from = dateRange.startDate.format("YYYY/MM/DD hh:mm:ss");
     date_to = dateRange.endDate.format("YYYY/MM/DD hh:mm:ss");
   }
    let typeDate = $("#typeDate_1").val();

    let objHistogramOfThing = {
      method: "POST",
      data: {
        date_from: date_from,
        date_to: date_to,
        type: typeDate || "Days"
      },
      url: API.getAPI().getHistogramOfThing + _idThing
    };

    Common.request(objHistogramOfThing)
      .then(arr => {
      
        arrHistogramOfThing.push(arr);
        this.setState({ arrHistogramOfThing });
      })
      .catch(err => {
        console.log(err);
      });
  }
async  _getListDashBoardHead() {
    let objDashBoardHead = {
      method: "POST",
      url:
        API.getAPI().getDashboardHead +
        JSON.parse(localStorage.getItem("farm"))._id
    };

 await  Common.request(objDashBoardHead)
      .then(arr => {
        // let objPH = arr.filter(c => c.unit == "PH")[0];

        arr.map(c => {
          this._getHistogramOfThing(c._id);
        });

        this.setState({ listDashBoardHead: arr });
      })
      .catch(err => {
        console.log(err);
      });
  }

  dateRangeChange1() {
    this._getHistogram();
  }
  async handleShowEdit() {
    let _id = $("#select-thing").val();
    let objThing = {
      method: "POST",
      data: {},
      url: API.getAPI().editDevice + _id
    };

    await Common.request(objThing)
      .then(arr => {
        this.setState({
          showNotify: true,
          objThingId: arr,
          idThing: _id
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  async _getHistogram() {
    let dateRange = $("#report_daterangepicker").data("daterangepicker");
    let date_from =moment(this.today).subtract(1, 'weeks').startOf('isoWeek')
    .format("YYYY/MM/DD hh:mm:ss");
    let date_to = moment(this.today).subtract(1, 'weeks').endOf('isoWeek')
        .format("YYYY/MM/DD hh:mm:ss");
    if(dateRange !=undefined)
   {
    date_from = dateRange.startDate.format("YYYY/MM/DD hh:mm:ss");
    date_to = dateRange.endDate.format("YYYY/MM/DD hh:mm:ss");
   }
    let typeDate = $("#typeDate_1").val();
    let objDashBoardHead = {
      method: "POST",
      data: {
        _id: JSON.parse(localStorage.getItem("farm"))._id,
        date_from: date_from,
        date_to: date_to,
        type: typeDate || "Days"
      },
      url: API.getAPI().getHistogram
    };

    await Common.request(objDashBoardHead)
      .then(arr => {
        this.setState({ listHistogram: arr });
      })
      .catch(err => {
        console.log(err);
      });
  }
  componentDidMount() {
    let {arrThingControl}=this.state;


    this._getListDashBoardHead();
    this._getDeviceFarm();
    Common.SOCKET.emit(
        "sendThingsValues",
        JSON.parse(localStorage.getItem("farm"))._id
      );
    Common.SOCKET.on("receiveThingsValues", (data)=> {
          let {arrDeviceFarm}=this.state;
          arrDeviceFarm.map((c,index)=>{
            if(c.type==1)
            {
              let arrStatus=this.converStringToArray(data[index].value);
              c.switch_control.map((d,index)=>{
               
                d.value=arrStatus[index];
              })
            }
          })
          this.setState({listDashBoardHead:data,arrDeviceFarm})
         
          
      });
   
   
    this._getFarm();
   
    this._getHistogram();
   
  }
  componentWillUnmount(){
   
  }
  // handel for dashboard
  async _getDeviceFarm() {
    let idFarm = JSON.parse(localStorage.getItem("farm"))._id;
    let objDeviceFarm = {
      method: "POST",
      data: {},
      url: API.getAPI().getDeviceFarm + idFarm
    };
    await Common.request(objDeviceFarm)
      .then(arr => {
        let { arrSwitchControl, valueDevice,arrswitch,listDashBoardHead } = this.state;
        let arrDevice = arr.map(c => c._id);
        arrswitch=[];
        let farm = JSON.parse(localStorage.getItem("farm"));
        farm.device = arrDevice;
        localStorage.setItem("farm", JSON.stringify(farm));
        arrSwitchControl = [];
      


        arr.map((c, index) => {
          arrswitch.push(c.switch_control);
          if (index == 0) {
            valueDevice = c._id;
            this.handleShowDevice(c._id);
          }
          if (c.type == 1) {
            if (c.value == "") {
              arrSwitchControl.push(false);
            } else {
              {
                arrSwitchControl.push(
                  !!JSON.parse(String(c.value).toLowerCase())
                );
              }
            }
          }
        });
        this.setState({ arrDeviceFarm: arr, arrSwitchControl, valueDevice,arrswitch:arrswitch });
      })
      .catch(err => {
        console.log(err);
      });
  }

  async handleShowDevice(_id) {
    let objThing = {
      method: "POST",
      data: {},
      url: API.getAPI().editDevice + _id
    };

    await Common.request(objThing).then(arr => {
      this.setState({ objDateInfo: arr });
    });
  }
  handleDelete() {
    let _id = $("#select-thing").val();
    this.setState({
      showNotifyDelete: true,
      idDevice: _id
    });
  }
  handleChangeThing(ev) {
    let idThing = $("#select-thing").val();
    this.handleShowDevice(idThing);
    this.setState({ valueDevice: idThing });
  }
  render() {
    const { classes } = this.props;
    const {
      showNotifyDelete,
      showNotify,
      typeNotify,
      titleNotify,
      objThingId,
      arrSwitchControl,
      typeSuccess,
      typeWarning,
      arrswitch,
      arrThingControl
    } = this.state;

    let {
      listDashBoardHead,
      infoFarm,
      listHistogram,
      arrDeviceFarm,
      objDateInfo,
      arrHistogramOfThing
    } = this.state;
    const _role = JSON.parse(localStorage.getItem("user")).role;
    let role = Common.verify("VIEW", _role);
    let isRoleRoot = role.filter(c => c.role == "ROOT");
    let isMaster = role.filter(c => c.role == "MASTER");
    let isEditor = role.filter(c => c.role == "EDITOR");
    let isMonitor = role.filter(c => c.role != "MONITOR");

    let roleAdd = Common.verify("ADD", _role);
    let EditorAdd = roleAdd.filter(c => c.role == "EDITOR");

    let roleDelete = Common.verify("DELETE", _role);
    let EditorDelete = roleDelete.filter(c => c.role == "EDITOR");
    let MasterDelete = roleDelete.filter(c => c.role == "MASTER");
    let RootDelete = roleDelete.filter(c => c.role == "ROOT");

    let roleEdit = Common.verify("EDIT", _role);
    let EditorEdit = roleEdit.filter(c => c.role == "EDITOR");
    let MasterEdit = roleEdit.filter(c => c.role == "MASTER");
    let RootEdit = roleEdit.filter(c => c.role == "ROOT");
   

    return (
      <div>
        <GridContainer>
          {listDashBoardHead.map((c, index) => {
          
            if(c.type==0)
            {
              let icon = "developer_board";
              switch (c.value_name) {
                case "PH":
                  icon = "colorize";
                  break;
                case "Temperature":
                  icon = "brightness_7";
                  break;
                case "Humidity":
                icon = "opacity";
                break;
                case "EC":
                icon = "flash_on";
                break;
                default:
                icon="developer_board";
                break;
              }
            return (
              <GridItem xs={12} sm={6} md={3} key={index}>
                <Card
                  className={classes.customHeightCard}
                  style={{ marginRight: "0" }}
                >
                  <CardHeader color={this.iconColor[index]} stats icon>
                    <GridContainer>
                      <GridItem xs={12} sm={4} md={4}>
                        <CardIcon color={this.iconColor[index % 10]}>
                          <Icon>{icon}</Icon>
                        </CardIcon>
                      </GridItem>
                      <GridItem xs={12} sm={7} md={7}>
                        <span className={classes.cardTitle}>
                          {c.value} {c.unit}
                        </span>
                      </GridItem>
                    </GridContainer>
                  </CardHeader>
                  <CardBody>
                    <p className={classes.cardCategory}>{c.name}</p>
                  </CardBody>
                </Card>
              </GridItem>
            );
          }
          })}
        </GridContainer>
        {/* Bản đồ */}
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="warning">
                  <Icon>bar_chart</Icon>
                </CardIcon>
                <GridContainer>
                  <GridItem xs={12} sm={9} md={9}>
                    <div className="btn-group keep-open-calender">
                      <DateRangePicker
                        id="report_daterangepicker"
                        ref={date => (this.Date = date)}
                        timePicker={true}
                        onChange={this.dateRangeChange1.bind(this)}
                      />
                    </div>
                    <Modal
                      aria-labelledby="simple-modal-title"
                      aria-describedby="simple-modal-description"
                      open={showNotify}
                    >
                      <div className={classes.modalDashboard}>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={12}>
                            <Card>
                              <CardHeader color="rose">
                                <h4 className={classes.cardTitleWhite}>
                                  CHỈNH SỬA THÔNG TIN THIẾT BỊ NGƯỠNG
                                </h4>
                              </CardHeader>
                              <CardBody>
                                <GridContainer alignItems={"flex-end"}>
                                  <GridItem xs={12} sm={4} md={4}>
                                    <CustomInput
                                      labelText="Ngưỡng tối đa"
                                      id="txtThresholdMax"
                                      type="number"
                                      inputProps={{
                                        type: "number",
                                        defaultValue: objThingId.threshold_max
                                      }}
                                      formControlProps={{
                                        fullWidth: true
                                      }}
                                      ref={input =>
                                        (this.txtThresholdMax = input)
                                      }
                                    />
                                  </GridItem>
                                  <GridItem xs={12} sm={4} md={4}>
                                    <CustomInput
                                      labelText="Ngưỡng tối thiểu"
                                      id="txtThresholdMin"
                                      type="number"
                                      inputProps={{
                                        type: "number",
                                        defaultValue: objThingId.threshold_min
                                      }}
                                      formControlProps={{
                                        fullWidth: true
                                      }}
                                      ref={input =>
                                        (this.txtThresholdMin = input)
                                      }
                                    />
                                  </GridItem>
                                  <GridItem xs={12} sm={4} md={4}>
                                    <CustomInput
                                      labelText="Ngưỡng đặc biệt"
                                      id="txtThresholdSpecial"
                                      type="number"
                                      inputProps={{
                                        type: "number",
                                        defaultValue:
                                          objThingId.threshold_special
                                      }}
                                      formControlProps={{
                                        fullWidth: true
                                      }}
                                      ref={input =>
                                        (this.txtThresholdMin = input)
                                      }
                                    />
                                  </GridItem>
                                </GridContainer>

                                <GridContainer justify={"center"}>
                                  <GridItem>
                                    <Button
                                      variant="contained"
                                      color="default"
                                      className={classes.button}
                                      onClick={this.handleCloseModal.bind(this)}
                                    >
                                      Đóng
                                      <Icon className={classes.rightIcon}>
                                        close
                                      </Icon>
                                    </Button>
                                  </GridItem>
                                  <GridItem>
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      className={classes.button}
                                      onClick={this.handleEditThing.bind(this)}
                                    >
                                      Lưu lại
                                      <Icon className={classes.rightIcon}>
                                        save
                                      </Icon>
                                    </Button>
                                  </GridItem>
                                </GridContainer>
                              </CardBody>
                            </Card>
                          </GridItem>
                        </GridContainer>
                      </div>
                    </Modal>
                  </GridItem>
                  <GridItem xs={12} sm={3} md={3}>
                    <FormControl className={classes.formControl}>
                      <NativeSelect
                        className={classes.selectEmpty}
                        id="typeDate_1"
                        name="showTypeDateTimePicker"
                        onChange={this.dateRangeChange1.bind(this)}
                      >
                        <option value="" disabled>
                          Loại hiển thị
                        </option>
                        <option value={"Days"}>Ngày</option>
                        <option value={"Hours"}>Giờ</option>
                        <option value={"Minutes"}>Phút</option>
                        <option value={"Raw"}>Giây</option>
                      </NativeSelect>
                      <FormHelperText>Loại hiển thị</FormHelperText>
                    </FormControl>
                  </GridItem>
                </GridContainer>
              </CardHeader>
              <CardBody>
                <MultipleLineChart listHistogram={listHistogram} />
              </CardBody>
            </Card>
          </GridItem>
          {/* <GridItem xs={12} sm={6} md={6}>
            <Card>
              <CardBody style={{ padding: 0 }}>
                <Map data={infoFarm} />
              </CardBody>
            </Card>
          </GridItem> */}
        </GridContainer>
        <GridContainer justify={"center"}>
          <GridItem xs={12} sm={6} md={6}>
            <Card>
              <CardHeader color="info" stats icon>
                <GridContainer>
                  <GridItem xs={4} sm={4} md={4}>
                    <Typography className={classes.titleChart}>
                      THIẾT BỊ NGƯỠNG
                    </Typography>
                  </GridItem>
                  <GridItem xs={5} sm={5} md={5}>
                    <FormControl>
                      <NativeSelect
                        className={classes.selectType}
                        id="select-thing"
                        onChange={() => this.handleChangeThing()}
                        value={this.state.valueDevice}
                      >
                        <option value="" disabled>
                          Chọn thiết bị
                        </option>
                        {arrDeviceFarm.map((c, index) => {
                          return (
                            <option key={index} value={c._id}>
                              {c.name}
                            </option>
                          );
                        })}
                      </NativeSelect>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={1} sm={1} md={1} style={{ marginTop: "20px" }}>
                    {((RootEdit.length > 0 && RootEdit[0].method == true) ||
                      (MasterEdit.length > 0 && MasterEdit[0].method == true) ||
                      (EditorEdit.length > 0 &&
                        EditorEdit[0].method == true)) && (
                      <IconButton
                        aria-label="Delete"
                        className={classes.customButton}
                        onClick={this.handleShowEdit.bind(this)}
                      >
                        <Icon className={classes.customIconAction}>
                          edit_icon
                        </Icon>
                      </IconButton>
                    )}
                  </GridItem>
                  <GridItem xs={1} sm={1} md={1} style={{ marginTop: "20px" }}>
                    {((RootDelete.length > 0 && RootDelete[0].method == true) ||
                      (MasterDelete.length > 0 &&
                        MasterDelete[0].method == true)) && (
                      <IconButton
                        aria-label="Delete"
                        className={classes.customButton}
                        onClick={this.handleDelete.bind(this)}
                      >
                        <Icon className={classes.customIconAction}>
                          delete_icon
                        </Icon>
                      </IconButton>
                    )}
                  </GridItem>
                </GridContainer>
              </CardHeader>
              <CardBody>
                <CustomSlider objDateInfo={objDateInfo} />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            {arrDeviceFarm.filter(c => c.type == 1).length > 0 && (
              <Card>
                <CardHeader color="info" stats icon>
                  <GridContainer>
                    <GridItem xs={5} sm={5} md={5}>
                      <Typography className={classes.titleChart}>
                        THIẾT BỊ ĐIỀU KHIỂN
                      </Typography>
                    </GridItem>
                    {/* <GridItem xs={5} sm={5} md={5} >
                    
                    <FormControl >
                      <NativeSelect
                        className={classes.selectType}
                      >
                        <option value="" disabled>
                      Chọn thiết bị
                        </option>
                        <option value={"Days"}>Ngày</option>
                        <option value={"Hours"}>Giờ</option>
                        <option value={"Minutes"}>Phút</option>
                        <option value={"Raw"}>Chưa xử lý</option>
                      </NativeSelect>
                    
                    </FormControl>
                    </GridItem> */}
                    <GridItem xs={6} sm={6} md={6} />
                  </GridContainer>
                </CardHeader>
                <CardBody>
                  {
                     arrDeviceFarm.map((c, index) => {
                      if (c.type == 1) {
                        return (
                          <div>
                          <strong>{c.name}</strong>
                          <GridContainer key={index}>
                            {
                              c.switch_control.map((s, indexCtr) => {
                                return (
                                  <GridItem xs={6} sm={6} md={6}  key={indexCtr}>
                                      <GridContainer alignItems={"center"}>
                                      <GridItem xs={8} sm={8} md={8}>
                                      <span>{s.name}</span>
                                    </GridItem>
                                    <GridItem xs={4} sm={4} md={4}>
                                      <Switch
                                        checked={
                                          s.value == 1
                                            ? true
                                            : false
                                        }
                                        onChange={e => {
                                         s.value =
                                            e.target.checked == true ? 1 : 0;
                                          this.setState({
                                            arrswitch
                                          });
                                          this.handleDeviceControl(
                                            c._id,
                                            e.target.checked,
                                            indexCtr
                                          );
                                        }}
                                      />
                                    </GridItem>
                                      </GridContainer>
                                  </GridItem>
                                );
                              })}
                          </GridContainer>
                          </div>
                        );
                      } else {
                        <SnackbarContent
                          message={"Không có thiết bị điều khiển"}
                          close
                          color="warning"
                        />;
                      }
                    })}
                 
                </CardBody>
              </Card>
            )}
          </GridItem>
        </GridContainer>
        {listDashBoardHead.map((c, index) => {
          return arrHistogramOfThing.map((d, indexD) => {
          
            if (index == indexD && c.type!=1) {
              switch (c.value_name) {
                case "PH":
                  return (
                    /* 1 cho PH*/
                    <GridContainer key={index}>
                      <GridItem xs={12} sm={4} md={4}>
                        <Card>
                          <CardBody>
                            <ReactSpeedometer
                              maxValue={d.threshold_max}
                              value={c.value == null ? 0 : c.value}
                              needleColor="red"
                              startColor="green"
                              segments={10}
                              endColor="blue"
                              height={200}
                            />
                            <h4>{c.value_name}</h4>
                            <Typography>{`${c.value_name} Hiện tại là ${
                              c.value == null ? 0 : c.value
                            } ${c.unit}`}</Typography>
                          </CardBody>
                          <CardFooter>
                            <Icon>alarm</Icon>
                            <Typography>{`${c.value_name} Trung bình hôm nay ${
                              c.value == null ? 0 : c.value
                            } ${c.unit}`}</Typography>
                          </CardFooter>
                        </Card>
                      </GridItem>

                      <GridItem
                        xs={12}
                        sm={8}
                        md={8}
                        className={classes.parent}
                        style={{ marginTop: "-4em" }}
                      >
                        <CardHeader
                          color="rose"
                          className={classes.headerBox3}
                          stats
                          icon
                        >
                          <GridContainer>
                            <GridItem
                              xs={12}
                              sm={8}
                              md={8}
                              className={classes.parent}
                            >
                              <div className="btn-group keep-open-calender">
                                <DateRangePicker
                                  className={classes.daterangepicker3}
                                  id={`report_daterangepicker${parseInt(index) +
                                    parseInt(indexD)}`}
                                  ref={date => (this.Date = date)}
                                  timePicker={true}
                                  onChange={event => {
                                    this.handleChangeDatePicker(
                                      `report_daterangepicker${parseInt(index) +
                                        parseInt(indexD)}`,
                                      d._id
                                    );
                                  }}
                                />
                              </div>
                            </GridItem>
                            <GridItem xs={12} sm={4} md={4}>
                              <FormControl className={classes.formControl}>
                                <NativeSelect
                                  className={classes.selectEmpty}
                                  id={`typeDate${parseInt(index) +
                                    parseInt(indexD)}`}
                                  name="showTypeDateTimePicker"
                                  onChange={() => {
                                    this.handleChangeType(
                                      `typeDate${parseInt(index) +
                                        parseInt(indexD)}`
                                    );
                                  }}
                                >
                                  <option value="" disabled>
                                    Loại hiển thị
                                  </option>
                                  <option value={"Days"}>Ngày</option>
                                  <option value={"Hours"}>Giờ</option>
                                  <option value={"Minutes"}>Phút</option>
                                  <option value={"Raw"}>Giây</option>
                                </NativeSelect>
                                <FormHelperText>Loại hiển thị</FormHelperText>
                              </FormControl>
                            </GridItem>
                          </GridContainer>
                        </CardHeader>
                        <CustomTabs
                          title={c.value_name}
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
                                  <CardBody>
                                    <BarChart
                                      listDashBoardHead={c}
                                      arrHistogramOfThing={d}
                                    />
                                  </CardBody>
                                </Card>
                              )
                            },
                            {
                              tabName: "BẢNG",
                              tabIcon: Grid,
                              tabContent: (
                                <TableReport
                                  listDashBoardHead={c}
                                  arrHistogramOfThing={d}
                                />
                              )
                            }
                          ]}
                        />
                      </GridItem>
                    </GridContainer>
                  );
                  break;
                case "Temperature":
                  return (
                    /* 3 Nhiệt độ */
                    <GridContainer key={index} justify={"center"}>
                      <GridItem xs={12} sm={4} md={4}>
                        <Card>
                          <CardBody>
                            <ThermometerChar
                             valueMin={d.threshold_min}
                              valueMax={d.threshold_max}
                              valueChart={c.value == null ? 0 : c.value}
                            />
                            <h4>{c.value_name}</h4>
                            <Typography>{`${c.value_name} Hiện tại là ${
                              c.value == null ? 0 : c.value
                            } ${c.unit}`}</Typography>
                          </CardBody>
                          <CardFooter>
                            <Icon>alarm</Icon>
                            <Typography>{`${c.value_name} Trung bình hôm nay ${
                              c.value == null ? 0 : c.value
                            } ${c.unit}`}</Typography>
                          </CardFooter>
                        </Card>
                      </GridItem>
                      <GridItem
                        xs={12}
                        sm={8}
                        md={8}
                        style={{ marginTop: "-4em" }}
                      >
                        <CardHeader className={classes.headerBox3} stats icon>
                          <GridContainer>
                            <GridItem xs={12} sm={8} md={8}>
                              <div className="btn-group keep-open-calender">
                                <DateRangePicker
                                  className={classes.daterangepicker5}
                                  id={`report_daterangepicker${parseInt(index) +
                                    parseInt(indexD)}`}
                                  ref={date => (this.Date = date)}
                                  timePicker={true}
                                  onChange={event => {
                                    this.handleChangeDatePicker(
                                      `report_daterangepicker${parseInt(index) +
                                        parseInt(indexD)}`,
                                      d._id
                                    );
                                  }}
                                />
                              </div>
                            </GridItem>
                            <GridItem xs={12} sm={4} md={4}>
                              <FormControl className={classes.formControl}>
                                <NativeSelect
                                  className={classes.selectEmpty}
                                  id={`typeDate${parseInt(index) +
                                    parseInt(indexD)}`}

                                  // onChange={this.dateRangeChange1.bind(this)}
                                >
                                  <option value="" disabled>
                                    Loại hiển thị
                                  </option>
                                  <option value={"Days"}>Ngày</option>
                                  <option value={"Hours"}>Giờ</option>
                                  <option value={"Minutes"}>Phút</option>
                                  <option value={"Raw"}>Giây</option>
                                </NativeSelect>
                                <FormHelperText>Loại hiển thị</FormHelperText>
                              </FormControl>
                            </GridItem>
                          </GridContainer>
                        </CardHeader>
                        <CustomTabs
                          title={c.value_name}
                          headerColor="rose"
                          tabs={[
                            // {
                            //   tabName: "ĐƯỜNG",
                            //   tabIcon: BugReport,
                            //   tabContent: (
                            //     <Card>
                            //       <CardBody>{/* <BarChart /> */}</CardBody>
                            //     </Card>
                            //   )
                            // },
                            {
                              tabName: "CỘT",
                              tabIcon: Chart,
                              tabContent: (
                                <Card>
                                  <CardBody>
                                    <Histogram
                                      listDashBoardHead={c}
                                      arrHistogramOfThing={d}
                                    />
                                  </CardBody>
                                </Card>
                              )
                            },
                            {
                              tabName: "BẢNG",
                              tabIcon: Grid,
                              tabContent: (
                                <TableReport
                                  listDashBoardHead={c}
                                  arrHistogramOfThing={d}
                                />
                              )
                            }
                          ]}
                        />
                      </GridItem>
                    </GridContainer>
                  );
                  break;
                case "Humidity":
                  return (
                    /* 2 Độ ẩm */
                    <GridContainer key={index} justify={"center"}>
                      <GridItem xs={12} sm={4} md={4}>
                        <Card>
                          <CardBody>
                            <ChartLiquidFillGauge valueChart={c.value} />
                            <h4>{c.value_name}</h4>
                            <Typography>{`${c.value_name} Hiện tại là ${
                              c.value == null ? 0 : c.value
                            } ${c.unit}`}</Typography>
                          </CardBody>
                          <CardFooter>
                            <Icon>alarm</Icon>
                            <Typography>{`${c.value_name} Trung bình hôm nay ${
                              c.value == null ? 0 : c.value
                            } ${c.unit}`}</Typography>
                          </CardFooter>
                        </Card>
                      </GridItem>
                      <GridItem
                        xs={12}
                        sm={8}
                        md={8}
                        style={{ marginTop: "-4em" }}
                      >
                        <CardHeader className={classes.headerBox3} stats icon>
                          <GridContainer>
                            <GridItem xs={12} sm={8} md={8}>
                              <div className="btn-group keep-open-calender">
                                <DateRangePicker
                                  className={classes.daterangepicker4}
                                  id={`report_daterangepicker${parseInt(index) +
                                    parseInt(indexD)}`}
                                  ref={date => (this.Date = date)}
                                  timePicker={true}
                                  onChange={event => {
                                    this.handleChangeDatePicker(
                                      `report_daterangepicker${parseInt(index) +
                                        parseInt(indexD)}`,
                                      d._id
                                    );
                                  }}
                                />
                              </div>
                            </GridItem>
                            <GridItem xs={12} sm={4} md={4}>
                              <FormControl className={classes.formControl}>
                                <NativeSelect
                                  className={classes.selectEmpty}
                                  id={`typeDate${parseInt(index) +
                                    parseInt(indexD)}`}
                                  name="showTypeDateTimePicker"
                                  onChange={() => {
                                    this.handleChangeType(
                                      `typeDate${parseInt(index) +
                                        parseInt(indexD)}`
                                    );
                                  }}
                                >
                                  <option value="" disabled>
                                    Loại hiển thị
                                  </option>
                                  <option value={"Days"}>Ngày</option>
                                  <option value={"Hours"}>Giờ</option>
                                  <option value={"Minutes"}>Phút</option>
                                  <option value={"Raw"}>Chưa xử lý</option>
                                </NativeSelect>
                                <FormHelperText>Loại hiển thị</FormHelperText>
                              </FormControl>
                            </GridItem>
                          </GridContainer>
                        </CardHeader>
                        <CustomTabs
                          title={c.value_name}
                          headerColor="rose"
                          tabs={[
                            // {
                            //   tabName: "ĐƯỜNG",
                            //   tabIcon: BugReport,
                            //   tabContent: (
                            //     <Card>
                            //       <CardBody>{/* <BarChart /> */}</CardBody>
                            //     </Card>
                            //   )
                            // },
                            {
                              tabName: "CỘT",
                              tabIcon: Chart,
                              tabContent: (
                                <Card>
                                  <CardBody>
                                    <BarChart
                                      listDashBoardHead={c}
                                      arrHistogramOfThing={d}
                                    />
                                  </CardBody>
                                </Card>
                              )
                            },
                            {
                              tabName: "BẢNG",
                              tabIcon: Grid,
                              tabContent: (
                                <TableReport
                                  listDashBoardHead={c}
                                  arrHistogramOfThing={d}
                                />
                              )
                            }
                          ]}
                        />
                      </GridItem>
                    </GridContainer>
                  );
                  break;
                case "EC":
                  return (
                    /* 4 Độ dẫn điện của đất*/
                    <GridContainer key={index} justify={"center"}>
                      <GridItem xs={12} sm={4} md={4}>
                        <Card>
                          <CardBody>
                            <GaugeChart valueChart={c.value} valueMax={d.threshold_max} />
                            <h4>{c.value_name}</h4>
                            <Typography>{`${c.value_name} Hiện tại là ${
                              c.value == null ? 0 : c.value
                            } ${c.unit}`}</Typography>
                          </CardBody>
                          <CardFooter>
                            <Icon>alarm</Icon>
                            <Typography>{`${c.value_name} Trung bình hôm nay ${
                              c.value == null ? 0 : c.value
                            } ${c.unit}`}</Typography>
                          </CardFooter>
                        </Card>
                      </GridItem>
                      <GridItem
                        xs={12}
                        sm={8}
                        md={8}
                        className={classes.parent}
                        style={{ marginTop: "-4em" }}
                      >
                        <CardHeader className={classes.headerBox3} stats icon>
                          <GridContainer>
                            <GridItem xs={12} sm={8} md={8}>
                              <div className="btn-group keep-open-calender">
                                <DateRangePicker
                                  className={classes.daterangepicker6}
                                  id={`report_daterangepicker${parseInt(index) +
                                    parseInt(indexD)}`}
                                  ref={date => (this.Date = date)}
                                  timePicker={true}
                                  onChange={event => {
                                    this.handleChangeDatePicker(
                                      `report_daterangepicker${parseInt(index) +
                                        parseInt(indexD)}`,
                                      d._id
                                    );
                                  }}
                                />
                              </div>
                            </GridItem>
                            <GridItem xs={12} sm={4} md={4}>
                              <FormControl className={classes.formControl}>
                                <NativeSelect
                                  className={classes.selectEmpty}
                                  id={`typeDate${parseInt(index) +
                                    parseInt(indexD)}`}
                                  name="showTypeDateTimePicker"
                                  onChange={() => {
                                    this.handleChangeType(
                                      `typeDate${parseInt(index) +
                                        parseInt(indexD)}`
                                    );
                                  }}
                                >
                                  <option value="" disabled>
                                    Loại hiển thị
                                  </option>
                                  <option value={"Days"}>Ngày</option>
                                  <option value={"Hours"}>Giờ</option>
                                  <option value={"Minutes"}>Phút</option>
                                  <option value={"Raw"}>Chưa xử lý</option>
                                </NativeSelect>
                                <FormHelperText>Loại hiển thị</FormHelperText>
                              </FormControl>
                            </GridItem>
                          </GridContainer>
                        </CardHeader>
                        <CustomTabs
                          title={c.value_name}
                          headerColor="rose"
                          tabs={[
                            {
                              tabName: "ĐƯỜNG",
                              tabIcon: BugReport,
                              tabContent: (
                                <Card>
                                  <CardBody>
                                    <LineChart
                                      listDashBoardHead={c}
                                      arrHistogramOfThing={d}
                                    />
                                  </CardBody>
                                </Card>
                              )
                            },
                            // {
                            //   tabName: "CỘT",
                            //   tabIcon: Code,
                            //   tabContent: (
                            //     <Card>
                            //       <CardBody>{/* <LineChart /> */}</CardBody>
                            //     </Card>
                            //   )
                            // },
                            {
                              tabName: "BẢNG",
                              tabIcon: Grid,
                              tabContent: (
                                <Card>
                                  <TableReport
                                    listDashBoardHead={c}
                                    arrHistogramOfThing={d}
                                  />
                                </Card>
                              )
                            }
                          ]}
                        />
                      </GridItem>
                    </GridContainer>
                  );
                  break;
                default:
                  return (
                    /* 2 Độ ẩm */
                    <GridContainer key={index} justify={"center"}>
                      <GridItem xs={12} sm={4} md={4}>
                        <Card>
                          <CardBody>
                            <ChartLiquidFillGauge valueChart={c.value} />
                            <h4>{c.value_name}</h4>
                            <Typography>{`${c.value_name} Hiện tại là ${
                              c.value == null ? 0 : c.value
                            } ${c.unit}`}</Typography>
                          </CardBody>
                          <CardFooter>
                            <Icon>alarm</Icon>
                            <Typography>{`${c.value_name} Trung bình hôm nay ${
                              c.value == null ? 0 : c.value
                            } ${c.unit}`}</Typography>
                          </CardFooter>
                        </Card>
                      </GridItem>
                      <GridItem
                        xs={12}
                        sm={8}
                        md={8}
                        style={{ marginTop: "-4em" }}
                      >
                        <CardHeader className={classes.headerBox3} stats icon>
                          <GridContainer>
                            <GridItem xs={12} sm={8} md={8}>
                              <div className="btn-group keep-open-calender">
                                <DateRangePicker
                                  className={classes.daterangepicker4}
                                  id={`report_daterangepicker${parseInt(index) +
                                    parseInt(indexD)}`}
                                  ref={date => (this.Date = date)}
                                  timePicker={true}
                                  onChange={event => {
                                    this.handleChangeDatePicker(
                                      `report_daterangepicker${parseInt(index) +
                                        parseInt(indexD)}`,
                                      d._id
                                    );
                                  }}
                                />
                              </div>
                            </GridItem>
                            <GridItem xs={12} sm={4} md={4}>
                              <FormControl className={classes.formControl}>
                                <NativeSelect
                                  className={classes.selectEmpty}
                                  id={`typeDate${parseInt(index) +
                                    parseInt(indexD)}`}
                                  name="showTypeDateTimePicker"
                                  onChange={() => {
                                    this.handleChangeType(
                                      `typeDate${parseInt(index) +
                                        parseInt(indexD)}`
                                    );
                                  }}
                                >
                                  <option value="" disabled>
                                    Loại hiển thị
                                  </option>
                                  <option value={"Days"}>Ngày</option>
                                  <option value={"Hours"}>Giờ</option>
                                  <option value={"Minutes"}>Phút</option>
                                  <option value={"Raw"}>Chưa xử lý</option>
                                </NativeSelect>
                                <FormHelperText>Loại hiển thị</FormHelperText>
                              </FormControl>
                            </GridItem>
                          </GridContainer>
                        </CardHeader>
                        <CustomTabs
                          title={c.value_name}
                          headerColor="rose"
                          tabs={[
                            // {
                            //   tabName: "ĐƯỜNG",
                            //   tabIcon: BugReport,
                            //   tabContent: (
                            //     <Card>
                            //       <CardBody>{/* <BarChart /> */}</CardBody>
                            //     </Card>
                            //   )
                            // },
                            {
                              tabName: "CỘT",
                              tabIcon: Chart,
                              tabContent: (
                                <Card>
                                  <CardBody>
                                    <BarChart
                                      listDashBoardHead={c}
                                      arrHistogramOfThing={d}
                                    />
                                  </CardBody>
                                </Card>
                              )
                            },
                            {
                              tabName: "BẢNG",
                              tabIcon: Grid,
                              tabContent: (
                                <TableReport
                                  listDashBoardHead={c}
                                  arrHistogramOfThing={d}
                                />
                              )
                            }
                          ]}
                        />
                      </GridItem>
                    </GridContainer>
                  );
                  break;
              }
            }
          });
        })}
        <SweetAlert
          timer={2000}
          customClass={classes.sweet}
          show={showNotifyDelete}
          showCancel
          warning={typeWarning}
          confirmBtnText="Xóa ngay"
          confirmBtnBsStyle="danger"
          cancelBtnBsStyle="default"
          title="Bạn có chắc chắn muốn xóa thiết bị"
          onConfirm={() => {
            this.handleDeleteThing();
          }}
          onCancel={() => {
            this.handleCancel();
          }}
        />
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
