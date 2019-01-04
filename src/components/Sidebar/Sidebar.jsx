import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
// core components
import HeaderLinks from "components/Header/HeaderLinks.jsx";

import sidebarStyle from "assets/jss/common-styles/components/sidebarStyle.jsx";
import Common from "../../utils/Common";
import { Edit } from "@material-ui/icons/Edit";
const Sidebar = ({ ...props }) => {
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return props.location.pathname.indexOf(routeName) > -1 ? true : false;
  }

  const { classes, color, logo, image, logoText, routes } = props;
  if(localStorage.getItem("user") === null){
    window.location.href = "#/login";
    return null;
  }
  const _role = JSON.parse(localStorage.getItem("user")).role;
  const _roleUser=_role.map(c=>c.code)
  var links = (
    <List className={classes.list}>
      {
         routes.map((prop, key) => {
            let check=prop.role.filter(k=>_roleUser.includes(k));
          
            if(check.length>0)
            {
              if (prop.redirect || prop.navbarName === "") return null;
              var activePro = " ";
              let listItemClasses = classNames({
                [" " + classes[color]]: activeRoute(prop.path)
              });
              const whiteFontClasses = classNames({
                [" " + classes.whiteFont]: activeRoute(prop.path)
              });

              return (
                <div key={key}>
                  {
                    <NavLink
                      to={prop.path}
                      className={activePro + classes.item}
                      activeClassName="active"
                    >
                      <ListItem
                        button
                        className={classes.itemLink + listItemClasses}
                      >
                        <ListItemIcon
                          className={classes.itemIcon + whiteFontClasses}
                        >
                          {typeof prop.icon === "string" ? (
                            <Icon>{prop.icon}</Icon>
                          ) : (
                            <prop.icon />
                          )}
                        </ListItemIcon>
                        <ListItemText
                          style={{ textTransform: "capitalize"}}
                          primary={prop.sidebarName}
                          className={classes.itemText + whiteFontClasses}
                          disableTypography={true}
                        />
                      </ListItem>
                    </NavLink>
                  }
                </div>
              );
            }
         
        })
    }
    
    </List>
  );
  const brand = (
    <div className={classes.logo}>
      <a href="http://www.elcomprime.vn/" className={classes.logoLink}>
        <div
        // className={classes.logoImage}
        >
          <img src={logo} alt="logo-efarm" className={classes.img} />
        </div>
        <div className={classes.logoText}>{logoText}</div>
      </a>
    </div>
  );
  return (
    <div>
      {/* <Hidden mdUp implementation="css"> */}
        <Drawer
          variant="temporary"
          anchor="right"
          open={props.open}
          classes={{
            paper: classes.drawerPaper
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            <HeaderLinks />
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      {/* </Hidden> */}
      {/* <Hidden smDown implementation="css"> */}
        <Drawer
          anchor="left"
          variant="permanent"
          open
          classes={{
            paper: classes.drawerPaper
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      {/* </Hidden> */}
    </div>
  );
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(sidebarStyle)(Sidebar);
