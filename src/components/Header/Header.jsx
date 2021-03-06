import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import HeaderLinks from "./HeaderLinks.jsx";
import Button from "components/CustomButtons/Button.jsx";

import headerStyle from "assets/jss/common-styles/components/headerStyle.jsx";

function Header({ ...props }) {
  function makeBrand() {
    var name;
    props.routes.map((prop, key) => {
      if (prop.path === props.location.pathname) {
        name = prop.navbarName;
      }
      return null;
    });
    return name;
  }
  const { classes, color } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color
  });
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Button color="transparent" href={props.navbarName} className={classes.title} style={{marginLeft:"40px"}}>
            {makeBrand()}
          </Button>
        </div>
        <div className={classes.flexSearc}>
          <Hidden smDown implementation="css">
          <HeaderLinks />
        </Hidden>
          <Hidden smDown implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
            style={{position: "absolute",
              left: "8px",
              top: "15px"}}
          >
            <Menu />
          </IconButton>
        </Hidden>
        </div>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"])
};

export default withStyles(headerStyle)(Header);
