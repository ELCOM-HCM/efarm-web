import React from "react";
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Popper from '@material-ui/core/Popper';

// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
import Search from "@material-ui/icons/Search";
// core components
import CardAvatar from "components/Card/CardAvatar.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { Typography, Icon } from "@material-ui/core";
import headerLinksStyle from "assets/jss/common-styles/components/headerLinksStyle.jsx";
import Common from "../../utils/Common";
import API from "../../utils/API";
import avatar from "assets/img/faces/icon-user.jpg";
import { background } from 'assets/img/background.jpg';
import { boxShadow } from 'assets/jss/common-styles.jsx';
class HeaderLinks extends React.Component {
 
  state = {
    open: false,
  };
  handleLogout = event => {
    this.handleClose(event);
   setTimeout(function() {
     window.location.href = "#/login";
   }, 500);
 };
 handleProfile = event => {
    this.handleClose(event);
   setTimeout(function() {
     window.location.href = "#/user-profile";
   }, 500);
 };
  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;
 let folder = JSON.parse(localStorage.getItem("user")).folder + "/";
    return (
      <div className={classes.root}>
        <div>
          <Button
          style={{background:"none",boxShadow:"none",float:"right"}}
            buttonRef={node => {
              this.anchorEl = node;
            }}
            aria-owns={open ? 'menu-list-grow' : null}
            aria-haspopup="true"
            onClick={this.handleToggle}
          >
             <CardAvatar className={classes.customCardAvatar}>
              <img
                src={
                  (JSON.parse(localStorage.getItem("user")).avatar !="" && JSON.parse(localStorage.getItem("user")).avatar !=null)
                    ? API.getAPI().PATH_IMAGE + folder + JSON.parse(localStorage.getItem("user")).avatar
                    : avatar
                }
                alt="..."
                className={classes.customImageAvatar}
                width={40}
                height={40}
                style={{borderRadius:"50%"}}
              />
            </CardAvatar>
            <Typography style={{paddingLeft:10}}>
              {JSON.parse(localStorage.getItem("user")).name}
            </Typography>
          </Button>
          <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList>
                      <MenuItem onClick={this.handleProfile}   className={classes.dropdownItem}  style={{display:"flex"}}> <Icon>person</Icon>
                        Cập nhật thông tin</MenuItem>
                      <MenuItem  onClick={this.handleLogout}   className={classes.dropdownItem}  style={{display:"flex"}}> <Icon>forward</Icon>
                        Đăng xuất</MenuItem>
                   
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    );
  }
}

export default withStyles(headerLinksStyle)(HeaderLinks);
