import React from "react";
import PropTypes, { array, number } from "prop-types";
import $ from "jquery";
import SweetAlert from "react-bootstrap-sweetalert";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import Icon from "@material-ui/core/Icon";
import Modal from "@material-ui/core/Modal";
import Switch from "@material-ui/core/Switch";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import NativeSelect from "@material-ui/core/NativeSelect";
// component
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import EnhancedTableHead from "../../components/Table/EnhancedTableHead.jsx";
import EnhancedTableToolbar from "../../components/Table/EnhancedTableToolbar.jsx";
import farmStyle from "./../../assets/jss/common-styles/views/farmStyle.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Card from "components/Card/Card.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import CardAvatar from "components/Card/CardAvatar.jsx";
import Common from "../../utils/Common";
import API from "../../utils/API";
import avatar from "assets/img/faces/icon-farm.jpg";
import "../../assets/js/upload.js";
class Farm extends React.Component {
  state = {
    // variable order , orderBy,selected,data,page,rowsPerPage user for table
    order: "asc",
    orderBy: "name",
    selected: [],
    data: [],
    page: 0,
    rowsPerPage: 5,
    //========================
    //variable for modal, notify,select,button
    isShowModal: false,
    typeAction: "",
    selectedThing: [],
    selectedMember: [],
    switchCreate: false,
    showNotify: false,
    typeNotify: "",
    titleNotify: "",
    switchEdit: false,
    showNotifyDelete: false,
    typeSuccess: false,
    typeWarning: false,
    //variable for farm
    arrDevice: [],

    arrMember: [],
    idFarm: "",
    farmId: {
      _id: "",
      name: "",
      square: "",
      image: "",
      device: [],
      coordinate: { long: "", lat: "" },
      member: [],
      description: ""
    },
    farmIdMaster: {
      _id: "",
      name: "",
      square: "",
      image: "",
      device: [],
      coordinate: { long: "", lat: "" },
      member: [],
      description: ""
    },
    selectedThingEdit: [],
    selectedMemberEdit: [],
    arrDeviceFarm: [],
    arrDeviceConcat: []
  };
  componentWillMount() {}
  componentDidMount() {
    this._getFarm();
    this._getDevice();
    this._getMember();
    this.handleShowEdit(
      false,
      "typeAction",
      JSON.parse(localStorage.getItem("farm"))._id
    );
  }
  //handle for modal, notify
  handleCloseModal() {
    this.setState({ isShowModal: false, showNotify: false });
  }
  handleShowCreate(isShowModal, typeAction) {
    this.setState({ isShowModal: isShowModal, typeAction: typeAction });
  }

  async handleShowEdit(isShowModal, typeAction, _id) {
    // let { arrRole } = this.state;
    let objFarm = {
      method: "POST",
      url: API.getAPI().getFarmId + _id
    };
    this._getDeviceFarm(_id);
    await Common.request(objFarm)
      .then(arr => {
        let { arrDeviceFarm, arrDevice } = this.state;
        let arrDeviceAll = arrDeviceFarm.concat(arrDevice);

        let arrMember = arr.member.map(m => m._id);
        let arrThingFarm = arrDeviceFarm.map(m => m._id);

        this.setState({
          idFarm: _id,
          isShowModal: isShowModal,
          typeAction: typeAction,
          farmId: arr,
          // selectedThingEdit: arrThingFarm,
          selectedMemberEdit: arrMember,
          switchEdit: arr.status,
          selectedThingEdit: arrThingFarm,
          arrDeviceConcat: arrDeviceAll
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleChangeThing(event) {
    this.setState({
      selectedThing: event.target.value,
      selectedThingEdit: event.target.value
    });
  }
  handleChangeMember(event) {
    this.setState({
      selectedMember: event.target.value,
      selectedMemberEdit: event.target.value
    });
  }
  handChangeSwitchCreate() {
    this.setState({ switchCreate: !this.state.switchCreate });
  }
  handChangeSwitchEdit() {
    this.setState({ switchEdit: !this.state.switchEdit });
  }
  //handle for farm
  _getFarm() {
    let objFarm = {
      method: "POST",
      url: API.getAPI().getFarm
    };
    Common.request(objFarm)
      .then(arr => {
        let idFarmCookie = JSON.parse(localStorage.getItem("farm"))._id;
        arr.map(f => {
          if (f._id == idFarmCookie) {
            localStorage.setItem("farm", JSON.stringify(f));
          }
        });
        this.setState({ data: arr });
      })
      .catch(err => {
        console.log(err);
      });
  }
  async _getDevice() {
    let objDevice = {
      method: "POST",
      url: API.getAPI().getDeviceNotFarm
    };
    await Common.request(objDevice)
      .then(arr => {
        this.setState({ arrDevice: arr });
      })
      .catch(err => {
        console.log(err);
      });
  }
  async _getMember() {
    let objMember = {
      method: "POST",
      data: {},
      url:
        API.getAPI().getListUser + JSON.parse(localStorage.getItem("user"))._id
    };
    await Common.request(objMember)
      .then(arr => {
        this.setState({ arrMember: arr });
      })
      .catch(err => {
        console.log(err);
      });
  }
  async _getDeviceFarm(idFarm) {
    let objDeviceFarm = {
      method: "POST",
      data: {},
      url: API.getAPI().getDeviceFarm + idFarm
    };
    await Common.request(objDeviceFarm)
      .then(arr => {
        this.setState({ arrDeviceFarm: arr });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleDelete(_id) {
    this.setState({
      showNotifyDelete: true,
      idFarm: _id
    });
  }
  async handleDeleteFarm() {
    let { idFarm } = this.state;
    let idFarmCookie = JSON.parse(localStorage.getItem("farm"))._id;
    if (idFarmCookie != idFarm) {
      let objFarm = {
        method: "DELETE",
        data: {},
        url: API.getAPI().deteteFarm + idFarm
      };
      await Common.request(objFarm)
        .then(arr => {
          this._getFarm();
          this.setState({
            showNotifyDelete: false,
            showNotify: true,
            typeSuccess: true,
            typeWarning: false,
            titleNotify: "Xóa nông trại thành công"
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
            titleNotify: "Nông trại đang sử dụng nên không thể xóa."
          });
          setTimeout(() => {
            this.setState({
              showNotify: false,
              isShowModal: false
            });
          }, 2000);
        });
    } else {
      this.setState({
        showNotifyDelete: false,
        showNotify: true,
        typeSuccess: false,
        typeWarning: true,
        titleNotify: "Nông trại đang sử dụng nên không thể xóa."
      });
      setTimeout(() => {
        this.setState({
          showNotify: false,
          isShowModal: false
        });
      }, 2000);
    }
  }
  handleCancel() {
    this.setState({
      showNotifyDelete: false
    });
  }
  async handleCreateFarm() {
    let { selectedThing, selectedMember } = this.state;
    let name = $("#txtName").val();
    let lat = $("#txLat").val();
    let long = $("#txtLong").val();
    let status = this.state.switchCreate;
    let image = $("#imageAvatar").attr("data-src");
    let deviceId = selectedThing;
    let memberId = selectedMember;
    let description = $("#txtDescription").val();
    let square = $("#txtSquare").val();
    let objFarm = {
      method: "POST",
      data: {
        name: name,
        square: square,
        device: deviceId,
        image: image,
        coordinate: { long: long, lat: lat },
        member: memberId,
        description: description,
        status: status
      },
      url: API.getAPI().addFarm
    };

    await Common.request(objFarm)
      .then(arr => {
        this._getFarm();
        this.setState({
          showNotify: true,
          typeSuccess: true,
          typeWarning: false,
          titleNotify: "Thêm nông trại thành công"
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
          typeSuccess: false,
          typeWarning: true,
          titleNotify: "Thêm nông trại thất bại. Vui lòng thử lại."
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
  async handleEditFarm() {
    let { selectedThingEdit, selectedMemberEdit, idFarm, data } = this.state;
    console.log("selectedMemberEdit");
    console.log(selectedMemberEdit);
    let name = $("#txtName").val();
    let lat = $("#txLat").val();
    let long = $("#txtLong").val();
    let status = this.state.switchEdit;
    let image = $("#imageAvatar").attr("data-src");
    let deviceId = selectedThingEdit;
    let memberId = selectedMemberEdit;
    console.log("memberId")
    console.log(memberId)
    let description = $("#txtDescription").val();
    let square = $("#txtSquare").val();
    let objFarm = {
      method: "PUT",
      data: {
        _id: JSON.parse(localStorage.getItem("user"))._id,
        name: name,
        square: square,
        device: deviceId,
        image: image,
        coordinate: { long: long, lat: lat },
        member: memberId,
        description: description,
        status: status
      },
      url: API.getAPI().editFarm + idFarm
    };

    await Common.request(objFarm)
      .then(arr => {
        this._getFarm();
        // localStorage.setItem("farm",data);

        this.setState({
          showNotify: true,
          typeSuccess: true,
          typeWarning: false,
          titleNotify: "Cập nhật thông tin thành công",
          switchEdit: arr.status
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
          typeSuccess: false,
          typeWarning: true,
          titleNotify: "Cập nhật thông tin thất bại. Vui lòng thử lại."
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
  //Upload image
  imageChange(ev) {
    $("#inputFile").trigger("click");
  }
  uploadFile(evt) {
    let file = $("#inputFile").prop("files");
    let date = new Date();
    let files = [];
    let fileOutName = [];
    let fileName = [];
    let folder = JSON.parse(localStorage.getItem("user")).folder + "/";
    let extension = file[0].name.split(".").pop();
    let name = `farm_${date.getTime()}.${extension}`;
    files.push(file[0]);
    // fileOutName.push(Common.UPLOAD_FOLDER + folder + name);
    fileOutName.push(Common.UPLOAD_FOLDER + folder + name);
    fileName.push(name);
    let obj = {
      ip: Common.UPLOAD_IP,
      fileOut: fileOutName,
      files: files,
      port: Common.UPLOAD_PORT,
      progress: function(evt) {},
      success: response => {
        let image = API.getAPI().PATH_IMAGE + folder + name;
        $("#imageAvatar").attr("src", image);
        $("#imageAvatar").attr("data-src", name);
      },
      error: function() {}
    };
    $(this.inputFile).Upload(obj);
  }
  // handle for table
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };
  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({
        selected: state.data.map((n, index) => index + 1)
      }));
      return;
    }
    this.setState({ selected: [] });
  };
  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };
  handleChangePage = (event, page) => {
    this.setState({ page });
  };
  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  }
  getSorting(order, orderBy) {
    return order === "desc"
      ? (a, b) => this.desc(a, b, orderBy)
      : (a, b) => -this.desc(a, b, orderBy);
  }
  isSelected = id => this.state.selected.indexOf(id) !== -1;
  //=============================RENDER=================================
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
      //state for table
      data,
      order,
      orderBy,
      selected,
      rowsPerPage,
      page,
      //state for modal and notify
      typeAction,
      isShowModal,
      selectedThing,
      selectedMember,
      switchCreate,
      showNotifyDelete,
      //state for farm
      arrDevice,
      arrMember,
      showNotify,
      typeNotify,
      titleNotify,
      farmId,
      switchEdit,
      selectedMemberEdit,
      selectedThingEdit,
      arrDeviceFarm,
      arrDeviceConcat,
      typeSuccess,
      typeWarning
    } = this.state;
    console.log("selectedThingEdit");
    console.log(selectedThingEdit);
    //Title table for farm
    let folder = JSON.parse(localStorage.getItem("user")).folder + "/";
    const rows = [
      { id: "name", numeric: false, disablePadding: false, label: "Tên Farm" },
      {
        id: "member",
        numeric: false,
        disablePadding: false,
        label: "Thành viên"
      },
      {
        id: "status",
        numeric: false,
        disablePadding: false,
        label: "Trạng thái"
      },
      // {
      //   id: "device",
      //   numeric: false,
      //   disablePadding: false,
      //   label: "Thiết bị"
      // },

      {
        id: "coordinate",
        numeric: false,
        disablePadding: false,
        label: "Tọa độ "
      },
      {
        id: "square",
        numeric: false,
        disablePadding: false,
        label: "Diện tích"
      },
      { id: "action", numeric: false, disablePadding: false, label: "Thao tác" }
    ];
    const _role = JSON.parse(localStorage.getItem("user")).role;
    let arrRole = Common.verify("VIEW", _role);
    let isRoleRoot = arrRole.filter(c => c.role == "ROOT");
    let isMaster = arrRole.filter(c => c.role == "MASTER");
    let isEditor = arrRole.filter(c => c.role == "EDITOR");

    return (
      <div>
        {isRoleRoot.length > 0 && isRoleRoot[0].method == true ? (
          <GridContainer>
            <GridItem style={{ width: "100%" }}>
              <Card>
                <CardHeader
                  className={classes.customHeader}
                  color="rose"
                  stats
                  icon
                >
                  <CardIcon color="rose">
                    <Icon>local_florist</Icon>
                  </CardIcon>
                  <EnhancedTableToolbar
                    numSelected={selected.length}
                    handleShowCreate={this.handleShowCreate.bind(this)}
                  />
                </CardHeader>
                <CardBody className={classes.customCardBody}>
                  <Paper className={classes.root}>
                    <div className={classes.tableWrapper}>
                      <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                      >
                        <EnhancedTableHead
                          numSelected={selected.length}
                          order={order}
                          orderBy={orderBy}
                          onSelectAllClick={this.handleSelectAllClick}
                          onRequestSort={this.handleRequestSort}
                          rowCount={data.length}
                          rows={rows}
                        />
                        <TableBody>
                          {this.stableSort(
                            data,
                            this.getSorting(order, orderBy)
                          )
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((n, index) => {
                              const isSelected = this.isSelected(index + 1);
                              return (
                                <TableRow hover key={index + 1} id={n}>
                                  {/* <TableCell
                                    padding="checkbox"
                                    style={{ width: "10%" }}
                                  >
                                    <Checkbox
                                      checked={isSelected}
                                      onClick={event =>
                                        this.handleClick(event, index + 1)
                                      }
                                      role="checkbox"
                                      aria-checked={isSelected}
                                      tabIndex={-1}
                                      selected={isSelected}
                                    />
                                  </TableCell> */}
                                  <TableCell style={{ textAlign: "center" }}>
                                    {n.name}
                                  </TableCell>
                                  <TableCell>
                                    {n.member.length > 0 && (
                                      <FormControl
                                        className={classes.formControl}
                                      >
                                        <NativeSelect
                                          className={classes.customNativeSelect}
                                        >
                                          <option value="" disabled>
                                            Các thành viên
                                          </option>
                                          {n.member.length > 0 &&
                                            n.member.map((m, indexMember) => {
                                              return (
                                                <option key={indexMember}>
                                                  {m.name}
                                                </option>
                                              );
                                            })}
                                        </NativeSelect>
                                      </FormControl>
                                    )}

                                    {n.member.length <= 0 && (
                                      <option>Không có thành viên</option>
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    <Switch defaultChecked={n.status} />
                                  </TableCell>
                                  {/* <TableCell
                                    style={{
                                      padding: "4px 9px 4px 9px",
                                      width: "10%"
                                    }}
                                  >
                                    {
                                      <ol style={{ padding: "0", margin: 0 }}>
                                        {
                                           
                                          arrDeviceFarm.map((t, indexDevice) => {
                                          return (
                                            <li key={indexDevice}>{toString.name}</li>
                                          );
                                        })}
                                      </ol>
                                    }
                                  </TableCell> */}
                                  <TableCell
                                    style={{ padding: " 4px 11px 4px 24px" }}
                                  >{`${n.coordinate.long}_${
                                    n.coordinate.lat
                                  }`}</TableCell>
                                  <TableCell>{n.square}</TableCell>
                                  <TableCell>
                                    <Button
                                      variant="fab"
                                      color="secondary"
                                      aria-label="Edit"
                                      className={classes.btnEdit}
                                      onClick={() => {
                                        this.handleShowEdit(
                                          true,
                                          "edit",
                                          n._id
                                        );
                                      }}
                                    >
                                      <Icon>edit_icon</Icon>
                                    </Button>
                                    <Button
                                      style={{ marginLeft: 10 }}
                                      variant="fab"
                                      color="secondary"
                                      aria-label="Delete"
                                      className={classes.btnEdit}
                                      onClick={() => {
                                        this.handleDelete(n._id);
                                      }}
                                    >
                                      <Icon>delete_icon</Icon>
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      </Table>
                    </div>
                    <TablePagination
                      component="div"
                      count={data.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      backIconButtonProps={{
                        "aria-label": "Previous Page"
                      }}
                      nextIconButtonProps={{
                        "aria-label": "Next Page"
                      }}
                      onChangePage={this.handleChangePage.bind(this)}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage.bind(
                        this
                      )}
                    />
                  </Paper>
                </CardBody>
              </Card>
            </GridItem>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={isShowModal}
            >
              <div className={classes.modalFarm}>
                {typeAction == "create" && (
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Card>
                        <CardHeader color="rose">
                          <h4 className={classes.cardTitleWhite}>
                            TẠO NÔNG TRẠI MỚI
                          </h4>
                        </CardHeader>
                        <CardBody>
                          <GridContainer alignItems={"flex-end"}>
                            <GridItem xs={12} sm={6} md={6}>
                              <CustomInput
                                labelText="Tên nông trại"
                                id="txtName"
                                formControlProps={{
                                  fullWidth: true
                                }}
                                ref={input => (this.txName = input)}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={6} md={6}>
                              <FormControl className={classes.formControl}>
                                <InputLabel
                                  className={classes.customInputLable}
                                >
                                  Chọn thiết bị
                                </InputLabel>
                                <Select
                                  multiple
                                  value={selectedThing}
                                  onChange={this.handleChangeThing.bind(this)}
                                  input={
                                    <Input
                                      id="select-multiple-device"
                                      className={classes.customInput}
                                    />
                                  }
                                  renderValue={selected => {
                                    let arr = [];
                                    selected.map(c => {
                                      arrDevice.map(m => {
                                        if (c == m._id) {
                                          arr.push(m.name);
                                        }
                                      });
                                    });
                                    return arr.join(", ");
                                  }}
                                  MenuProps={MenuProps}
                                >
                                  {arrDevice.map((device, index) => (
                                    <MenuItem key={index} value={device._id}>
                                      <Checkbox
                                        checked={
                                          selectedThing.indexOf(device._id) > -1
                                        }
                                      />
                                      <ListItemText primary={device.name} />
                                    </MenuItem>
                                  ))}
                                  {arrDevice.length <= 0 && (
                                    <MenuItem>
                                      <ListItemText
                                        primary={"Thiết bị đã sử dụng hết"}
                                      />
                                    </MenuItem>
                                  )}
                                </Select>
                              </FormControl>
                            </GridItem>
                          </GridContainer>
                          <GridContainer alignItems={"flex-end"}>
                            <GridItem xs={12} sm={6} md={6}>
                              <CustomInput
                                labelText="Kinh độ"
                                id="txtLong"
                                type="number"
                                inputProps={{
                                  type: "number"
                                }}
                                formControlProps={{
                                  fullWidth: true
                                }}
                                ref={input => (this.txtLong = input)}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={6} md={6}>
                              <FormControl className={classes.formControl}>
                                <InputLabel
                                  className={classes.customInputLable}
                                >
                                  Chọn thành viên
                                </InputLabel>
                                <Select
                                  multiple
                                  value={selectedMember}
                                  onChange={this.handleChangeMember.bind(this)}
                                  input={
                                    <Input
                                      id="select-multiple-user"
                                      className={classes.customInput}
                                    />
                                  }
                                  renderValue={selected => {
                                    let arr = [];
                                    selected.map(c => {
                                      arrMember.map(m => {
                                        if (c == m._id) {
                                          arr.push(m.name);
                                        }
                                      });
                                    });
                                    return arr.join(", ");
                                  }}
                                  MenuProps={MenuProps}
                                >
                                  {arrMember.map((member, index) => (
                                    <MenuItem key={index} value={member._id}>
                                      <Checkbox
                                        checked={
                                          selectedMember.indexOf(member._id) >
                                          -1
                                        }
                                      />
                                      <ListItemText primary={member.name} />
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </GridItem>
                          </GridContainer>
                          <GridContainer alignItems={"flex-end"}>
                            <GridItem xs={12} sm={6} md={6}>
                              <CustomInput
                                labelText="Vĩ độ"
                                id="txLat"
                                type="number"
                                inputProps={{
                                  type: "number"
                                }}
                                formControlProps={{
                                  fullWidth: true
                                }}
                                ref={input => (this.txtLat = input)}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={6} md={6}>
                              <CustomInput
                                labelText="Diện tích"
                                id="txtSquare"
                                type="number"
                                inputProps={{
                                  type: "number"
                                }}
                                formControlProps={{
                                  fullWidth: true
                                }}
                                ref={input => (this.txtSquare = input)}
                              />
                            </GridItem>
                          </GridContainer>
                          <GridContainer>
                            <GridItem xs={12} sm={6} md={6}>
                              <CustomInput
                                labelText="Mô tả"
                                id="txtDescription"
                                formControlProps={{
                                  fullWidth: true
                                }}
                                inputProps={{
                                  multiline: true,
                                  rows: 5
                                }}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={6} md={6}>
                              <CardAvatar className={classes.customCardAvatar}>
                                <input
                                  type="file"
                                  style={{ display: "none" }}
                                  onChange={this.uploadFile.bind(this)}
                                  ref={input => {
                                    this.inputFile = input;
                                  }}
                                  id="inputFile"
                                />
                                <img
                                  src={avatar}
                                  alt="..."
                                  className={classes.customImageAvatar}
                                  id="imageAvatar"
                                  onClick={this.imageChange.bind(this)}
                                />
                              </CardAvatar>
                            </GridItem>
                          </GridContainer>
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
                                onClick={this.handleCreateFarm.bind(this)}
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
                            CHỈNH SỬA THÔNG TIN NÔNG TRẠI
                          </h4>
                        </CardHeader>
                        <CardBody>
                          <GridContainer alignItems={"flex-end"}>
                            <GridItem xs={12} sm={6} md={6}>
                              <CustomInput
                                labelText="Tên nông trại"
                                id="txtName"
                                formControlProps={{
                                  fullWidth: true
                                }}
                                inputProps={{
                                  defaultValue: farmId.name
                                }}
                                ref={input => (this.txName = input)}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={6} md={6}>
                              <FormControl className={classes.formControl}>
                                <InputLabel
                                  className={classes.customInputLable}
                                >
                                  Chọn thiết bị
                                </InputLabel>
                                <Select
                                  multiple
                                  value={selectedThingEdit}
                                  onChange={this.handleChangeThing.bind(this)}
                                  input={
                                    <Input
                                      id="select-multiple-device"
                                      className={classes.customInput}
                                    />
                                  }
                                  renderValue={selected => {
                                    let arr = [];
                                    selected.map(c => {
                                      arrDeviceConcat.map(m => {
                                        if (c == m._id) {
                                          arr.push(m.name);
                                        }
                                      });
                                    });
                                    return arr.join(", ");
                                  }}
                                  MenuProps={MenuProps}
                                >
                                  {arrDeviceConcat.map((device, index) => (
                                    <MenuItem key={index} value={device._id}>
                                      <Checkbox
                                        checked={
                                          selectedThingEdit.indexOf(
                                            device._id
                                          ) > -1
                                        }
                                      />
                                      <ListItemText primary={device.name} />
                                    </MenuItem>
                                  ))}
                                  {arrDeviceConcat.length <= 0 && (
                                    <MenuItem>
                                      <ListItemText
                                        primary={"Thiết bị đã sử dụng hết"}
                                      />
                                    </MenuItem>
                                  )}
                                </Select>
                              </FormControl>
                            </GridItem>
                          </GridContainer>
                          <GridContainer alignItems={"flex-end"}>
                            <GridItem xs={12} sm={6} md={6}>
                              <CustomInput
                                labelText="Kinh độ"
                                id="txtLong"
                                type="number"
                                inputProps={{
                                  type: "number",
                                  defaultValue: farmId.coordinate.long
                                }}
                                formControlProps={{
                                  fullWidth: true
                                }}
                                ref={input => (this.txtLong = input)}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={6} md={6}>
                              <FormControl className={classes.formControl}>
                                <InputLabel
                                  className={classes.customInputLable}
                                >
                                  Chọn thành viên
                                </InputLabel>
                                <Select
                                  multiple
                                  value={selectedMemberEdit}
                                  onChange={this.handleChangeMember.bind(this)}
                                  input={
                                    <Input
                                      id="select-multiple-user"
                                      className={classes.customInput}
                                    />
                                  }
                                  renderValue={selected => {
                                    let arr = [];
                                    selected.map(c => {
                                      arrMember.map(m => {
                                        if (c == m._id) {
                                          arr.push(m.name);
                                        }
                                      });
                                    });
                                    return arr.join(", ");
                                  }}
                                  MenuProps={MenuProps}
                                >
                                  {arrMember.map((member, index) => (
                                    <MenuItem key={index} value={member._id}>
                                      <Checkbox
                                        checked={
                                          selectedMemberEdit.indexOf(
                                            member._id
                                          ) > -1
                                        }
                                      />
                                      <ListItemText primary={member.name} />
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </GridItem>
                          </GridContainer>
                          <GridContainer alignItems={"flex-end"}>
                            <GridItem xs={12} sm={6} md={6}>
                              <CustomInput
                                labelText="Vĩ độ"
                                id="txLat"
                                type="number"
                                inputProps={{
                                  type: "number",
                                  defaultValue: farmId.coordinate.lat
                                }}
                                formControlProps={{
                                  fullWidth: true
                                }}
                                ref={input => (this.txtLat = input)}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={6} md={6}>
                              <CustomInput
                                labelText="Diện tích"
                                id="txtSquare"
                                type="number"
                                inputProps={{
                                  type: "number",
                                  defaultValue: farmId.square
                                }}
                                formControlProps={{
                                  fullWidth: true
                                }}
                                ref={input => (this.txtSquare = input)}
                              />
                            </GridItem>
                          </GridContainer>
                          <GridContainer>
                            <GridItem xs={12} sm={6} md={6}>
                              <CustomInput
                                labelText="Mô tả"
                                id="txtDescription"
                                formControlProps={{
                                  fullWidth: true
                                }}
                                inputProps={{
                                  multiline: true,
                                  rows: 5,
                                  defaultValue: farmId.description
                                }}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={6} md={6}>
                              <CardAvatar className={classes.customCardAvatar}>
                                <input
                                  type="file"
                                  style={{ display: "none" }}
                                  onChange={this.uploadFile.bind(this)}
                                  ref={input => {
                                    this.inputFile = input;
                                  }}
                                  id="inputFile"
                                />
                                <img
                                  src={
                                    farmId.image != undefined ||
                                    farmId.image != null
                                      ? API.getAPI().PATH_IMAGE +
                                        folder +
                                        farmId.image
                                      : avatar
                                  }
                                  alt="..."
                                  className={classes.customImageAvatar}
                                  id="imageAvatar"
                                  onClick={this.imageChange.bind(this)}
                                />
                              </CardAvatar>
                            </GridItem>
                          </GridContainer>
                          <GridContainer>
                            <GridItem xs={12} sm={6} md={6}>
                              <div style={{ float: "left" }}>
                                <label>Trạng thái</label>
                                <Switch
                                  id="swtStatus"
                                  defaultChecked={switchEdit}
                                  onChange={this.handChangeSwitchEdit.bind(
                                    this
                                  )}
                                />
                              </div>
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
                                onClick={this.handleEditFarm.bind(this)}
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
        ) : (
          <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
              <Card>
                <CardHeader color="rose">
                  <h4 className={classes.cardTitleWhite}>
                    CHỈNH SỬA THÔNG TIN NÔNG TRẠI
                  </h4>
                </CardHeader>
                <CardBody>
                  <GridContainer alignItems={"flex-end"}>
                    <GridItem xs={12} sm={6} md={6}>
                      <CustomInput
                        labelText="Tên nông trại"
                        id="txtName"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value: farmId.name,
                          onChange: e => {
                            farmId.name = e.currentTarget.value;
                            this.setState({ farmId });
                          }
                        }}
                        ref={input => (this.txName = input)}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={6} md={6}>
                      <FormControl className={classes.formControl}>
                        <InputLabel className={classes.customInputLable}>
                          Chọn thiết bị
                        </InputLabel>
                        <Select
                          multiple
                          value={arrDeviceFarm.map(c => c._id)}
                          onChange={e => {
                            e.preventDefault();
                          }}
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
                                checked={
                                  arrDeviceFarm
                                    .map(c => c._id)
                                    .indexOf(device._id) > -1
                                }
                              />
                              <ListItemText primary={device.name} />
                            </MenuItem>
                          ))}
                          {arrDeviceFarm.length <= 0 && (
                            <MenuItem>
                              <ListItemText
                                primary={"Thiết bị đã sử dụng hết"}
                              />
                            </MenuItem>
                          )}
                        </Select>
                      </FormControl>
                    </GridItem>
                  </GridContainer>
                  <GridContainer alignItems={"flex-end"}>
                    <GridItem xs={12} sm={6} md={6}>
                      <CustomInput
                        labelText="Kinh độ"
                        id="txtLong"
                        type="number"
                        inputProps={{
                          type: "number",
                          value: farmId.coordinate.long,
                          onChange: e => {
                            farmId.coordinate.long = e.currentTarget.value;
                            this.setState({ farmId });
                          }
                        }}
                        formControlProps={{
                          fullWidth: true
                        }}
                        ref={input => (this.txtLong = input)}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={6} md={6}>
                      <FormControl className={classes.formControl}>
                        <InputLabel className={classes.customInputLable}>
                          Chọn thành viên
                        </InputLabel>
                        <Select
                          multiple
                          value={selectedMemberEdit}
                          onChange={this.handleChangeMember.bind(this)}
                          input={
                            <Input
                              id="select-multiple-user"
                              className={classes.customInput}
                            />
                          }
                          renderValue={selected => {
                            let arr = [];
                            selected.map(c => {
                              arrMember.map(m => {
                                if (c == m._id) {
                                  arr.push(m.name);
                                }
                              });
                            });
                            return arr.join(", ");
                          }}
                          MenuProps={MenuProps}
                        >
                          {arrMember.map((member, index) => (
                            <MenuItem key={index} value={member._id}>
                              <Checkbox
                                checked={
                                  selectedMemberEdit.indexOf(member._id) > -1
                                }
                              />
                              <ListItemText primary={member.name} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </GridItem>
                  </GridContainer>
                  <GridContainer alignItems={"flex-end"}>
                    <GridItem xs={12} sm={6} md={6}>
                      <CustomInput
                        labelText="Vĩ độ"
                        id="txLat"
                        type="number"
                        inputProps={{
                          type: "number",
                          value: farmId.coordinate.lat,
                          onChange: e => {
                            farmId.coordinate.lat = e.currentTarget.value;
                            this.setState({ farmId });
                          }
                        }}
                        formControlProps={{
                          fullWidth: true
                        }}
                        ref={input => (this.txtLat = input)}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={6} md={6}>
                      <CustomInput
                        labelText="Diện tích"
                        id="txtSquare"
                        type="number"
                        inputProps={{
                          type: "number",
                          value: farmId.square,
                          onChange: e => {
                            farmId.square = e.currentTarget.value;
                            this.setState({ farmId });
                          }
                        }}
                        formControlProps={{
                          fullWidth: true
                        }}
                        ref={input => (this.txtSquare = input)}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={6} md={6}>
                      <CustomInput
                        labelText="Mô tả"
                        id="txtDescription"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          multiline: true,
                          rows: 5,
                          value: farmId.description,
                          onChange: e => {
                            farmId.description = e.currentTarget.value;
                            this.setState({ farmId });
                          }
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={6} md={6}>
                      <CardAvatar className={classes.customCardAvatar}>
                        <input
                          type="file"
                          style={{ display: "none" }}
                          onChange={this.uploadFile.bind(this)}
                          ref={input => {
                            this.inputFile = input;
                          }}
                          id="inputFile"
                        />
                        <img
                          src={
                            farmId.image != undefined || farmId.image != null
                              ? API.getAPI().PATH_IMAGE + folder + farmId.image
                              : avatar
                          }
                          alt="..."
                          className={classes.customImageAvatar}
                          id="imageAvatar"
                          onClick={this.imageChange.bind(this)}
                        />
                      </CardAvatar>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
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
                  </GridContainer>
                  <GridContainer justify={"center"}>
                    {/* <GridItem>
                  <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    onClick={this.handleCloseModal.bind(this)}
                  >
                    Đóng
                    <Icon className={classes.rightIcon}>close</Icon>
                  </Button>
                </GridItem> */}
                    <GridItem>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={this.handleEditFarm.bind(this)}
                      >
                        Lưu lại
                        <Icon className={classes.rightIcon}>save</Icon>
                      </Button>
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card profile>
                <CardAvatar profile>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={this.uploadFile.bind(this)}
                    ref={input => {
                      this.inputFile = input;
                    }}
                    id="inputFile"
                  />
                  <img
                    src={
                      farmId.image != undefined || farmId.image != null
                        ? API.getAPI().PATH_IMAGE + folder + farmId.image
                        : avatar
                    }
                    data-src={farmId.image}
                    alt="..."
                    className={classes.customImageAvatar}
                    id="imageAvatar"
                    onClick={this.imageChange.bind(this)}
                    style={{ objectFit: "cover" }}
                  />
                </CardAvatar>
                <CardBody profile>
                  <h4 className={classes.cardCategory}>
                    <strong>{farmId.name}</strong>
                  </h4>
                  <p className={classes.description}>{farmId.description}</p>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        )}
        {/* Notify create / edit */}

        <SweetAlert
          timer={2000}
          customClass={classes.sweet}
          show={showNotify}
          success={typeSuccess}
          warning={typeWarning}
          title={titleNotify}
          onConfirm={() => {
            this.handleCloseModal();
          }}
        />

        {/* notify delete */}
        <SweetAlert
          timer={2000}
          customClass={classes.sweet}
          show={showNotifyDelete}
          warning
          showCancel
          confirmBtnText="Xóa ngay"
          confirmBtnBsStyle="danger"
          cancelBtnBsStyle="default"
          title="Bạn có chắc chắn muốn xóa nông trại"
          onConfirm={() => {
            this.handleDeleteFarm();
          }}
          onCancel={() => {
            this.handleCancel();
          }}
        />
      </div>
    );
  }
}

Farm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(farmStyle)(Farm);
