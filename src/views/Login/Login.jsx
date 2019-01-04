import React, { Component } from "react";
import PropTypes from "prop-types";
import Redirect from "react-router";
import $ from "jquery";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";

// core components
import CardHeader from "components/Card/CardHeader.jsx";
import Button from "components/CustomButtons/Button.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomInputPassword from "components/CustomInput/CustomInputPassword.jsx";
import Card from "components/Card/Card.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import SweetAlert from "react-bootstrap-sweetalert";
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
// api
import Common from "../../utils/Common";
import API from "../../utils/API";
import loginStyle from "assets/jss/common-styles/views/loginStyle.jsx";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openLogin: false,
      openFarm: true,
      arrFarm: [],
      message: "",
      color: "",
      redirect: false,
      showNotify: false,
      typeNotify: "",
      titleNotify: "",
      typeAction: "",
      typeSuccess: false,
      typeWarning: false,
      blocking: false
    };
  }
  _getFarm() {
    let objFarm = {
      method: "POST",
      url: API.getAPI().getFarm
    };
    Common.request(objFarm)
      .then(arr => {
        this.setState({ arrFarm: arr.filter(c => c.status != false) });
      })
      .catch(err => {
        console.log(err);
      });
  }
  hideAlert() {
    let { typeAction } = this.state;
    if (typeAction == "chooseFarm") {
      this.setState({ openLogin: true, openFarm: false, showNotify: false });
    } else if (typeAction == "login") {
      window.location.href = "#/dashboard";
    } else {
      this.setState({ showNotify: false });
    }
  }
  handleOpenLogin = ev => {
    localStorage.clear();
    let idFarmChoose = ev.target.id;

    let { arrFarm } = this.state;
    arrFarm.forEach(f => {
      if (f._id == idFarmChoose) {
        localStorage.setItem("farm", JSON.stringify(f));
      }
    });
    if (localStorage.getItem("farm") != null) {
      this.setState({
        typeAction: "chooseFarm",
        showNotify: true,
        typeSuccess: true,
        typeWarning: false,
        titleNotify:
          "Chào mừng bạn với " + JSON.parse(localStorage.getItem("farm")).name
      });
      setTimeout(() => {
        this.setState({
          showNotify: false
        });
        this.hideAlert();
      }, 2000);
    }
  };
  handleOpenFarm = () => {
    this.setState({ openLogin: false, openFarm: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleLogin = () => {
    var txt_email = $("#txtEmail").val();
    var txt_password = $("#txtPassword").val();
    let user = {
      email: txt_email,
      password: txt_password
    };

    let strError = "";
    if (txt_email == "" && txt_password == "") {
      strError = "Bắt buộc nhập Email và Mật khẩu";
    } else if (txt_email == "") {
      strError = "Bắt buộc nhập Email";
    } else if (txt_password == "") {
      strError = "Bắt buộc nhập Mật khẩu";
    }
    if (strError != "") {
      this.setState({
        showNotify: true,
        typeSuccess: false,
        typeWarning: true,
        titleNotify: strError
      });
      return;
    } else {
      let objLogin = {
        method: "POST",
        url: API.getAPI().login,
        data: user
      };
      this.setState({blocking:true });
      Common.request(objLogin)
        .then(arr => {
      
          let checkMember = JSON.parse(
            localStorage.getItem("farm")
          ).member.filter(c => c._id == arr._id);
          if (checkMember.length > 0) {
            localStorage.setItem("user", JSON.stringify(arr));
            strError = "Đăng nhập thành công";
            this.setState({
              typeAction: "login",
              showNotify: true,
              typeSuccess: true,
              typeWarning: false,
              titleNotify: strError,
              blocking:false
            });
            setTimeout(() => {
              this.setState({
                showNotify: false
              });
              this.hideAlert();
            }, 2000);
          } else {
            this.setState({
              showNotify: true,
              typeSuccess: false,
              typeWarning: true,
              titleNotify: "Thông tin đăng nhập chưa đúng"
            });
            setTimeout(() => {
              this.setState({
                showNotify: false
              });
              this.hideAlert();
            }, 2000);
          }
        })
        .catch(err => {
          console.log(err);
       
          this.setState({
            showNotify: true,
            typeSuccess: false,
            typeWarning: true,
            titleNotify: strError,
            blocking:false
          });
          setTimeout(() => {
            this.setState({
              showNotify: false
            });
            this.hideAlert();
          }, 2000);
        });
    }
  };
  componentWillMount() {
    if (localStorage.getItem("farm") != null) {
      this.setState({ openLogin: true, openFarm: false });
    } else {
      this.setState({ openLogin: false, openFarm: true });
    }
  }
  componentDidMount() {
    this._getFarm();
    $('div[data-disable="disable"]').prop({
      disabled: true
    });
    let $this = this;
    $(document).keypress(function(e) {
      if (e.which == 13) {
        $this.handleLogin();
      }
    });
  }
  render() {
    let { classes } = this.props;
    let {
      openFarm,
      openLogin,
      arrFarm,
      message,
      color,
      showNotify,
      titleNotify,
      typeNotify,
      typeAction,
      typeSuccess,
      typeWarning,
      loading
    } = this.state;

    return (
      <div>
      <BlockUi tag="div" blocking={this.state.blocking}>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={openLogin}
          onClose={this.handleClose}
          className={classes.bgLoginFarm}
        >
          <div className={classes.modalLogin}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="rose" className={classes.customCardHeader}>
                    {/* <Typography variant="title" id="modal-title">
                      Chào Mừng Đến{" "}
                      {JSON.parse(localStorage.getItem("farm")) != null &&
                        JSON.parse(localStorage.getItem("farm")).name}
                    </Typography>
                    <Typography
                      variant="subheading"
                      id="simple-modal-description"
                    >
                      Đăng Nhập Để Vào Hệ Thống Quản Lý
                    </Typography> */}
                    <h4 className={classes.cardTitleWhite}>ĐĂNG NHẬP</h4>
                  </CardHeader>
                  <CardBody>
                    <div>
                      <GridContainer alignItems={"flex-end"}>
                        <GridItem xs={10} sm={10} md={10}>
                          <CustomInput
                            labelText="Email"
                            id="txtEmail"
                            formControlProps={{
                              fullWidth: true
                            }}
                            ref={input => (this.txt_email = input)}
                          />
                        </GridItem>
                        <GridItem xs={2} sm={2} md={2}>
                          <Icon className={classes.iconLogin}>email</Icon>
                        </GridItem>
                      </GridContainer>
                      <GridContainer alignItems={"flex-end"}>
                        <GridItem xs={10} sm={10} md={10}>
                          <CustomInputPassword
                            type="password"
                            className={classes.customInput}
                            labelText="Mật khẩu"
                            id="txtPassword"
                            ref={input => (this.txt_password = input)}
                            formControlProps={{
                              fullWidth: true
                            }}
                          />
                        </GridItem>
                        <GridItem xs={2} sm={2} md={2}>
                          <Icon className={classes.iconLogin}>vpn_key</Icon>
                        </GridItem>
                      </GridContainer>

                      <div className={classes.buttonLogin}>
                        <Button
                          color="rose"
                          size={"sm"}
                          onClick={this.handleLogin.bind(this)}
                        >
                          <Icon>forward</Icon>
                          ĐĂNG NHẬP
                        </Button>
                      </div>
                      <div className={classes.textCenter}>
                        <a href="#login" className={classes.linkLogin}>
                          Chưa có tài khoản
                        </a>{" "}
                        <br />
                        <a
                          href="#login"
                          className={classes.linkLogin}
                          onClick={this.handleOpenFarm.bind(this)}
                        >
                          Chọn FARM
                        </a>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </Modal>
        </BlockUi>
        {/* Modal choose Farm */}
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={openFarm}
          onClose={this.handleClose}
          className={classes.bgLoginFarm}
        >
          <div className={classes.modalFarm}>
            {/* <Typography variant="title" id="modal-title">
              CHỌN FARM
            </Typography> */}
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="rose" className={classes.customCardHeader}>
                    <h4 className={classes.cardTitleWhite}>CHỌN NÔNG TRẠI</h4>
                  </CardHeader>
                  <CardBody>
                    <div>
                      <GridContainer>
                        {arrFarm.map((c, index) => {
                          return (
                            <GridItem
                              key={index}
                              xs={6}
                              sm={4}
                              md={3}
                              id={c._id}
                              onClick={this.handleOpenLogin.bind(this)}
                            >
                              <Tooltip
                                title={
                                  <React.Fragment>
                                    {c.description}
                                    <span
                                      className={classes.arrowArrow}
                                      ref={this.handleArrowRef}
                                    />
                                  </React.Fragment>
                                }
                                classes={{ popper: classes.arrowPopper }}
                                PopperProps={{
                                  popperOptions: {
                                    modifiers: {
                                      arrow: {
                                        enabled: Boolean(this.state.arrowRef),
                                        element: this.state.arrowRef
                                      }
                                    }
                                  }
                                }}
                              >
                                <Card
                                  className={classes.borderCard}
                                  data-disable={
                                    c.status == false ? "disable" : ""
                                  }
                                >
                                  <CardIcon color="success" id={c._id}>
                                    <Icon>local_florist</Icon>
                                  </CardIcon>
                                  <p className={classes.titleFarm} id={c._id}>
                                    {c.name}
                                  </p>
                                </Card>
                              </Tooltip>
                            </GridItem>
                          );
                        })}
                      </GridContainer>
                    </div>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </Modal>
        <SweetAlert
          timer={2000}
          customClass={classes.sweet}
          show={showNotify}
          success={typeSuccess}
          warning={typeWarning}
          title={titleNotify}
          onConfirm={() => {
            this.hideAlert();
          }}
        />
      
      </div>
    );
  }
}
Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(loginStyle)(Login);
