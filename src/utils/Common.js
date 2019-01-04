/* eslint-disable no-console */
import io from "socket.io-client";
import $ from "jquery";
const socket = io(`http://iot.e-farm.vn:3100?farm=${new Date()}`);
socket.on("connect", function() {
  console.log("Socket connect");
});
socket.on("connect_timeout", function() {
  console.log("Socket disconnect");
});
socket.on("disconnect", function() {
  console.log("Socket disconnect");
});
//http://iot.e-farm.vn:3100
export default {
  SERVER_API: "http://iot.e-farm.vn:3100",
  SERVER_FILE: "http://iot.e-farm.vn:3001",
  UPLOAD_FOLDER: "/home/devil/front-end/data/",
  UPLOAD_IP: "iot.e-farm.vn",
  UPLOAD_PORT: "3001",
  PATH_CONTENT: "",
  SOCKET: socket,
  /**
   * Request api
   * @param {String} url
   * @param {Object} option object parameter: method, url, data
   */

  request: function(option) {
    let params = {
      method: option.method, // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, same-origin, *omit
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-access-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmE0YTk1ODZiMTVmOTVlMjU2ZTlkNWYiLCJlbWFpbCI6Im1pbmhkYW5nY250dEBnbWFpbC5jb20iLCJpYXQiOjE1MzkxNDQyMjR9.CzHQLamyYF4tp4qY7e0MpHyKi9NWnC4kDApyPKv2WKY"
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer" // no-referrer, *client
      //body: JSON.stringify(option.data || {}), // body data type must match "Content-Type" header
    };
    let uri = `${this.SERVER_API}/api/${option.url}`;
    if (option.method === "GET") {
      uri = `${this.SERVER_API}/api/${option.url}?${$.param(option.data)}`;
    } else {
      params.body = JSON.stringify(option.data || {});
    }
    return fetch(uri, params).then(response => {
      return response.json();
    });
  },
  requestDownload: function(option) {
    let params = {
      method: option.method, // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, same-origin, *omit
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-access-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmE0YTk1ODZiMTVmOTVlMjU2ZTlkNWYiLCJlbWFpbCI6Im1pbmhkYW5nY250dEBnbWFpbC5jb20iLCJpYXQiOjE1MzkxNDQyMjR9.CzHQLamyYF4tp4qY7e0MpHyKi9NWnC4kDApyPKv2WKY"
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer" // no-referrer, *client
      //body: JSON.stringify(option.data || {}), // body data type must match "Content-Type" header
    };
    let uri = `${this.SERVER_API}/api/${option.url}`;
    if (option.method === "GET") {
      uri = `${this.SERVER_API}/api/${option.url}?${$.param(option.data)}`;
    } else {
      params.body = JSON.stringify(option.data || {});
    }
    return fetch(uri, params).then(response => {
      return response.blob();
    });
  },

  verify: function(method, roleUser) {
    // EDIT or DELETE or ADD or VIEW
    let arrRoleUser = roleUser;

    let result = [];
    arrRoleUser != undefined &&
      arrRoleUser != null &&
      arrRoleUser.length > 0 &&
      arrRoleUser.map((c, index) => {
        let resultRoleMethod = {};
        if (c.code == "ROOT") {
          switch (method) {
            case "EDIT":
              resultRoleMethod.method = true;
              break;
            case "ADD":
              resultRoleMethod.method = true;
              break;
            case "DELETE":
              resultRoleMethod.method = true;
              break;
            case "VIEW":
              resultRoleMethod.method = true;
              break;
            case "MENU":
              resultRoleMethod.method = true;
              break;
          }
        } else if (c.code == "EDITOR") {
          switch (method) {
            case "EDIT":
              resultRoleMethod.method = true;
              break;
            case "ADD":
              resultRoleMethod.method = false;
              break;
            case "DELETE":
              resultRoleMethod.method = false;
              break;
            case "VIEW":
              resultRoleMethod.method = false;
              break;
            case "MENU":
              resultRoleMethod.method = false;
              break;
          }
        } else if (c.code == "MONITOR") {
          switch (method) {
            case "EDIT":
              resultRoleMethod.method = false;
              break;
            case "ADD":
              resultRoleMethod.method = false;
              break;
            case "DELETE":
              resultRoleMethod.method = false;
              break;
            case "VIEW":
              resultRoleMethod.method = false;
              break;
            case "MENU":
              resultRoleMethod.method = false;
              break;
          }
        } else if (c.code == "MASTER") {
          switch (method) {
            case "EDIT":
              resultRoleMethod.method = true;
              break;
            case "ADD":
              resultRoleMethod.method = true;
              break;
            case "DELETE":
              resultRoleMethod.method = true;
              break;
            case "VIEW":
              resultRoleMethod.method = true;
              break;
            case "MENU":
              resultRoleMethod.method = true;
              break;
          }
        }
        resultRoleMethod.role = c.code;
        result.push(resultRoleMethod);
      });

    return result;
  }
};
