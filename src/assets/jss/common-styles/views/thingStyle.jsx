const thingStyle = theme => ({
  customCardFooter: {
    display: "flex",
    justifyContent: "flex-end"
  },

  customBottom: {
    width: 40,
    height: 40
  },
  customIcon: {
    marginTop: "0 !important",
    top: " 0 !important"
  },
  buttonStatus: {
    padding: 0
  },
  customCardHeader: {
    margin: 0
  },
  customTooltip: {
    right: "0"
  },
  modalThing: {
    position: "absolute",
    width: theme.spacing.unit * 100,
    padding: theme.spacing.unit * 4,
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    textAlign: "center",
    borderRadius: "0"
  },
  formControl: {
    margin: " 9px 0",
    minWidth: "100%",
    maxWidth: "100%"
  },
  customInputLable: {
    color: "#AAAAAA !important",
    fontSize: "14px !important",
    fontWeight: "400 !important",
    lineHeight: "1.42857 !important"
  },
  lineClamp: {
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    display: "-webkit-box"
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
export default thingStyle;
