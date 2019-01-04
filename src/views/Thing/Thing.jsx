import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import $ from "jquery";
import SweetAlert from "react-bootstrap-sweetalert";
// react plugin for creating charts
// @material-ui/core
import FormHelperText from "@material-ui/core/FormHelperText";
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Button from "@material-ui/core/Button";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Modal from "@material-ui/core/Modal";
import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import thingStyle from "assets/jss/common-styles/views/thingStyle.jsx";
import Common from "../../utils/Common";
import API from "../../utils/API";
import { Clear } from "@material-ui/icons/Clear";
class Thing extends React.Component {
  state = {
    //variable modal, notify and select, button
    open: false,
    arrToggle: [],
    showNotify: false,
    typeNotify: "",
    titleNotify: "",
    isShowModal: false,
    showNotifyDelete: false,
    switchCreate: false,
    switchEdit: false,
    valueTypeEdit: "",
    typeAction: "",
    selectValueName: [],
    selectMethod: [],
    valueType: "",
    valueName: "",
    selectValueNameEdit: [],
    valueNameEdit: "",
    typeSuccess: false,
    typeWarning: false,
    //variable for thing
    arrDeviceFarm: [],
    idThing: "",
    arrDeviceMapping: [],
    codeDevice: "",
    objInfoDeviceMapping: {
      name: "",
      type: "",
      method: [],
      value_name: [],
      switch_control: []
    },
    objThingId: {},
    disable: true,
    arrDeviceAll: [],
    switch_control: [],
    arrswitch: []
  };
  componentDidMount() {
    this._getDeviceFarm();
    this._getDeviceMapping();
    this._getDeviceAll();
  }
  // handle for thing
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
        let { arrswitch } = this.state;
        let arrObjTogle = [];
        let arrDevice = [];
        arrswitch = [];
        arr.map((c, index) => {
          arrDevice.push(c._id);
          let objToggle = {};
          objToggle.postion = index;
          objToggle.open = false;
          arrObjTogle.push(objToggle);
          arrswitch.push(c.switch_control);
        });
        let farm = JSON.parse(localStorage.getItem("farm"));

        farm.device = arrDevice;
        localStorage.setItem("farm", JSON.stringify(farm));

        this.setState({
          arrDeviceFarm: arr,
          arrToggle: arrObjTogle,
          arrswitch: arrswitch
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  async _getDeviceAll() {
    let objDeviceAll = {
      method: "POST",
      data: {},
      url: API.getAPI().getDeviceFarm
    };
    await Common.request(objDeviceAll)
      .then(arr => {
        let { arrswitch } = this.state;
        let arrObjTogle = [];
        let arrDevice = [];
        arrswitch = [];
        arr.map((c, index) => {
          arrDevice.push(c._id);
          let objToggle = {};
          objToggle.postion = index;
          objToggle.open = false;
          arrObjTogle.push(objToggle);
          arrswitch.push(c.switch_control);
        });
        let farm = JSON.parse(localStorage.getItem("farm"));

        farm.device = arrDevice;
        localStorage.setItem("farm", JSON.stringify(farm));

        this.setState({
          arrDeviceAll: arr,
          arrToggle: arrObjTogle,
          arrswitch: arrswitch
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleDelete(_id) {
    this.setState({
      showNotifyDelete: true,
      idThing: _id
    });
  }
  handleCloseModal() {
    this.setState({ isShowModal: false });
  }
  handleCloseNotify() {
    this.setState({
      showNotify: false,
      showNotifyDelete: false,
      isShowModal: false
    });
  }
  handleDeviceControl(id_thing, method, index) {
    let methodUpdate = "OFF";
    if (method == true) {
      methodUpdate = "On";
    } else {
      methodUpdate = "Off";
    }
    let objSwitchControl = {
      method: "POST",
      data: { id: id_thing, method: methodUpdate, index: index },
      url: API.getAPI().deviceControl
    };
    Common.request(objSwitchControl)
      .then(arr => {})
      .catch(err => {
        console.log(err);
      });
  }
  async handleDeleteThing() {
    let { idThing } = this.state;
    let objThing = {
      method: "DELETE",
      data: {},
      url: API.getAPI().deleteDevice + idThing
    };

    await Common.request(objThing)
      .then(arr => {
        this._getDeviceFarm();
        this._getDeviceAll();
        this.setState({
          showNotifyDelete: false,
          showNotify: false,
          typeSuccess: true,
          typeWarning: false,
          titleNotify: "Xóa thiết bị thành công"
        });
        setTimeout(() => {
          this.setState({
            showNotify: false,
            isShowModal: false
          });
        }, 2000);
      })
      .catch(err => {
        console.log(err);
        this.setState({
          showNotifyDelete: false,
          showNotify: true,
          typeSuccess: false,
          typeWarning: true,
          titleNotify: "Xóa thiết bị không thành công."
        });
        setTimeout(() => {
          this.setState({
            showNotify: false,
            isShowModal: false
          });
        }, 2000);
      });
  }
  async handleCreateThing() {
    let {
      selectMethod,
      selectValueName,
      codeDevice,
      objInfoDeviceMapping,
      switch_control
    } = this.state;
    let _id = codeDevice;
    if (_id == "") {
      this.setState({
        showNotify: true,
        showNotifyDelete: false,
        typeSuccess: false,
        typeWarning: true,
        titleNotify: "Vui lòng chọn mã thiết bị."
      });
      setTimeout(() => {
        this.setState({
          showNotify: false,
          isShowModal: false
        });
      }, 2000);
      return;
    }
    let name = $("#txtName").val();
    let threshold_special = $("#txtThresholdSpecial").val();
    let threshold_max = $("#txtThresholdMax").val();
    let threshold_min = $("#txtThresholdMin").val();
    let unit = $("#txtUnit").val();
    let status = this.state.switchCreate;
    let method = objInfoDeviceMapping.method;
    // let value_name = selectValueName;
    let value_name = $("#select-value-name").val();
    let description = $("#txtDescription").val();
    // let type = $("#select-type").val();
    // console.log(type);
    // if (type == "push data") {
    //   numberType = 0;
    // }
    let numberType = 1;
    let swControl = [];

    if (objInfoDeviceMapping.method == "") {
      numberType = 0;
    } else {
      swControl = switch_control;
    }
    let objThing = {
      method: "POST",
      data: {
        _id: _id,
        name: name,
        status: status,
        value_name: value_name,
        description: description,
        type: numberType,
        threshold_max: threshold_max,
        threshold_min: threshold_min,
        threshold_special: threshold_special,
        method: method,
        unit: unit,
        switch_control: swControl
      },
      url: API.getAPI().addDevice
    };
    console.log("swControl");
    console.log(objThing);
    await Common.request(objThing)
      .then(arr => {
        this._getDeviceFarm();
        this._getDeviceAll();
        this.setState({
          showNotify: true,
          showNotifyDelete: false,
          typeSuccess: true,
          typeWarning: false,
          titleNotify: "Thêm thiết bị thành công"
        });
        setTimeout(() => {
          this.setState({
            showNotify: false,
            isShowModal: false
          });
        }, 2000);
      })
      .catch(err => {
        this.setState({
          showNotify: true,
          showNotifyDelete: false,
          typeSuccess: false,
          typeWarning: true,
          titleNotify: "Thêm thiết bị thất bại. Vui lòng thử lại."
        });
        setTimeout(() => {
          this.setState({
            showNotify: false,
            isShowModal: false
          });
        }, 2000);
        console.log(err);
      });
  }
  async handleEditThing() {
    let { idThing, switch_control, objThingId } = this.state;
    let name = $("#txtName").val();
    let threshold_special = $("#txtThresholdSpecial").val();
    let threshold_max = $("#txtThresholdMax").val();
    let threshold_min = $("#txtThresholdMin").val();
    let status = this.state.switchEdit;
    let description = $("#txtDescription").val();
    // let type = $("#select-type").val();
    let unit = $("#txtUnit").val();
    let numberType = 1;
    // if (type == "push data") {
    //   numberType = 0;
    // }

    let swControl = [];

    if (objThingId.method.length <= 0) {
      numberType = 0;
    } else {
      swControl = switch_control;
      numberType = 1;
    }
    let objThing = {
      method: "PUT",
      data: {
        value: false,
        name: name,
        status: status,
        description: description,
        type: numberType,
        unit: unit,
        threshold_max: threshold_max,
        threshold_min: threshold_min,
        threshold_special: threshold_special,
        switch_control: swControl
      },
      url: API.getAPI().editDevice + idThing
    };

    await Common.request(objThing)
      .then(arr => {
        this._getDeviceFarm();
        this._getDeviceAll();
        this.setState({
          showNotify: true,
          showNotifyDelete: false,
          typeSuccess: true,
          typeWarning: false,
          titleNotify: "Cập nhật thông tin thiết bị thành công"
        });
        setTimeout(() => {
          this.setState({
            showNotify: false,
            isShowModal: false
          });
        }, 2000);
      })
      .catch(err => {
        this.setState({
          showNotify: true,
          showNotifyDelete: false,
          typeSuccess: false,
          typeWarning: true,
          titleNotify: "Cập nhật thông tin thiết bị thất bại. Vui lòng thử lại."
        });
        setTimeout(() => {
          this.setState({
            showNotify: false,
            isShowModal: false
          });
        }, 2000);
        console.log(err);
      });
  }
  handleShowCreate(typeAction, _id) {
    this.setState({ isShowModal: true, typeAction: typeAction });
  }
  async handleShowEdit(typeAction, _id) {
    let objThing = {
      method: "POST",
      data: {},
      url: API.getAPI().editDevice + _id
    };

    await Common.request(objThing)
      .then(arr => {
        this.setState({
          isShowModal: true,
          typeAction: typeAction,
          selectValueNameEdit: arr.value_name,
          objThingId: arr,
          valueTypeEdit: arr.type,
          switchEdit: arr.status,
          idThing: _id,
          switch_control: arr.switch_control
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  async _getDeviceMapping() {
    let objDeviceMapping = {
      method: "POST",
      data: {},
      url: API.getAPI().getDeviceMapping
    };
    await Common.request(objDeviceMapping)
      .then(arr => {
        this.setState({ arrDeviceMapping: arr });
      })
      .catch(err => {
        console.log(err);
      });
  }
  async _getInfoDeviceMapping(_idDeviceThing) {
    let objDeviceMapping = {
      method: "POST",
      data: {},
      url: API.getAPI().getInfoDeviecMapping + _idDeviceThing
    };

    await Common.request(objDeviceMapping)
      .then(arr => {
        let { switch_control } = this.state;
        switch_control = arr.switch_control;
        this.setState({
          valueType: arr.type,
          objInfoDeviceMapping: arr,
          disable: false,
          switch_control: switch_control
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  mappingDataDevice() {
    let codeDevice = $("#select-code-device").val();
    this._getInfoDeviceMapping(codeDevice);
    this.setState({
      codeDevice: codeDevice,
      selectMethod: [],
      selectValueName: []
    });
  }
  handleCancel() {
    this.setState({
      showNotifyDelete: false
    });
  }

  //handle for toggle
  handleToggle = index => {
    // this.setState(state => ({ open: !state.open }));
    // alert(index);
    let { arrToggle } = this.state;

    arrToggle.map((c, postion) => {
      if (index == postion) {
        c.open = !c.open;
        this.setState({ arrToggle: arrToggle });
      }
    });
  };

  handleClose = event => {
    this.setState({ open: false });
  };
  handleChangeValueName(event) {
    this.setState({
      selectValueName: event.target.value
    });
  }
  handleChangeMethod(event) {
    this.setState({
      selectMethod: event.target.value
    });
  }
  handleChangeType(event) {
    this.setState({ valueType: event.target.value });
  }
  handleChangeValue(event) {
    this.setState({ valueName: event.target.value });
  }
  handleChangeValueEdit(event) {
    this.setState({ valueNameEdit: event.target.value });
  }
  handleChangeTypeEdit(event) {
    this.setState({ valueTypeEdit: event.target.value });
  }
  handChangeSwitchCreate() {
    let { switchCreate } = this.state;
    this.setState({
      switchCreate: !switchCreate
    });
  }
  handleShowSwitch(index) {
    $("#boxSwitch" + index).toggle();
  }
  handChangeSwitchEdit() {
    let { switchEdit } = this.state;
    this.setState({
      switchEdit: !switchEdit
    });
  }
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
    const {
      // variable for modal, notify and switch
      open,
      arrToggle,
      showNotifyDelete,
      showNotify,
      typeNotify,
      titleNotify,
      isShowModal,
      typeAction,
      switchCreate,
      selectValueNameEdit,
      //variable for thing
      arrDeviceFarm,
      arrDeviceMapping,
      objInfoDeviceMapping,
      selectValueName,
      selectMethod,
      objThingId,
      switchEdit,
      typeSuccess,
      typeWarning,
      valueTypeEdit,
      disable,
      arrDeviceAll,
      switch_control,
      arrswitch
    } = this.state;
    //const arr = [{name:"1", open:false }, {name:"2", open: false}];
    console.log("switch_control");
    console.log(arrswitch);

    const _role = JSON.parse(localStorage.getItem("user")).role;
    let role = Common.verify("VIEW", _role);
    let isRoleRoot = role.filter(c => c.role == "ROOT");
    let isMaster = role.filter(c => c.role == "MASTER");
    let isEditor = role.filter(c => c.role == "EDITOR");
    let roleAdd = Common.verify("ADD", _role);
    let EditorAdd = roleAdd.filter(c => c.role == "EDITOR");
    let RootAdd = roleAdd.filter(c => c.role == "ROOT");
    let roleDelete = Common.verify("DELETE", _role);
    let EditorDelete = roleDelete.filter(c => c.role == "EDITOR");
    let MasterDelete = roleDelete.filter(c => c.role == "MASTER");
    let RootDelete = roleDelete.filter(c => c.role == "ROOT");

    return (
      <div>
        {RootAdd.length > 0 &&
          RootAdd[0].method == true && (
            <div className={classes.stats} style={{ marginRight: 10 }}>
              <Button
                variant="extendedFab"
                color="secondary"
                className={classes.button}
                onClick={() => {
                  this.handleShowCreate("create", "");
                }}
              >
                <Icon>add-icon</Icon>
                Thêm thiết bị
              </Button>
            </div>
          )}

        <GridContainer>
          {isRoleRoot.length > 0 && isRoleRoot[0].method == true
            ? arrDeviceAll.map((c, index) => {
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
                    <Card>
                      <CardHeader
                        style={{ margin: "0px 0px" }}
                        color="success"
                        stats
                        icon
                      >
                        <CardIcon color="success">
                          <Icon>{icon}</Icon>
                        </CardIcon>
                        <Button
                          color={c.status == true ? "secondary" : "default"}
                          ref={node => {
                            this.anchorEl = node;
                          }}
                          aria-owns={open ? "menu-list-grow" : undefined}
                          aria-haspopup="true"
                          onClick={() => {
                            this.handleToggle(index);
                          }}
                        >
                          {c.status == true ? (
                            <Icon style={{ fontSize: 50 }}>toggle_on</Icon>
                          ) : (
                            <Icon style={{ fontSize: 50 }}>toggle_off</Icon>
                          )}
                        </Button>
                      </CardHeader>
                      <CardBody>
                        <GridContainer>
                          <GridItem xs={4} sm={4} md={4}>
                            <span>Tên:</span>
                          </GridItem>
                          <GridItem xs={8} sm={8} md={8}>
                            <strong className={classes.lineClamp}>
                              {c.name}
                            </strong>
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={4} sm={4} md={4}>
                            <span>Loại:</span>
                          </GridItem>
                          <GridItem xs={8} sm={8} md={8}>
                            <strong className={classes.lineClamp}>
                              {c.type == 1 ? "control" : "push data"}
                            </strong>
                          </GridItem>
                        </GridContainer>

                        <GridContainer>
                          <GridItem xs={4} sm={4} md={4}>
                            <span>Giá trị:</span>
                          </GridItem>
                          <GridItem xs={8} sm={8} md={8}>
                            <strong className={classes.lineClamp}>
                              {c.value_name}
                            </strong>
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={4} sm={4} md={4}>
                            <span>Đơn vị:</span>
                          </GridItem>
                          <GridItem xs={8} sm={8} md={8}>
                            <strong>
                              <sup className={classes.lineClamp}>{c.unit}</sup>
                            </strong>
                          </GridItem>
                        </GridContainer>
                        <GridContainer
                          id={`boxSwitch` + index}
                          style={{ display: "none" }}
                        >
                          {c.type == 1 && (
                            <GridItem xs={12} sm={12} md={12}>
                              <span>Loại thiết bị:</span>
                              {arrswitch.length > 0 &&
                                c.switch_control.map((s, indexCtr) => {
                                  return (
                                    <GridContainer
                                      alignItems={"center"}
                                      key={indexCtr}
                                    >
                                      <GridItem xs={8} sm={8} md={8}>
                                        <span>{s.name}</span>
                                      </GridItem>
                                      <GridItem xs={4} sm={4} md={4}>
                                        <Switch
                                          checked={s.value == 1 ? true : false}
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
                                  );
                                })}
                            </GridItem>
                          )}
                        </GridContainer>
                      </CardBody>
                      <CardFooter className={classes.customCardFooter} stats>
                        {c.type == 1 && (
                          <div
                            className={classes.stats}
                            style={{ marginRight: 10 }}
                          >
                            <Button
                              variant="fab"
                              color="primary"
                              aria-label="Edit"
                              className={classes.customBottom}
                              onClick={() => {
                                this.handleShowSwitch(index);
                              }}
                            >
                              <Icon className={classes.customIcon}>dock</Icon>
                            </Button>
                          </div>
                        )}

                        <div
                          className={classes.stats}
                          style={{ marginRight: 10 }}
                        >
                          <Button
                            variant="fab"
                            color="secondary"
                            aria-label="Edit"
                            className={classes.customBottom}
                            onClick={() => {
                              this.handleShowEdit("edit", c._id);
                            }}
                          >
                            <Icon className={classes.customIcon}>
                              edit_icon
                            </Icon>
                          </Button>
                        </div>
                        <div className={classes.stats}>
                          {EditorDelete.length > 0 &&
                            EditorDelete[0].method == true && (
                              <Button
                                variant="fab"
                                color="default"
                                aria-label="Delete"
                                className={classes.customBottom}
                                onClick={() => {
                                  this.handleDelete(c._id);
                                }}
                              >
                                <Icon className={classes.customIcon}>
                                  delete_icon
                                </Icon>
                              </Button>
                            )}
                          {((RootDelete.length > 0 &&
                            RootDelete[0].method == true) ||
                            (MasterDelete.lenght > 0 &&
                              MasterDelete[0].method == true)) && (
                            <Button
                              variant="fab"
                              color="default"
                              aria-label="Delete"
                              className={classes.customBottom}
                              onClick={() => {
                                this.handleDelete(c._id);
                              }}
                            >
                              <Icon className={classes.customIcon}>
                                delete_icon
                              </Icon>
                            </Button>
                          )}
                        </div>
                      </CardFooter>
                    </Card>
                  </GridItem>
                );
              })
            : arrDeviceFarm.map((c, index) => {
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
                    <Card>
                      <CardHeader
                        style={{ margin: "0px 0px" }}
                        color="success"
                        stats
                        icon
                      >
                        <CardIcon color="success">
                          <Icon>{icon}</Icon>
                        </CardIcon>
                        <Button
                          color={c.status == true ? "secondary" : "default"}
                          ref={node => {
                            this.anchorEl = node;
                          }}
                          aria-owns={open ? "menu-list-grow" : undefined}
                          aria-haspopup="true"
                          onClick={() => {
                            this.handleToggle(index);
                          }}
                        >
                          {c.status == true ? (
                            <Icon style={{ fontSize: 50 }}>toggle_on</Icon>
                          ) : (
                            <Icon style={{ fontSize: 50 }}>toggle_off</Icon>
                          )}
                        </Button>
                      </CardHeader>
                      <CardBody>
                        <GridContainer>
                          <GridItem xs={4} sm={4} md={4}>
                            <span>Tên:</span>
                          </GridItem>
                          <GridItem xs={8} sm={8} md={8}>
                            <strong className={classes.lineClamp}>
                              {c.name}
                            </strong>
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={4} sm={4} md={4}>
                            <span>Loại:</span>
                          </GridItem>
                          <GridItem xs={8} sm={8} md={8}>
                            <strong className={classes.lineClamp}>
                              {c.type == 1 ? "control" : "push data"}
                            </strong>
                          </GridItem>
                        </GridContainer>

                        <GridContainer>
                          <GridItem xs={4} sm={4} md={4}>
                            <span>Giá trị:</span>
                          </GridItem>
                          <GridItem xs={8} sm={8} md={8}>
                            <strong className={classes.lineClamp}>
                              {c.value_name}
                            </strong>
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={4} sm={4} md={4}>
                            <span>Đơn vị:</span>
                          </GridItem>
                          <GridItem xs={8} sm={8} md={8}>
                            <strong>
                              <sup className={classes.lineClamp}>{c.unit}</sup>
                            </strong>
                          </GridItem>
                        </GridContainer>
                        <GridContainer
                          id={`boxSwitch` + index}
                          style={{ display: "none" }}
                        >
                          {c.type == 1 && (
                            <GridItem xs={12} sm={12} md={12}>
                              <span>Loại thiết bị:</span>
                              {arrswitch.length > 0 &&
                                c.switch_control.map((s, indexCtr) => {
                                  return (
                                    <GridContainer
                                      alignItems={"center"}
                                      key={indexCtr}
                                    >
                                      <GridItem xs={8} sm={8} md={8}>
                                        <span>{s.name}</span>
                                      </GridItem>
                                      <GridItem xs={4} sm={4} md={4}>
                                        <Switch
                                          checked={s.value == 1 ? true : false}
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
                                  );
                                })}
                            </GridItem>
                          )}
                        </GridContainer>
                      </CardBody>
                      <CardFooter className={classes.customCardFooter} stats>
                        {c.type == 1 && (
                          <div
                            className={classes.stats}
                            style={{ marginRight: 10 }}
                          >
                            <Button
                              variant="fab"
                              color="primary"
                              aria-label="Edit"
                              className={classes.customBottom}
                              onClick={() => {
                                this.handleShowSwitch(index);
                              }}
                            >
                              <Icon className={classes.customIcon}>dock</Icon>
                            </Button>
                          </div>
                        )}
                        <div
                          className={classes.stats}
                          style={{ marginRight: 10 }}
                        >
                          <Button
                            variant="fab"
                            color="secondary"
                            aria-label="Edit"
                            className={classes.customBottom}
                            onClick={() => {
                              this.handleShowEdit("edit", c._id);
                            }}
                          >
                            <Icon className={classes.customIcon}>
                              edit_icon
                            </Icon>
                          </Button>
                        </div>
                        <div className={classes.stats}>
                          {EditorDelete.length > 0 &&
                            EditorDelete[0].method == true && (
                              <Button
                                variant="fab"
                                color="default"
                                aria-label="Delete"
                                className={classes.customBottom}
                                onClick={() => {
                                  this.handleDelete(c._id);
                                }}
                              >
                                <Icon className={classes.customIcon}>
                                  delete_icon
                                </Icon>
                              </Button>
                            )}
                          {((RootDelete.length > 0 &&
                            RootDelete[0].method == true) ||
                            (MasterDelete.lenght > 0 &&
                              MasterDelete[0].method == true)) && (
                            <Button
                              variant="fab"
                              color="default"
                              aria-label="Delete"
                              className={classes.customBottom}
                              onClick={() => {
                                this.handleDelete(c._id);
                              }}
                            >
                              <Icon className={classes.customIcon}>
                                delete_icon
                              </Icon>
                            </Button>
                          )}
                        </div>
                      </CardFooter>
                    </Card>
                  </GridItem>
                );
              })}
          <SweetAlert
            customClass={classes.sweet}
            timer={2000}
            show={showNotifyDelete}
            warning
            showCancel
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
          <SweetAlert
            timer={2000}
            customClass={classes.sweet}
            show={showNotify}
            success={typeSuccess}
            warning={typeWarning}
            title={titleNotify}
            onConfirm={() => {
              this.handleCloseNotify();
            }}
          />
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={isShowModal}
          >
            <div className={classes.modalThing}>
              {typeAction == "create" && (
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <Card>
                      <CardHeader color="rose">
                        <h4 className={classes.cardTitleWhite}>
                          TẠO THIẾT BỊ MỚI
                        </h4>
                      </CardHeader>
                      <CardBody style={{ overflow: "auto", maxHeight: "70vh" }}>
                        <GridContainer alignItems={"flex-end"}>
                          <GridItem xs={12} sm={6} md={6}>
                            <FormControl className={classes.formControl}>
                              <NativeSelect
                                className={classes.customNativeSelect}
                                id="select-code-device"
                                name="codeDevice"
                                value={this.state.codeDevice}
                                onChange={this.mappingDataDevice.bind(this)}
                              >
                                <option value="" disabled>
                                  Mã thiết bị
                                </option>
                                {arrDeviceMapping.length > 0 &&
                                  arrDeviceMapping.map((c, index) => {
                                    return <option key={index}>{c}</option>;
                                  })}
                              </NativeSelect>
                            </FormControl>
                          </GridItem>
                          <GridItem xs={12} sm={6} md={6}>
                            <CustomInput
                              labelText="Tên thiết bị"
                              id="txtName"
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                //defaultValue: "Vd: ContactorForAirCon1",
                                value: objInfoDeviceMapping.name,
                                onChange: e => {
                                  objInfoDeviceMapping.name =
                                    e.currentTarget.value;
                                  this.setState({ objInfoDeviceMapping });
                                },
                                disabled: disable
                              }}
                              ref={input => (this.txtName = input)}
                            />
                          </GridItem>
                        </GridContainer>
                        <GridContainer alignItems={"flex-end"}>
                          <GridItem xs={12} sm={6} md={6}>
                            <FormControl className={classes.formControl}>
                              <NativeSelect
                                className={classes.customNativeSelect}
                                id="select-value-name"
                                value={this.state.valueName}
                                onChange={this.handleChangeValue.bind(this)}
                              >
                                <option value="" disabled>
                                  Chọn thiết bị
                                </option>
                                {objInfoDeviceMapping.value_name.map(
                                  (v, index) => {
                                    return (
                                      <option key={index} value={v}>
                                        {v}
                                      </option>
                                    );
                                  }
                                )}
                              </NativeSelect>
                            </FormControl>
                          </GridItem>
                          <GridItem xs={12} sm={6} md={6}>
                            <CustomInput
                              labelText="Đơn vị đo"
                              id="txtUnit"
                              disabled={disable}
                              inputProps={{}}
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                disabled: disable
                              }}
                              ref={input => (this.txtUnit = input)}
                            />
                          </GridItem>
                        </GridContainer>
                        <GridContainer alignItems={"flex-end"}>
                          <GridItem xs={12} sm={4} md={4}>
                            <CustomInput
                              labelText="Ngưỡng tối đa"
                              id="txtThresholdMax"
                              type="number"
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                disabled: disable,
                                type: "number"
                              }}
                              ref={input => (this.txtThresholdMax = input)}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={4} md={4}>
                            <CustomInput
                              labelText="Ngưỡng tối thiểu"
                              id="txtThresholdMin"
                              type="number"
                              inputProps={{
                                disabled: disable,
                                type: "number"
                              }}
                              formControlProps={{
                                fullWidth: true
                              }}
                              ref={input => (this.txtThresholdMin = input)}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={4} md={4}>
                            <CustomInput
                              labelText="Ngưỡng đặc biệt"
                              id="txtThresholdSpecial"
                              type="number"
                              inputProps={{
                                disabled: disable,
                                type: "number"
                              }}
                              formControlProps={{
                                fullWidth: true
                              }}
                              ref={input => (this.txtThresholdMin = input)}
                            />
                          </GridItem>
                        </GridContainer>

                        {Object.keys(objInfoDeviceMapping).length > 0 &&
                          objInfoDeviceMapping.switch_control.length > 0 && (
                            <div>
                              <label style={{ float: "left", paddingTop: 20 }}>
                                Các loại thiết bị điều khiển
                              </label>
                              <GridContainer style={{ clear: "both" }}>
                                {objInfoDeviceMapping.switch_control.map(
                                  (c, index) => {
                                    return (
                                      <GridItem
                                        xs={6}
                                        sm={6}
                                        md={6}
                                        key={index}
                                      >
                                        <GridContainer
                                          key={index}
                                          alignItems={"flex-end"}
                                          style={{ clear: "both" }}
                                        >
                                          <GridItem xs={6} sm={6} md={6}>
                                            <CustomInput
                                              inputProps={{
                                                value:
                                                  switch_control[index].name,
                                                onChange: e => {
                                                  switch_control[index].name =
                                                    e.target.value;
                                                  this.setState(switch_control);
                                                }
                                              }}
                                              formControlProps={{
                                                fullWidth: true
                                              }}
                                            />
                                          </GridItem>
                                          <GridItem xs={6} sm={6} md={6}>
                                            <Switch
                                              checked={
                                                switch_control[index].value == 1
                                                  ? true
                                                  : false
                                              }
                                              onChange={e => {
                                                switch_control[index].value =
                                                  e.target.checked == true
                                                    ? 1
                                                    : 0;
                                                this.setState({
                                                  switch_control
                                                });
                                              }}
                                            />
                                          </GridItem>
                                        </GridContainer>
                                      </GridItem>
                                    );
                                  }
                                )}
                              </GridContainer>
                            </div>
                          )}

                        <GridContainer>
                          <GridItem xs={12} sm={6} md={6}>
                            <div style={{ float: "left" }}>
                              <label>Trạng thái</label>
                              <Switch
                                id="swtStatus"
                                defaultChecked={switchCreate}
                                onChange={this.handChangeSwitchCreate.bind(
                                  this
                                )}
                              />
                            </div>
                          </GridItem>
                          <GridItem xs={12} sm={6} md={6}>
                            <CustomInput
                              labelText="Mô tả"
                              id="txtDescription"
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                multiline: true,
                                rows: 2,
                                disabled: disable
                              }}
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
                              <Icon className={classes.rightIcon}>close</Icon>
                            </Button>
                          </GridItem>
                          <GridItem>
                            <Button
                              variant="contained"
                              color="secondary"
                              className={classes.button}
                              onClick={this.handleCreateThing.bind(this)}
                            >
                              Lưu lại
                              <Icon className={classes.rightIcon}>save</Icon>
                            </Button>
                          </GridItem>
                        </GridContainer>
                      </CardBody>
                    </Card>
                  </GridItem>
                </GridContainer>
              )}
              {typeAction == "edit" && (
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <Card>
                      <CardHeader color="rose">
                        <h4 className={classes.cardTitleWhite}>
                          CHỈNH SỬA THÔNG TIN THIẾT BỊ
                        </h4>
                      </CardHeader>
                      <CardBody style={{ overflow: "auto", maxHeight: "70vh" }}>
                        <GridContainer alignItems={"flex-end"}>
                          <GridItem xs={12} sm={6} md={6}>
                            <CustomInput
                              labelText="Tên thiết bị"
                              id="txtName"
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                //defaultValue: "Vd: ContactorForAirCon1",
                                defaultValue: objThingId.name
                              }}
                              ref={input => (this.txtName = input)}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={6} md={6}>
                            <div style={{ float: "left" }}>
                              <label>Trạng thái</label>
                              <Switch
                                id="swtStatus"
                                defaultChecked={switchEdit}
                                onChange={this.handChangeSwitchEdit.bind(this)}
                              />
                            </div>
                          </GridItem>
                          {/* <GridItem xs={12} sm={6} md={6}>
                            <CustomInput
                              labelText="Giá trị"
                              id="txtValue"
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                //defaultValue: "Vd: ContactorForAirCon1",
                                defaultValue: objThingId.value
                              }}
                              ref={input => (this.txtName = input)}
                            />
                          </GridItem> */}
                        </GridContainer>
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
                              ref={input => (this.txtThresholdMax = input)}
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
                              ref={input => (this.txtThresholdMin = input)}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={4} md={4}>
                            <CustomInput
                              labelText="Ngưỡng đặc biệt"
                              id="txtThresholdSpecial"
                              type="number"
                              inputProps={{
                                type: "number",
                                defaultValue: objThingId.threshold_special
                              }}
                              formControlProps={{
                                fullWidth: true
                              }}
                              ref={input => (this.txtThresholdMin = input)}
                            />
                          </GridItem>
                        </GridContainer>
                        <GridContainer alignItems={"flex-end"}>
                          <GridItem xs={12} sm={6} md={6}>
                            <CustomInput
                              labelText="Đơn vị đo"
                              id="txtUnit"
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                //defaultValue: "Vd: ContactorForAirCon1",
                                defaultValue: objThingId.unit
                              }}
                              ref={input => (this.txtName = input)}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={6} md={6}>
                            <CustomInput
                              labelText="Mô tả"
                              id="txtDescription"
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                multiline: true,
                                rows: 3,
                                defaultValue: objThingId.description
                              }}
                            />
                          </GridItem>
                        </GridContainer>
                        {objThingId.switch_control.length > 0 && (
                          <div>
                            <label style={{ float: "left", paddingTop: 20 }}>
                              Các loại thiết bị điều khiển
                            </label>
                            <GridContainer style={{ clear: "both" }}>
                              {objThingId.switch_control.map((c, index) => {
                                return (
                                  <GridItem xs={6} sm={6} md={6} key={index}>
                                    <GridContainer
                                      key={index}
                                      alignItems={"flex-end"}
                                      style={{ clear: "both" }}
                                    >
                                      <GridItem xs={6} sm={6} md={6}>
                                        <CustomInput
                                          inputProps={{
                                            value: switch_control[index].name,
                                            onChange: e => {
                                              switch_control[index].name =
                                                e.target.value;
                                              this.setState(switch_control);
                                            }
                                          }}
                                          formControlProps={{
                                            fullWidth: true
                                          }}
                                        />
                                      </GridItem>
                                      <GridItem xs={6} sm={6} md={6}>
                                        <Switch
                                          checked={
                                            switch_control[index].value == 1
                                              ? true
                                              : false
                                          }
                                          onChange={e => {
                                            switch_control[index].value =
                                              e.target.checked == true ? 1 : 0;
                                            this.setState({
                                              switch_control
                                            });
                                          }}
                                        />
                                      </GridItem>
                                    </GridContainer>
                                  </GridItem>
                                );
                              })}
                            </GridContainer>
                          </div>
                        )}

                        <GridContainer justify={"center"}>
                          <GridItem>
                            <Button
                              variant="contained"
                              color="default"
                              className={classes.button}
                              onClick={this.handleCloseModal.bind(this)}
                            >
                              Đóng
                              <Icon className={classes.rightIcon}>close</Icon>
                            </Button>
                          </GridItem>
                          <GridItem>
                            <Button
                              variant="contained"
                              color="secondary"
                              className={classes.button}
                              onClick={this.handleEditThing.bind(this)}
                            >
                              Lưu lại
                              <Icon className={classes.rightIcon}>save</Icon>
                            </Button>
                          </GridItem>
                        </GridContainer>
                      </CardBody>
                    </Card>
                  </GridItem>
                </GridContainer>
              )}
            </div>
          </Modal>
        </GridContainer>
      </div>
    );
  }
}

Thing.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(thingStyle)(Thing);
