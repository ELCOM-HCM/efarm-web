import React from "react";
export default {
  _getDecentralization: function() {
    let arrRoleUser = JSON.parse(localStorage.getItem("user")).role;
    let objRoleCode = {};
    arrRoleUser.length > 0 &&
      arrRoleUser.map((c) => {
        if (c.code == "ROOT") {
          objRoleCode.root = "ROOT" || "";
        } else if (c.code == "EDITOR") {
          objRoleCode.editor = "EDITOR" || "";
        } else if (c.code == "MONITOR") {
          objRoleCode.monitor = "MONITOR" || "";
        } else if (c.code == "MASTER") {
          objRoleCode.master = "MASTER" || "";
        }
      });

    return objRoleCode;
  }
};
