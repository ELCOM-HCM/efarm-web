import React from "react";
import $ from "jquery";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInputPassword from "components/CustomInput/CustomInputPassword.jsx";
import avatar from "assets/img/faces/icon-user.jpg";
import SweetAlert from "react-bootstrap-sweetalert";
import Common from "../../utils/Common";
import API from "../../utils/API";
// api

import "../../assets/js/upload.js";
import { TextField, Icon } from "@material-ui/core";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  sweet: {
    "& button": {
      fontSize: "0.6875rem",
      lineHeight: "1.5",
      borderRadius: " 0.2rem",
      boxShadow:
        "0 2px 2px 0 rgba(233, 30, 99, 0.14), 0 3px 1px -2px rgba(233, 30, 99, 0.2), 0 1px 5px 0 rgba(233, 30, 99, 0.12)",
      backgroundColor: "#e91e63",
      outline: "none",
      border: "navajowhite",
      color: "#fff",
      padding: "12px 3rem"
    }
  }
};

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      objUser: {
        name: "",
        email: "",
        address: "",
        password: ""
      },
      showNotify: false,
      typeNotify: "",
      titleNotify: "",
      dataToken: "",
      typeSuccess: false,
      typeWarning: false
    };
  }
  componentDidMount() {
    this.handleShowEdit();
    this.getToken();
  }
  handleShowEdit() {
    let objUser = {
      method: "POST",
      url: API.getAPI().getUserId + JSON.parse(localStorage.getItem("user"))._id
    };
    Common.request(objUser)
      .then(obj => {
        this.setState({ objUser: obj, name: obj.name });
      })
      .catch(err => {});
  }
  //Upload image
  getToken() {
    let objToken = {
      method: "PUT",
      url: API.getAPI().getToken,
      data: {
        _id: JSON.parse(localStorage.getItem("user"))._id,
        email: JSON.parse(localStorage.getItem("user")).email
      }
    };
    Common.request(objToken)
      .then(obj => {
        this.setState({ dataToken: obj.token });
      })
      .catch(err => {});
  }
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
  async handleEditAccount() {
    let { objUser } = this.state;
    let image = $("#imageAvatar").attr("data-src");

    let objAccount = {
      method: "PUT",
      data: {
        email: objUser.email,
        name: objUser.name,
        password: objUser.password,
        address: objUser.address,
        avatar: image,
        status: 1,
        role_id: objUser.role,
        is_parent: objUser.is_parent
      },
      url: "user/" + JSON.parse(localStorage.getItem("user"))._id
    };

    await Common.request(objAccount)
      .then(arr => {
        this.handleShowEdit();
        let user = JSON.parse(localStorage.getItem("user"));
        user.email = objUser.email;
        user.name = objUser.name;
        user.address = objUser.address;
        user.avatar = image;
        localStorage.setItem("user", JSON.stringify(user));

        this.setState({
          showNotify: true,
          typeSuccess: true,
          typeWarning: false,
          titleNotify: "Cập Nhật Thông Tin Thành Công"
        });
        setTimeout(() => {
          this.setState({
            showNotify: false
          
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
            showNotify: false
          
          });
        }, 2000);
        console.log(err);
      });
  }
  handleCloseModal() {
    this.setState({ showNotify: false });
  }

  render() {
    const { classes } = this.props;
    let {
      objUser,
      name,
      showNotify,
      titleNotify,
      dataToken,
      typeSuccess,
      typeWarning
    } = this.state;

    let folder = JSON.parse(localStorage.getItem("user")).folder + "/";

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="rose">
                <h4 className={classes.cardTitleWhite}>
                  CHỈNH SỬA THÔNG TIN CÁ NHÂN
                </h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <Card>
                      <CardBody>
                        <GridContainer alignItems={"flex-end"}>
                          <GridItem xs={12} sm={6} md={6}>
                            <CustomInput
                              labelText="Họ và tên"
                              id="txtNameUser"
                              type="text"
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                value: objUser.name,
                                onChange: e => {
                                  objUser.name = e.currentTarget.value;
                                  this.setState({ objUser });
                                }
                              }}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={6} md={6}>
                            <CustomInput
                              labelText="Email"
                              id="txtEmail"
                              disable="true"
                              inputProps={{
                                value: objUser.email,
                                onChange: e => {
                                  objUser.email = e.currentTarget.value;
                                  this.setState({ objUser });
                                }
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
                                value: objUser.password,
                                onChange: e => {
                                  objUser.password = e.currentTarget.value;
                                  this.setState({ objUser });
                                }
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
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                multiline: true,
                                rows: 5,
                                value: objUser.address,
                                onChange: e => {
                                  objUser.address = e.currentTarget.value;
                                  this.setState({ objUser });
                                }
                              }}
                            />
                          </GridItem>
                        </GridContainer>
                        <GridContainer alignItems={"flex-end"} >
                          
                          <GridItem xs={12} sm={12} md={12} >
                           <h6 style={{margin:"20px 0"}}>Quyền truy cập</h6>
                            {JSON.parse(localStorage.getItem("user")).role.map(
                              (c, index) => {
                                return (
                                  <span style={{ display: "flex" }} key={index}>
                                    <Icon
                                      style={{
                                        padding: "0 2px",
                                        transform: "rotate(-90deg)",
                                        fontSize: "1em"
                                      }}
                                    >
                                      vpn_key
                                    </Icon>
                                    {c.name}
                                  </span>
                                );
                              }
                            )}
                          </GridItem>
                        </GridContainer>
                      </CardBody>
                    </Card>
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button
                  color="rose"
                  onClick={this.handleEditAccount.bind(this)}
                >
                  Lưu lại
                </Button>
              </CardFooter>
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
                   ( objUser.avatar !="" && objUser.avatar !=null)
                      ? API.getAPI().PATH_IMAGE + folder + objUser.avatar
                      : avatar
                  }
                  alt="..."
                  id="imageAvatar"
                  data-src={objUser.avatar}
                  onClick={this.imageChange.bind(this)}
                  style={{ width: 150, height: 150 }}
                />
                <Icon
                  style={{
                    position: "absolute",
                    zIndex: 4,
                    color: "#aaa",
                    top: "15%",
                    left: "60%",
                    fontSize: "2.5em"
                  }}
                  onClick={this.imageChange.bind(this)}
                >
                  camera_enhance
                </Icon>
              </CardAvatar>

              <CardBody profile>
                <h4 className={classes.cardTitle}>{objUser.name}</h4>
                <p
                  className={classes.description}
                  style={{ textAlign: "left" }}
                >
                  <strong> Email: {objUser.email}</strong> <br />
                  <strong> Địa chỉ: {objUser.address}</strong>
                </p>
              </CardBody>
            </Card>
            <Card profile>
              <CardBody>
                <CustomInput
                  labelText="Token"
                  id="txtToken"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    multiline: true,
                    rows: 5,
                    value: dataToken,
                    onChange: e => {
                      // objUser.address = e.currentTarget.value;
                      // this.setState({ objUser });
                    }
                  }}
                />
              </CardBody>
              <CardFooter>
                <Button color="rose" onClick={this.getToken.bind(this)}>
                  Lấy mới
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <SweetAlert
          customClass={classes.sweet}
          show={showNotify}
          timer= {2000}
          success={typeSuccess}
          warning={typeWarning}
          title={titleNotify}
          onConfirm={() => {
            this.handleCloseModal();
          }}
        >
        </SweetAlert>
      </div>
    );
  }
}

export default withStyles(styles)(UserProfile);
