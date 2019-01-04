import React from "react";
import PropTypes, { string } from "prop-types";
import $ from "jquery";
import SweetAlert from "react-bootstrap-sweetalert";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "@material-ui/core/Modal";
import CustomInputPassword from "components/CustomInput/CustomInputPassword.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import avatar from "assets/img/faces/icon-user.jpg";
import EnhancedTableHead from "../../components/Table/EnhancedTableHead.jsx";
import EnhancedTableToolbar from "../../components/Table/EnhancedTableToolbar.jsx";
import accountStyle from "assets/jss/common-styles/views/accountStyle.jsx";
import "../../assets/js/upload.js";
// api
import Common from "../../utils/Common";
import API from "../../utils/API";

class Account extends React.Component {
  state = {
    // variable for table
    order: "asc",
    orderBy: "name",
    selected: [],
    data: [],
    page: 0,
    rowsPerPage: 5,
    //==========================
    // variable for modal and notify and state switch and button
    isShowModal: false,
    typeAction: "",
    switchCreate: false,
    switchEdit: false,
    showNotify: false,
    typeNotify: "",
    titleNotify: "",
    typeAler: "",
    userId: {}, // object user edit
    idUser: "", //id user when choose edit
    checkMaster: false,
    // vatiable for account
    selectRole: [],
    selectRoleEdit: [],
    arrFarm: [],
    arrRole: [],
    typeSuccess: false,
    typeWarning: false,
    showNotifyDelete: false
  };
  componentDidMount() {
    this._getListUser();
    this._getFarm();
    this._getRole();
  }
  //handle modal, notify and switch, button, select
  handleCloseModal() {
    this.setState({ isShowModal: false, showNotify: false });
  }
  handleCancel() {
    this.setState({
      showNotifyDelete: false
    });
  }
  handleDelete(_id) {
    this.setState({
      showNotifyDelete: true,
      idUser: _id
    });
    setTimeout(() => {
      this.setState({
        showNotify: false,
        isShowModal: false
      });
    }, 2000);
  }
  async handleDeleteUser() {
    let { idUser } = this.state;
    let idUserCookie = JSON.parse(localStorage.getItem("user"))._id;
    if (idUserCookie != idUser) {
      let objUser = {
        method: "DELETE",
        data: {},
        url: API.getAPI().deleteUser + idUser
      };
      await Common.request(objUser)
        .then(arr => {
          this._getListUser();
          this.setState({
            showNotifyDelete: false,
            showNotify: true,
            typeSuccess: true,
            typeWarning: false,
            titleNotify: "Xóa thành viên thành công"
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
            titleNotify: "Xóa thành viên bị lỗi."
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
        titleNotify: "Thành viên đang đăng nhập nên không thể xóa."
      });
      setTimeout(() => {
        this.setState({
          showNotify: false,
          isShowModal: false
        });
      }, 2000);
    }
  }
  handleShowCreate(isShowModal, typeAction) {
    this.setState({ isShowModal: isShowModal, typeAction: typeAction });
  }
  async handleShowEdit(isShowModal, typeAction, _id) {
    let { arrRole } = this.state;
    let objUser = {
      method: "POST",
      url: API.getAPI().getUserId + _id
    };
    await Common.request(objUser)
      .then(arr => {
        let role_id = [];
        let status = false;
        if (arr.status == 1) {
          status = true;
        } else {
          status = false;
        }
        arrRole.map((c, index) => {
          arr.role.map((r, index) => {
            if (c._id == r) {
              role_id.push(c.code);
            }
          });
        });

        this.setState({
          idUser: _id,
          isShowModal: isShowModal,
          typeAction: typeAction,
          userId: arr,
          selectRoleEdit: role_id,
          switchEdit: status
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleChangeRole(event) {
    this.setState({
      selectRole: event.target.value,
      selectRoleEdit: event.target.value
    });
  }
  hideAlert() {}
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
  //handle for Account
  _getRole() {
    let objRole = {
      method: "POST",
      url: API.getAPI().getRole + JSON.parse(localStorage.getItem("user"))._id
    };
    Common.request(objRole)
      .then(arr => {
        let role = [];
        arr.map(r => {
          if (r.code != "ROOT") {
            role.push(r);
          }
        });
        this.setState({ arrRole: role });
      })
      .catch(err => {
        console.log(err);
      });
  }
  _getFarm() {
    let objFarm = {
      method: "POST",
      url: API.getAPI().getFarm
    };
    Common.request(objFarm)
      .then(arr => {
        arr.forEach(f => {
          if (f._id == JSON.parse(localStorage.getItem("farm"))._id) {
            localStorage.setItem("farm", JSON.stringify(f));
            this._getListUser();
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  async handleCreateAccount() {
    let { arrRole, selectRole } = this.state;
    let _id = JSON.parse(localStorage.getItem("user"))._id;
    let farm_id = JSON.parse(localStorage.getItem("farm"))._id;
    let name = $("#txtName").val();
    let email = $("#txtEmail").val();
    if (email == "") {
      this.setState({
        showNotify: true,
        typeSuccess: false,
        typeWarning: true,
        titleNotify: "Vui lòng nhập email"
      });
      return;
    }
    let password = $("#txtPassword").val();
    let status = this.state.switchCreate;
    let iStatus = 0;
    let image = $("#imageAvatar").attr("data-src");
    let checkMaster = $("#checkMaster").prop("checked");
    
    if (checkMaster == undefined || checkMaster == "") {
      checkMaster = false;
    }
   
    let roleid = [];
    arrRole.map(c => {
      selectRole.map(s => {
        if (s == c.code) {
          roleid.push(c._id);
        }
      });
    });
    if (status == true) iStatus = 1;
    let address = $("#txtAddress").val();
   
   if (checkMaster == true) {
      roleid.push("5c00e166aecd9d36b9b6ac9b");
    } 
    let objAccount = {
      method: "POST",
      data: {
        _id: _id,
        email: email,
        farm_id: farm_id,
        name: name,
        password: password,
        status: iStatus,
        role_id: roleid,
        address: address,
        avatar: image,
        is_parent: checkMaster
      },
      url: API.getAPI().addUser
    };

    await Common.request(objAccount)
      .then(arr => {
        this._getFarm();

        this.setState({
          showNotify: true,
          typeSuccess: true,
          typeWarning: false,
          titleNotify: "Thêm thành viên thành công"
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
          titleNotify: "Thêm thành viên thất bại. Vui lòng thử lại."
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

  async handleEditAccount() {
    let { arrRole, selectRoleEdit, idUser } = this.state;
    let name = $("#txtName").val();
    let email = $("#txtEmail").val();
    let password = $("#txtPassword").val();
    let status = this.state.switchEdit;
    let iStatus = 0;
    let image = $("#imageAvatar").attr("data-src");
    // let checkMaster = $("#checkMaster1").prop("checked");

    // if (checkMaster == undefined || checkMaster == "") {
    //   checkMaster = false;
    // }
 
    let checkMaster=false; 
    let roleid = [];
    arrRole.map(c => {
      selectRoleEdit.map(s => {
        if (s == c.code) {
          if(s=="MASTER")
          {
            checkMaster==true
          }
          roleid.push(c._id);
        }
      });
    });
    // if (checkMaster == true) {
    //   roleid.push("5c00e166aecd9d36b9b6ac9b");
    // }
    // else
    // {
    //   if(roleid.filter(c=>c=="5c00e166aecd9d36b9b6ac9b").length>0){
    //     roleid.pop()
    //   }
     
    // }
    if (status == true) iStatus = 1;
    let address = $("#txtAddress").val();
    let objAccount = {
      method: "PUT",
      data: {
        email: email,
        name: name,
        password: password,
        status: iStatus,
        role_id: roleid,
        address: address,
        avatar: image,
        is_parent:checkMaster
      },
      url: API.getAPI().editUser + idUser
    };

    await Common.request(objAccount)
      .then(arr => {
        this._getFarm();

        this.setState({
          showNotify: true,
          typeSuccess: true,
          typeWarning: false,
          titleNotify: "Cập nhật thông tin thành công"
        });
        setTimeout(() => {
          this.setState({
            showNotify: false,
            isShowModal: false
          });
        }, 2000);
      })
      .catch(err => {
        alert(showNotify);
        this.setState({
          showNotify: true,
          typeSuccess: false,
          typeWarning: true,
          titleNotify: "Cập nhật thông tin thất bại. Vui lòng thử lại."
        });
        console.log(err);
      });
    setTimeout(() => {
      this.setState({
        showNotify: false,
        isShowModal: false
      });
    }, 2000);
  }
  _getListUser() {
    let objAccount = {
      method: "POST",
      url:
        API.getAPI().getListUser + JSON.parse(localStorage.getItem("user"))._id
    };

    Common.request(objAccount)
      .then(arr => {
        // let listUserByFarm = [];
        // let arrMember = JSON.parse(localStorage.getItem("farm")).member;

        // arrMember.map((f, index) => {
        //   arr.map((n, index) => {
        //     if (f._id == n._id) {
        //       listUserByFarm.push(n);
        //     }
        //   });
        // });
        this.setState({ data: arr });
      })
      .catch(err => {
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
    let name = `account_${date.getTime()}.${extension}`;
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
  handChangeSwitchCreate() {
    this.setState({ switchCreate: !this.state.switchCreate });
  }
  handChangeSwitchEdit() {
    this.setState({ switchEdit: !this.state.switchEdit });
  }
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

  render() {
    let folder = JSON.parse(localStorage.getItem("user")).folder + "/";
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
    console.log(this.state.selectRole);
    const rows = [
      {
        id: "name",
        numeric: false,
        disablePadding: false,
        label: "Họ và tên "
      },
      { id: "email", numeric: false, disablePadding: false, label: "Email" },
      {
        id: "role",
        numeric: false,
        disablePadding: false,
        label: "Phân quyền"
      },
      {
        id: "status",
        numeric: false,
        disablePadding: false,
        label: "Trạng thái"
      },
      // {
      //   id: "avatar",
      //   numeric: false,
      //   disablePadding: false,
      //   label: "Ảnh đại diện"
      // },
      {
        id: "address",
        numeric: false,
        disablePadding: false,
        label: "Địa chỉ "
      },
      { id: "action", numeric: false, disablePadding: true, label: "Thao tác" }
    ];
    const { classes } = this.props;
    const {
      data,
      order,
      orderBy,
      selected,
      rowsPerPage,
      page,
      typeAction,
      isShowModal,
      switchCreate,
      switchEdit,
      selectRole,
      arrRole,
      showNotify,
      titleNotify,
      typeNotify,
      userId,
      selectRoleEdit,
      typeSuccess,
      typeWarning,
      showNotifyDelete
    } = this.state;
    
    const _role = JSON.parse(localStorage.getItem("user")).role;
    let role = Common.verify("VIEW", _role);
    let isRoleRoot = role.filter(c => c.role == "ROOT");
    let isMaster = role.filter(c => c.role == "MASTER");
    let isEditor = role.filter(c => c.role == "EDITOR");

    let roleAdd = Common.verify("ADD", _role);
    let EditorAdd = roleAdd.filter(c => c.role == "EDITOR");

    let roleDelete = Common.verify("DELETE", _role);
    let EditorDelete = roleDelete.filter(c => c.role == "EDITOR");
    let MasterDelete = roleDelete.filter(c => c.role == "MASTER");
    let RootDelete = roleDelete.filter(c => c.role == "ROOT");

    return (
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
                <Icon>group</Icon>
              </CardIcon>
              <EnhancedTableToolbar
                numSelected={selected.length}
                handleShowCreate={this.handleShowCreate.bind(this)}
              />
            </CardHeader>
            <CardBody className={classes.customCardBody}>
              <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                  <Table className={classes.table} aria-labelledby="tableTitle">
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
                      {this.stableSort(data, this.getSorting(order, orderBy))
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((n, index) => {
                          const isSelected = this.isSelected(index + 1);
                          return (
                            <TableRow hover key={index + 1} id={n}>
                              {/* <TableCell padding="checkbox">
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
                              <TableCell style={{ padding: "4px 9px 4px 9px" }}>
                                {n.name}
                              </TableCell>
                              <TableCell style={{ padding: "4px 9px 4px 9px" }}>
                                {n.email}
                              </TableCell>
                              <TableCell style={{ padding: "4px 9px 4px 9px" }}>
                                {n.role.map((r, index) => {
                                  return (
                                    <p style={{ display: "flex" }} key={index}>
                                      <Icon
                                        style={{
                                          padding: "0 2px",
                                          transform: "rotate(-90deg)",
                                          fontSize: "1em"
                                        }}
                                      >
                                        vpn_key
                                      </Icon>
                                      {r.name}
                                    </p>
                                  );
                                })}
                              </TableCell>
                              <TableCell style={{ padding: "4px 9px 4px 9px" }}>
                                <Switch
                                  defaultChecked={n.status == 1 ? true : false}
                                />
                              </TableCell>
                              {/* <TableCell style={{ padding: "4px 9px 4px 9px" }}>
                                <img
                                  src={
                                    API.getAPI().PATH_IMAGE +
                                      folder +
                                      n.avatar !=
                                    undefined
                                      ? API.getAPI().PATH_IMAGE +
                                        folder +
                                        n.avatar
                                      : avatar
                                  }
                                  alt="..."
                                  className={classes.customAvatar}
                                />
                              </TableCell> */}
                              <TableCell style={{ padding: "4px 9px 4px 9px" }}>
                                {n.address}
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="fab"
                                  color="secondary"
                                  aria-label="Edit"
                                  className={classes.btnEdit}
                                  onClick={() => {
                                    this.handleShowEdit(true, "edit", n._id);
                                  }}
                                >
                                  <Icon>edit_icon</Icon>
                                </Button>
                                {
                                  <Button
                                    style={{ marginLeft: 10 }}
                                    disabled={
                                      (RootDelete.length > 0 &&
                                        RootDelete[0].method == true) ||
                                      (MasterDelete.length > 0 &&
                                        MasterDelete[0].method == true)
                                        ? false
                                        : true
                                    }
                                    variant="fab"
                                    color="secondary"
                                    aria-label="Edit"
                                    className={classes.btnEdit}
                                    onClick={() => {
                                      this.handleDelete(n._id);
                                    }}
                                  >
                                    <Icon>delete_icon</Icon>
                                  </Button>
                                }
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      {/* {emptyRows > 0 && (
                        <TableRow style={{ height: 49 * emptyRows }}>
                        <TableCell colSpan={6} />
                        </TableRow>
                    )} */}
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
                  onChangeRowsPerPage={this.handleChangeRowsPerPage.bind(this)}
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
                        TẠO THÀNH VIÊN MỚI
                      </h4>
                    </CardHeader>
                    <CardBody>
                      <GridContainer alignItems={"flex-end"}>
                        <GridItem xs={12} sm={6} md={6}>
                          <CustomInput
                            labelText="Họ và tên"
                            id="txtName"
                            formControlProps={{
                              fullWidth: true
                            }}
                            ref={input => (this.txt_Name = input)}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={6}>
                          <CustomInput
                            labelText="Email"
                            id="txtEmail"
                            formControlProps={{
                              fullWidth: true
                            }}
                            ref={input => (this.txt_email = input)}
                          />
                        </GridItem>
                      </GridContainer>
                      <GridContainer alignItems={"flex-end"}>
                        <GridItem xs={12} sm={6} md={6}>
                          <CustomInputPassword
                            labelText="Mật khẩu"
                            id="txtPassword"
                            formControlProps={{
                              fullWidth: true
                            }}
                            ref={input => (this.txt_password = input)}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={6}>
                          <CustomInput
                            labelText="Địa chỉ"
                            id="txtAddress"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              multiline: true,
                              rows: 5
                            }}
                          />
                        </GridItem>
                      </GridContainer>
                      <GridContainer alignItems={"flex-end"}>
                        <GridItem xs={12} sm={6} md={6}>
                          <div style={{ float: "left" }}>
                            <label>Trạng thái</label>
                            <Switch
                              id="swtStatus"
                              defaultChecked={switchCreate}
                              onChange={this.handChangeSwitchCreate.bind(this)}
                            />
                          </div>
                        </GridItem>
                        <GridItem xs={12} sm={6} md={6}>
                          <FormControl className={classes.formControl}>
                            <InputLabel className={classes.customInputLable}>
                              Chọn quyền
                            </InputLabel>
                            <Select
                              multiple
                              value={selectRole}
                              onChange={this.handleChangeRole.bind(this)}
                              input={
                                <Input
                                  id="select-multiple-role"
                                  className={classes.customInput}
                                />
                              }
                              renderValue={selected => {
                                let arr = [];
                                selected.map(c => {
                                  if (c == "EDITOR") {
                                    arr.push("Quyền Chỉnh Sửa");
                                  } else if (c == "MONITOR") {
                                    arr.push("Quyền Xem Thông Tin");
                                  }
                                  else if (c == "MASTER") {
                                    arr.push("Quyền Quản Trị");
                                  }
                                });

                                return arr.join(", ");
                              }}
                              MenuProps={MenuProps}
                            >
                              {arrRole.map((role, index) => (
                                <MenuItem key={index} value={role.code}>
                                  <Checkbox
                                    checked={selectRole.indexOf(role.code) > -1}
                                  />
                                  <ListItemText primary={role.name} />
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </GridItem>
                      </GridContainer>
                      <GridContainer alignItems={"flex-end"}>
                        <GridItem
                          xs={12}
                          sm={6}
                          md={6}
                          style={{ textAlign: "left" }}
                        >
                          <label>
                            Ảnh đại diện{" "}
                            <small>(Nhận vào hình để thay đổi) </small>
                          </label>
                          <CardAvatar
                            className={classes.customCardAvatar}
                            style={{ float: "left" }}
                          >
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
                        {/* <GridItem xs={12} sm={6} md={6}>
                          {isRoleRoot.length > 0 &&
                            isRoleRoot[0].method == true && (
                              <FormControlLabel
                                control={<Checkbox id="checkMaster" />}
                                label="Quyền chủ nông trại"
                                style={{ float: "left" }}
                              />
                            )}
                        </GridItem> */}
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
                            onClick={this.handleCreateAccount.bind(this)}
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
                        CHỈNH SỬA THÔNG TIN THÀNH VIÊN
                      </h4>
                    </CardHeader>
                    <CardBody>
                      <GridContainer alignItems={"flex-end"}>
                        <GridItem xs={12} sm={6} md={6}>
                          <CustomInput
                            labelText="Họ và tên"
                            id="txtName"
                            //  value={userId.name}
                            inputProps={{
                              defaultValue: userId.name
                            }}
                            formControlProps={{
                              fullWidth: true
                            }}
                            ref={input => (this.txt_Name = input)}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={6}>
                          <CustomInput
                            labelText="Email"
                            id="txtEmail"
                            inputProps={{
                              defaultValue: userId.email
                            }}
                            formControlProps={{
                              fullWidth: true
                            }}
                            ref={input => (this.txt_email = input)}
                          />
                        </GridItem>
                      </GridContainer>
                      <GridContainer alignItems={"flex-end"}>
                        <GridItem xs={12} sm={6} md={6}>
                          <CustomInputPassword
                            labelText="Mật khẩu"
                            id="txtPassword"
                            inputProps={{
                              defaultValue: userId.password
                            }}
                            formControlProps={{
                              fullWidth: true
                            }}
                            ref={input => (this.txt_password = input)}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={6}>
                          <CustomInput
                            labelText="Địa chỉ"
                            id="txtAddress"
                            inputProps={{
                              defaultValue: userId.address
                            }}
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              multiline: true,
                              rows: 5
                            }}
                          />
                        </GridItem>
                      </GridContainer>
                      <GridContainer alignItems={"flex-end"}>
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
                        <GridItem xs={12} sm={6} md={6}>
                          <FormControl className={classes.formControl}>
                            <InputLabel className={classes.customInputLable}>
                              Chọn quyền
                            </InputLabel>
                            <Select
                              multiple
                              value={selectRoleEdit}
                              onChange={this.handleChangeRole.bind(this)}
                              input={
                                <Input
                                  id="select-multiple-role"
                                  className={classes.customInput}
                                />
                              }
                              renderValue={selected => {
                                let arr = [];
                                selected.map(c => {
                                  if (c == "EDITOR") {
                                    arr.push("Quyền Chỉnh Sửa");
                                  } else if (c == "MONITOR") {
                                    arr.push("Quyền Xem Thông Tin");
                                  }
                                  else if (c == "MASTER") {
                                    arr.push("Quyền Quản Trị");
                                  }
                                });

                                return arr.join(", ");
                              }}
                              MenuProps={MenuProps}
                            >
                              {arrRole.map((role, index) => (
                                <MenuItem key={index} value={role.code}>
                                  <Checkbox
                                    checked={
                                      selectRoleEdit.indexOf(role.code) > -1
                                    }
                                  />
                                  <ListItemText primary={role.name} />
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </GridItem>
                      </GridContainer>
                      <GridContainer alignItems={"flex-end"}>
                        <GridItem
                          xs={12}
                          sm={6}
                          md={6}
                          style={{ textAlign: "left" }}
                        >
                          <label>
                            Ảnh đại diện{" "}
                            <small>(Nhận vào hình để thay đổi) </small>
                          </label>
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
                              (userId.avatar != "" && userId.avatar !=null)
                                  ? API.getAPI().PATH_IMAGE +
                                    folder +
                                    userId.avatar
                                  : avatar
                              }
                              alt="..."
                              className={classes.customImageAvatar}
                              id="imageAvatar"
                             
                              onClick={this.imageChange.bind(this)}
                            />
                          </CardAvatar>
                        </GridItem>

                        {/* <GridItem xs={12} sm={6} md={6}>
                          {isRoleRoot.length > 0 &&
                            isRoleRoot[0].method == true && (
                              <FormControlLabel
                                control={<Checkbox id="checkMaster1" defaultChecked={userId.is_parent}
                                />}
                                label="Quyền chủ nông trại"
                                id="checkMaster"
                                style={{ float: "left" }}
                              />
                            )}
                        </GridItem> */}
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
                            onClick={this.handleEditAccount.bind(this)}
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
        {/* Notify */}

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
        <SweetAlert
          timer={2000}
          customClass={classes.sweet}
          show={showNotifyDelete}
          warning
          showCancel
          confirmBtnText="Xóa ngay"
          confirmBtnBsStyle="danger"
          cancelBtnBsStyle="default"
          title="Bạn có chắc chắn muốn xóa thành viên"
          onConfirm={() => {
            this.handleDeleteUser();
          }}
          onCancel={() => {
            this.handleCancel();
          }}
        />
      </GridContainer>
    );
  }
}

Account.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(accountStyle)(Account);
