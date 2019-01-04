import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/lab/Slider";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
const styles = {
  root: {
    display: "flex",
    height: 200,
    "& button": {
      left: "50%"
    }
  },
  title: {
    position: "absolute",
    bottom: 0
  }
};

class VerticalSlider extends React.Component {
  state = {
    valueMax: 50,
    valueMin: 50,
    valueImportant: 50
  };

  handleChangeMax = (event, valueMax) => {
    this.setState({ valueMax });
  };
  handleChangeMin = (event, valueMin) => {
    this.setState({ valueMin });
  };
  handleChangeImportant = (event, valueImportant) => {
    this.setState({ valueImportant });
  };
  componentDidMount() {}
  render() {
    const { classes, objDateInfo } = this.props;
    const { valueMax, valueMin, valueImportant } = this.state;

    return (
      <div style={{ height: 250 }}>
        {Object.keys(objDateInfo).length>0 ? (
          <div className={classes.root}>
          
            <Slider
              className={classes.customSlider}
              value={objDateInfo.threshold_max}
              onChange={this.handleChangeMax}
              vertical
            />
              
            <h6 className={classes.title}>Ngưỡng tối đa:<strong>{objDateInfo.threshold_max}</strong></h6>
            <Slider
              className={classes.customSlider}
              value={objDateInfo.threshold_min}
              onChange={this.handleChangeMin}
              vertical
            />
            <h6 className={classes.title} style={{ left: "35%" }}>
            
              Ngưỡng tối thiểu:<strong>{objDateInfo.threshold_min}</strong>
            </h6>
            <Slider
              className={classes.customSlider}
              value={objDateInfo.threshold_special}
              onChange={this.handleChangeImportant}
              vertical
            />
            <h6 className={classes.title} style={{ right: "2%" }}>
              Ngưỡng đặc biệt:<strong>{objDateInfo.threshold_special}</strong>
            </h6>
          </div>
        ) : (
          
          <SnackbarContent
          message={
            'Vui lòng chọn thiết bị để xem giá trị ngưỡng'
          }
          close
          color="warning"
        />
        )}
      </div>
    );
  }
}

VerticalSlider.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(VerticalSlider);
