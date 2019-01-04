import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Common from "../../utils/Common";
import API from "../../utils/API";
const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  },
  btnAdd: {
    height: "47px"
  },
  customAddIcon: {
    margin: "0px 4px 0px !important"
  }
});
class EnhancedTableToolbar extends React.Component {
  constructor(props) {
    super(props);
  }
  handleShowCreate() {
    this.props.handleShowCreate(true,"create");
  }
  render() {
    const { numSelected, classes } = this.props;
    const _role = JSON.parse(localStorage.getItem("user")).role;
    let roleAdd = Common.verify("ADD", _role);
    let EditorAdd=roleAdd.filter(c => c.role == "EDITOR");
    let MasterAdd=roleAdd.filter(c => c.role == "MASTER");
    let RootAdd=roleAdd.filter(c => c.role == "ROOT");
    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0
        })}
      >
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subheading">
              {numSelected} selected
            </Typography>
          ) : 
          (
           (EditorAdd.length>0 && EditorAdd[0].method== true) &&
            <Button
              variant="extendedFab"
              aria-label="Delete"
              className={classes.btnAdd}
              onClick={this.handleShowCreate.bind(this)}
            >
              <AddIcon className={classes.customAddIcon} />
              Tạo mới
            </Button>
            
          )
          }
          {
            ((RootAdd.length>0 && RootAdd[0].method==true) ||(MasterAdd.length>0 && MasterAdd[0].method)==true ) &&
           (
            <Button
            variant="extendedFab"
            aria-label="Delete"
            color="secondary"
            className={classes.btnAdd}
            onClick={this.handleShowCreate.bind(this)}
          >
            <AddIcon className={classes.customAddIcon} />
            Tạo mới
          </Button>
           )
          }
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Filter list">
              <IconButton aria-label="Filter list">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </Toolbar>
    );
  }
}

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
};
export default withStyles(toolbarStyles)(EnhancedTableToolbar);
