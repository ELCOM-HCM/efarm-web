import Common from "./Common";

let API = (function() {
  let init = function() {
    /**
     *  Path link to resource image on server
     */
    //upload
    this.PATH_IMAGE = Common.SERVER_FILE + "/drive/views/";
    // Farm
    this.getFarm ="farm/all/";
    this.addFarm="farm/";
    this.getFarmId="farm/";
    this.editFarm="farm/";
    this.deteteFarm="farm/";
    // Login
    this.login ="auth/login/";

    // Account
    this.getListUser="user/";
    this.addUser="user/";
    this.getUserId="user/profile/";
    this.editUser="user/";
    this.deleteUser="user/"
    //Dashboard

    this.getDashboardHead="device/values/";
    this.getHistogram="device/histogram/all";

    //role
    this.getRole="role/";

    //device
    this.getDevice="device/all/";
    this.getDeviceFarm="device/all/";
    this.deleteDevice="device/";
    this.addDevice="device/";
    this.editDevice="device/"
    this.getDeviceMapping="device/mapping/active/";
    this.getInfoDeviecMapping="device/mapping/";
    this.getHistogramOfThing="device/histogram/";
    this.getDeviceNotFarm="device/filter/";
    this.deviceControl="device/control/"
    //get token
    this.getToken="user/token/refresh/";
    // report
    this.getReportHistogram="report/histogram/";

    // excel
    this.reportExcel="report/download/excel/";
  };
  var instance = null;
  var static_ = {
    getAPI: function() {
      if (instance === null) {
        instance = new init();
      }
      return instance;
    }
  };
  return static_;
})();
export default API;
