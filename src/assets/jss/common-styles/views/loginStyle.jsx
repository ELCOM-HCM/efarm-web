import { boxShadow } from "assets/jss/common-styles.jsx";
import background from "assets/img/background.jpg";
const loginStyle = theme => ({
  arrowPopper: {
    '&[x-placement*="bottom"] $arrowArrow': {
      top: 0,
      left: "50%",
      marginTop: "-0.9em",
      width: "3em",
      height: "1em",
      transform: "translateX(-50%)",
      "&::before": {
        borderWidth: "0 1em 1em 1em",
        borderColor: `transparent transparent ${
          theme.palette.grey[700]
        } transparent`
      }
    },
    '&[x-placement*="top"] $arrowArrow': {
      bottom: 0,
      left: 0,
      marginBottom: "-0.9em",
      width: "3em",
      height: "1em",
      "&::before": {
        borderWidth: "1em 1em 0 1em",
        borderColor: `${
          theme.palette.grey[700]
        } transparent transparent transparent`
      }
    },
    '&[x-placement*="right"] $arrowArrow': {
      left: 0,
      marginLeft: "-0.9em",
      height: "3em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 1em 1em 0",
        borderColor: `transparent ${
          theme.palette.grey[700]
        } transparent transparent`
      }
    },
    '&[x-placement*="left"] $arrowArrow': {
      right: 0,
      marginRight: "-0.9em",
      height: "3em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 0 1em 1em",
        borderColor: `transparent transparent transparent ${
          theme.palette.grey[700]
        }`
      }
    }
  },
  bgLoginFarm:{
      width:"100%",
      height:"100vh",
      backgroundImage:`url(${background})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
  },
  arrowArrow: {
    position: "absolute",
    fontSize: 7,
    width: "3em",
    height: "3em",
    "&::before": {
      content: '""',
      margin: "auto",
      display: "block",
      width: 0,
      height: 0,
      borderStyle: "solid"
    },
    button: {
      margin: theme.spacing.unit
    }
  },
  customCardHeader:{
    color:"#fff",
    padding:"0 !important"
  },
  sweet:{
    "& button":{
      fontSize: "0.6875rem",
      lineHeight: "1.5",
      borderRadius:" 0.2rem",
      boxShadow: "0 2px 2px 0 rgba(233, 30, 99, 0.14), 0 3px 1px -2px rgba(233, 30, 99, 0.2), 0 1px 5px 0 rgba(233, 30, 99, 0.12)",
      backgroundColor: "#e91e63",
      outline: "none",
      border: "navajowhite",
      color: "#fff",
      padding: "12px 3rem"
    }
  },
  modalLogin: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    padding: theme.spacing.unit * 4,
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    textAlign: "center",
    borderRadius: "0",
  },

  modalFarm: {
    position: "absolute",
    width: theme.spacing.unit * 100,
    padding: theme.spacing.unit * 4,
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    textAlign: "center",
    borderRadius: "1rem"
  },
  sweetAlert:{},
  iconLogin: {
    fontSize: "2rem"
  },
  customInput: {
    marginTop: 0
  },
  flexItem: {
    display: "flex",

    alignItems: "flex-end",
    height: "90%"
  },
  buttonLogin: {
    display: "flex",
    justifyContent: "center",
    margin: "27px"
  },
  linkLogin: {
    color: "#2196f3"
  },
  textCenter: {
    textAlign: "center"
  },
  titleFarm: {
    fontWeight: "bold"
  },
  borderCard: {
    ...boxShadow
  },
 
});
export default loginStyle;
