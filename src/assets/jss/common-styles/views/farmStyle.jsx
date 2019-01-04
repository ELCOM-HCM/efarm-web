const farmStyle = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: "100%"
  },
  tableWrapper: {
    overflowX: "auto"
  },
  btnEdit: {
    width: "40px",
    height: "40px",
    fontSize: "1.5rem"
  },
  customCardBody: {
    padding: "0"
  },
  modalFarm: {
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
  textField: {
    width: "100%",
    fontSize: "14px !important"
  },
  resize: {
    fontWeight: "400 !important",
    lineHeight: "1.42857 !important"
  },
  formTextLabel: {
    color: "#AAAAAA !important",
    fontSize: "14px !important",
    fontWeight: "400 !important",
    lineHeight: "1.42857 !important"
  },
  customCardAvatar: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  customImageAvatar: {
    width: 100,
    height: 100
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
  },
  customNativeSelect: {
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: "0.8125rem",
    fontWeight: " 400"
  }
});

export default farmStyle;
