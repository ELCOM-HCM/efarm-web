// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import People from "@material-ui/icons/People";
import Home from "@material-ui/icons/Home";
import Domain from "@material-ui/icons/Domain";
import Vibration from "@material-ui/icons/Vibration";
import Receipt from "@material-ui/icons/Receipt";
// import ContentPaste from "@material-ui/icons/ContentPaste";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
// core components/views
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import Farm from "views/Farm/Farm.jsx";
import Maps from "views/Maps/Maps.jsx";
import Account from "views/Account/Account.jsx";
import Thing from "views/Thing/Thing.jsx";
import Report from "views/Report/Report.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import LoginPage from "views/Login/Login.jsx";

const dashboardRoutes = [
  {
    path: "/login",
    sidebarName: "",
    navbarName: "",
    component: LoginPage,
    role: ["ROOT", "MASTER", "EDITOR", "MONITOR"]
  },

  {
    path: "/dashboard",
    sidebarName: "Trang chủ",
    navbarName: "Trang chủ",
    icon: Home,
    component: DashboardPage,
    role: ["ROOT", "MASTER", "EDITOR", "MONITOR"]
  },
  {
    path: "/user-profile",
    sidebarName: "Hồ sơ cá nhân",
    navbarName: "Hồ sơ cá nhân",
    icon: Person,
    component: UserProfile,
    role: ["ROOT", "MASTER", "EDITOR", "MONITOR"]
  },
  {
    path: "/farm",
    sidebarName: "Quản lý nông trại",
    navbarName: "Quản lý nông trại",
    icon: Domain,
    component: Farm,
    role: ["ROOT", "MASTER", "EDITOR"]
  },
  {
    path: "/account",
    sidebarName: "Quản lý thành viên",
    navbarName: "Quản lý thành viên",
    icon: People,
    component: Account,
    role: ["ROOT", "MASTER"]
  },
  {
    path: "/thing",
    sidebarName: "Quản lý thiết bị",
    navbarName: "Quản lý thiết bị",
    icon: Vibration,
    component: Thing,
    role: ["ROOT", "MASTER", "EDITOR"]
  },
  {
    path: "/report",
    sidebarName: "Báo cáo thống kê",
    navbarName: "Báo cáo thống kê",
    icon: Receipt,
    component: Report,
    role: ["ROOT", "MASTER"]
  },

  // {
  //   path: "/table",
  //   sidebarName: "Table List",
  //   navbarName: "Table List",
  //   icon: "content_paste",
  //   component: TableList
  // },
  // {
  //   path: "/typography",
  //   sidebarName: "Typography",
  //   navbarName: "Typography",
  //   icon: LibraryBooks,
  //   component: Typography
  // },
  // {
  //   path: "/icons",
  //   sidebarName: "Icons",
  //   navbarName: "Icons",
  //   icon: BubbleChart,
  //   component: Icons
  // },
  // {
  //   path: "/maps",
  //   sidebarName: "Maps",
  //   navbarName: "Map",
  //   icon: LocationOn,
  //   component: Maps
  // },
  // {
  //   path: "/notifications",
  //   sidebarName: "Notifications",
  //   navbarName: "Notifications",
  //   icon: Notifications,
  //   component: NotificationsPage
  // },
  {
    redirect: true,
    path: "/",
    to: "/login",
    navbarName: "Redirect",
    role: ["ROOT", "MASTER", "EDITOR", "MONITOR"]
  }
];

export default dashboardRoutes;
