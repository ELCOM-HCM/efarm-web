/**
 * @author DangTM
 * Use: <DateRangePicker id={"report_daterangepicker"}/>
 */
import React, { Component } from "react";
import moment from "moment";
import $ from "jquery";
import daterangepicker from "daterangepicker";
import "../../assets/css/datePicker.css";

//import './DateRangePicker.css';
class DateRangePicker extends Component {
  // propTypes: {
  //   initialValue: React.PropTypes.string
  // },
  // defaultProps: {
  //   initialValue: ""
  // },
  // Set up initial state
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    var start = moment().subtract(6, "days"); //Last 7 Days
    var end = moment();
    var _ = this;
    function cb(start, end) {
      if (_.props.timePicker) {
        $("#" + _.props.id + " span").html(
          start.format("DD/MM/YYYY h:mm A") +
            " - " +
            end.format("DD/MM/YYYY h:mm A")
        );
      } else {
        $("#" + _.props.id + " span").html(
          start.format("DD/MM/YYYY") + " - " + end.format("DD/MM/YYYY")
        );
      }
      //_.props.onChange(start, end);
		}
	
    $("#" + this.props.id).daterangepicker(
      {
        startDate: start,
        endDate: end,
        ranges: {
          Today: [moment(), moment()],
          Yesterday: [
            moment().subtract(1, "days"),
            moment().subtract(1, "days")
          ],
          "Last 7 Days": [moment().subtract(6, "days"), moment()],
          "Last 30 Days": [moment().subtract(29, "days"), moment()],
          "This Month": [moment().startOf("month"), moment().endOf("month")],
          "Last Month": [
            moment()
              .subtract(1, "month")
              .startOf("month"),
            moment()
              .subtract(1, "month")
              .endOf("month")
          ]
        },
        timePicker: this.props.timePicker || false,
        timePickerIncrement: 30,
        locale: {
          format: this.props.format || "DD/MM/YYYY" //'DD/MM/YYYY h:mm A'
        }
      },
      cb
    );
    cb(start, end);
    $("#" + this.props.id).on("cancel.daterangepicker", function(ev, picker) {
      console.log(picker);
    });
    $("#" + this.props.id).on("apply.daterangepicker", function(ev, picker) {
      //		    	 console.log(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
      _.props.onChange(picker.startDate, picker.endDate);
    });
  }
  render() {
    return (
      <div
      id={this.props.id}
      className="pull-left"
      style={{
        textAlign: "center",
        cursor: "pointer",
        border: "1px solid #ccc",
        width:"100%",
        color:"#000",
        height:30,
        whiteSpace:"nowrap",
        marginTop:30,
        overflow:"hidden",
        padding:"2px 4px",
        fontSize:"0.9em"
      }}
    >
        {/* <i className="fa fa-calendar" />
        &nbsp; */}
        <span />
				 {/* <b className="caret" /> */}
      </div>
    );
  }
}
export default DateRangePicker;
