import { successColor } from "assets/jss/common-styles.jsx";

const dashboardStyle = theme => ({
  successText: {
    color: successColor
  },
  upArrowCardCategory: {
    width: "16px",
    height: "16px"
  },
  modalDashboard: {
    position: "absolute",
    width: theme.spacing.unit * 100,
    padding: theme.spacing.unit * 4,
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    textAlign: "center",
    borderRadius: "0"
  },
  lineClamp: {
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    display: "-webkit-box"
  },
  stats: {
    color: "#999999",
    display: "inline-flex",
    fontSize: "12px",
    lineHeight: "22px",
    "& svg": {
      top: "4px",
      width: "16px",
      height: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px"
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      top: "4px",
      fontSize: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px"
    }
  },
  cardCategory: {
    color: "#000",
    margin: "0",
    fontSize: "18px",
    marginTop: "0",
    paddingTop: "10px",
    marginBottom: "0",
    width: "100%",
    overflow:"hidden",
    textOverflow: "ellipsis",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    display: "-webkit-box"
  },

  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitle: {
    color: "#3C4858",
    fontWeight: "bold",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    textDecoration: "none",
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    display: "-webkit-box",
    lineHeight:"67px",
    fontSize:"1.8em", 
    marginLeft:"10px", 
    textAlign:"center",
    "& small": {
      color: "#777",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  customHeightCard: {
    minHeight: "120px"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: 10,
    width: "60%",
    padding:0,

    "& svg": {
      margin: "0px 10px 4px !important",
      height: "28px"
    }
  },
  selectType: {
    marginTop: 20,
    float: "left",
    width: "200px",

    "& svg": {
      margin: "0px 10px 4px !important",
      height: "28px"
    }
  },
  titleChart: {
    marginTop: 35,
    float: "left"
  },
  customIconAction:{
      width:"20px !important",
      height:"20px !important",
      lineHeight:"20px !important",
      fontSize:"1em !important",
    
  },
  headerBox3: {
    // position: "absolute !important",
    zIndex: "9999 !important",
    right: 0,
    width: "auto",
    top: "9rem"
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
 
});

export default dashboardStyle;
